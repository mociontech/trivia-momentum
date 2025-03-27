import { initializeApp } from "firebase/app";
import {
  getFirestore,
  Timestamp,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAd32fjHVssRxIzHijkeWd37MamHWzCajM",
  authDomain: "f1-sap.firebaseapp.com",
  projectId: "f1-sap",
  storageBucket: "f1-sap.appspot.com",
  messagingSenderId: "1043864334257",
  appId: "1:1043864334257:web:bcc854d01f1c12fa415790",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function register(name, mail, id, phone) {
  try {
    const isExisting = await getDoc(doc(db, "usersHBO", mail));
    if (isExisting.data()) {
      return "existing";
    } else {
      const response = await setDoc(doc(db, "usersHBO", mail), {
        nombre: name,
        correo: mail,
        cedula: id,
        celular: phone,
        puntaje: 0,
        tiempo: 0,
        fecha: Timestamp.now(),
      });
      console.log(response);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function registerRecord(mail, time, score) {
  await updateDoc(doc(db, "userHBO", mail), {
    puntaje: score,
    tiempo: time,
  });
}

export async function getRecords() {
  const collectionRef = collection(db, "usersHBO"); // Cambia el nombre de la colección
  const snapshot = await getDocs(collectionRef);
  const documentos = snapshot.docs.map((doc) => ({
    id: doc.id, // Si deseas obtener el ID del documento
    ...doc.data(), // Los datos del documento
  }));

  return documentos;
}
