// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBDkxFuOpOybDmRfVsX9zaej79m2_RbRJQ",
  authDomain: "appreactnative-91fab.firebaseapp.com",
  databaseURL: "https://appreactnative-91fab-default-rtdb.firebaseio.com",
  projectId: "appreactnative-91fab",
  storageBucket: "appreactnative-91fab.appspot.com",
  messagingSenderId: "177896838637",
  appId: "1:177896838637:web:9d1192f3c45f77d7c403e4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);