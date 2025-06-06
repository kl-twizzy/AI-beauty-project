// js/firebase-init.js
// Теперь импортируем, используя ПОЛНЫЙ ПУТЬ, который определен в importmap как ключ и значение
import { initializeApp } from "/node_modules/firebase/app/dist/index.mjs";
import { getAuth } from "/node_modules/firebase/auth/dist/index.mjs";
import { getFirestore } from "/node_modules/firebase/firestore/dist/index.mjs";

console.log("firebase-init.js loaded with direct paths");

const firebaseConfig = {
  apiKey: "AIzaSyBKIGlILBjVZ6gKSoIgr-u1Y_iCT-ycI20",
  authDomain: "bloomessenceapp.firebaseapp.com",
  projectId: "bloomessenceapp",
  storageBucket: "bloomessenceapp.firebaseapp.com",
  messagingSenderId: "1037804070792",
  appId: "1:1037804070792:web:686ead18d61f986e02fc3d",
  measurementId: "G-LG7BBECEJ7"
};

let app, auth, db;

try {
    app = initializeApp(firebaseConfig);
    console.log("Firebase app initialized:", app);
    auth = getAuth(app);
    console.log("Firebase auth initialized:", auth);
    db = getFirestore(app);
    console.log("Firebase db initialized:", db);
} catch (error) {
    console.error("Error initializing Firebase services in firebase-init.js:", error);
}

export { app, auth, db }; // Экспортируем