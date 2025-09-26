// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  Timestamp,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { Record } from "./types";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function register(name, mail) {
  try {
    const isExisting = await getDoc(doc(db, "DBTriviasOracle", mail));
    if (isExisting.data()) {
      return "existing";
    } else {
      await setDoc(doc(db, "DBTriviasOracle", mail), {
        nombre: name,
        correo: mail,
        puntaje: 0,
        tiempo: 0,
        fecha: Timestamp.now(),
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function registerRecord(mail, time, score) {
  await updateDoc(doc(db, "DBTriviasOracle", mail), {
    puntaje: score,
    tiempo: time,
  });
}

export async function getRecords(): Promise<Record[]> {
  const collectionRef = collection(db, "DBTriviasOracle"); // Cambia el nombre de la colección
  const snapshot = await getDocs(collectionRef);
  const documentos = snapshot.docs.map((doc) => ({
    id: doc.id, // Si deseas obtener el ID del documento
    nombre: doc.data().nombre,
    puntaje: doc.data().puntaje,
    tiempo: doc.data().tiempo,
  }));

  return documentos;
}
