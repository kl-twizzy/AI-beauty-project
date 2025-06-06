import os

def check_filenames(directory):
  """Проверяет имена файлов в указанной директории."""
  for filename in os.listdir(directory):
    if filename.endswith(".jpg") or filename.endswith(".png"):
      try:
        parts = filename.split(".")[0].split("_")
        #label = filename.split(".")[0].split("_")[1]  # Неправильно
        if len(parts) > 1:
            label = "_".join(parts[1:])  # Правильно
            print(f"Файл: {filename}, Метка: {label}")
        else:
            print(f"Ошибка: Неверный формат имени файла: {filename}")
      except IndexError:
        print(f"Ошибка: Неверный формат имени файла: {filename}")

print("Проверка папки train:")
check_filenames("data/train")
print("\nПроверка папки val:")
check_filenames("data/val")