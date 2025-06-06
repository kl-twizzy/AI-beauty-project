import torch
from PIL import Image
import os
from torch.utils.data import Dataset, DataLoader
from torchvision import transforms
from transformers import ViTFeatureExtractor, ViTForImageClassification
from torch import nn, optim  # Добавлен импорт optim
from tqdm import tqdm  # Импорт tqdm

if __name__ == '__main__':  # Добавлено для Windows
    torch.multiprocessing.freeze_support()

    class BeautyDataset(Dataset):
        def __init__(self, root_dir, transform=None):
            self.root_dir = root_dir
            self.transform = transform
            self.image_paths = []
            self.labels = []

            # Предполагаем, что имена файлов содержат метки через разделитель "_"
            for filename in os.listdir(root_dir):
                if filename.endswith(".jpg") or filename.endswith(".png"):
                    self.image_paths.append(os.path.join(root_dir, filename))

                parts = filename.split(".")[0].split("_")
                if len(parts) > 1:
                    label = "_".join(parts[1:])
                    self.labels.append(label)
                else:
                    print(f"Ошибка: Неверный формат имени файла: {filename}")

        def __len__(self):
            return len(self.image_paths)

        def __getitem__(self, idx):
            image_path = self.image_paths[idx]
            image = Image.open(image_path).convert("RGB")  # Преобразуем в RGB
            label = self.labels[idx]  # Одна метка для данного изображения

            if self.transform:
                image = self.transform(image)

            print(f"Загружена метка: {label}")  # Добавлено для отладки

            return image, label

    # Определяем трансформации для изображений
    data_transforms = {
        'train': transforms.Compose([
            transforms.RandomResizedCrop(224),  # ViT требует размер 224x224
            transforms.RandomHorizontalFlip(),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])  # Нормализация для предобученных моделей
        ]),
        'val': transforms.Compose([
            transforms.Resize(256),
            transforms.CenterCrop(224),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        ]),
    }

    image_datasets = {x: BeautyDataset(os.path.join("data", x), data_transforms[x])
                      for x in ['train', 'val']}
    dataloaders = {x: DataLoader(image_datasets[x], batch_size=4,
                                          shuffle=True, num_workers=0)  # num_workers=0
                  for x in ['train', 'val']}
    dataset_sizes = {x: len(image_datasets[x]) for x in ['train', 'val']}

    # Выведем размеры датасетов
    print("Размер обучающего датасета:", dataset_sizes['train'])
    print("Размер валидационного датасета:", dataset_sizes['val'])

    # Определите метки ваших услуг
    id2label = {0: "contour_chin", 1: "contour_lips", 2: "liporeduction_face", 3: "peeling_jenser", 4: "thread_lifting_kogi"}
    label2id = {"contour_chin": 0, "contour_lips": 1, "liporeduction_face": 2, "peeling_jenser": 3, "thread_lifting_kogi": 4}

    model_name = 'google/vit-base-patch16-224-in21k'  # или другая модель
    feature_extractor = ViTFeatureExtractor.from_pretrained(model_name)
    model = ViTForImageClassification.from_pretrained(
        model_name,
        num_labels=len(id2label),  # Количество ваших классов (услуг)
        id2label=id2label,
        label2id=label2id
    )

    device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")  # Определяем устройство
    model = model.to(device)  # Переносим модель на устройство

    criterion = nn.CrossEntropyLoss()  # Подходит для многоклассовой классификации
    optimizer = optim.AdamW(model.parameters(), lr=5e-5)  # lr - learning rate

    def train_model(model, criterion, optimizer, num_epochs=10):
        for epoch in range(num_epochs):
            print(f'Epoch {epoch}/{num_epochs - 1}')
            print('-' * 10)

            for phase in ['train', 'val']:
                if phase == 'train':
                    model.train()  # Set model to training mode
                else:
                    model.eval()  # Set model to evaluate mode

                running_loss = 0.0
                running_corrects = 0

                # Iterate over data.
                for inputs, labels in tqdm(dataloaders[phase], desc=f"Epoch {epoch} - {phase}"):
                    inputs = inputs.to(device)

                    # Преобразуем список меток в тензор c одним индексом
                    labels_tensor = torch.tensor([label2id[label] for label in labels]).to(device)

                    # zero the parameter gradients
                    optimizer.zero_grad()

                    # forward
                    # track history if only in train
                    with torch.set_grad_enabled(phase == 'train'):
                        outputs = model(inputs)
                        _, preds = torch.max(outputs.logits, 1)
                        loss = criterion(outputs.logits, labels_tensor)

                        # backward + optimize only if in training phase
                        if phase == 'train':
                            loss.backward()
                            optimizer.step()

                    # statistics
                    running_loss += loss.item() * inputs.size(0)
                    running_corrects += torch.sum(preds == labels_tensor.data)

                epoch_loss = running_loss / dataset_sizes[phase]
                epoch_acc = running_corrects.double() / dataset_sizes[phase]

                print(f'{phase} Loss: {epoch_loss:.4f} Acc: {epoch_acc:.4f}')

        print('Finished Training')
        return model

    model = train_model(model, criterion, optimizer, num_epochs=2)

    # Сохранение модели
    torch.save(model.state_dict(), 'beauty_model.pth')
    print("Модель сохранена в файл beauty_model.pth")