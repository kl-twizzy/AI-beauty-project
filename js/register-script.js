// js/register-script.js
// Импортируем из нашего firebase-init.js ОТНОСИТЕЛЬНЫМ путем, так как importmap для него мы убрали в этом тесте
import { auth, db } from './firebase-init.js';

// Импорты createUserWithEmailAndPassword и т.д. теперь должны прийти из auth и db,
// которые были инициализированы в firebase-init.js и используют полные пути
import { createUserWithEmailAndPassword } from "/node_modules/firebase/auth/dist/index.mjs";
import { doc, setDoc } from "/node_modules/firebase/firestore/dist/index.mjs";


console.log("register-script.js loaded");
console.log("Auth from init:", auth);
console.log("DB from init:", db);


const registerForm = document.getElementById('registerForm');
// ... остальной код формы ...
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        // ... (остальной код обработчика submit без изменений) ...
        const registerError = document.getElementById('registerError');
        registerError.style.display = 'none';
        registerError.textContent = '';

        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const name = document.getElementById('registerName').value;
        const phone = document.getElementById('registerPhone').value;

        if (!email || !password || !name || !phone) {
            registerError.textContent = 'Пожалуйста, заполните все поля.';
            registerError.style.display = 'block';
            return;
        }
        if (password.length < 6) {
            registerError.textContent = 'Пароль должен содержать не менее 6 символов.';
            registerError.style.display = 'block';
            return;
        }

        try {
            if (!auth) {
                console.error("Firebase Auth is not initialized!");
                registerError.textContent = 'Ошибка инициализации сервиса аутентификации.';
                registerError.style.display = 'block';
                return;
            }
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (!db) {
                console.error("Firebase Firestore is not initialized!");
                registerError.textContent = 'Ошибка инициализации сервиса базы данных.';
                registerError.style.display = 'block';
                return;
            }
            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: email,
                phone: phone,
                createdAt: new Date()
            });

            console.log('Пользователь успешно зарегистрирован:', user);
            alert('Регистрация прошла успешно! Теперь вы можете войти.');
            window.location.href = '/login.html';

        } catch (error) {
            console.error('Ошибка регистрации:', error);
            let friendlyMessage = 'Произошла ошибка при регистрации. Пожалуйста, попробуйте еще раз.';
            if (error.code === 'auth/email-already-in-use') {
                friendlyMessage = 'Этот адрес электронной почты уже используется.';
            } else if (error.code === 'auth/weak-password') {
                friendlyMessage = 'Пароль слишком слабый.';
            } else if (error.code === 'auth/invalid-email') {
                friendlyMessage = 'Неверный формат адреса электронной почты.';
            }
            registerError.textContent = friendlyMessage;
            registerError.style.display = 'block';
        }
    });
} else {
    console.error("Элемент registerForm не найден на странице.");
}