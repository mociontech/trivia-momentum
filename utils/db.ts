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
  apiKey: "AIzaSyDAg8fcs_rBQlB7xCxGm1Xq-1X9ISe-stY",
  authDomain: "multirepos.firebaseapp.com",
  projectId: "multirepos",
  storageBucket: "multirepos.appspot.com",
  messagingSenderId: "543787682717",
  appId: "1:543787682717:web:68309224639c36ee787d74",
  measurementId: "G-7D3MCCEZMR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function register(
  name: string,
  cedula: string,
  telefono: string,
  ciudadPais: string,
  genero: string
) {
  try {
    const isExisting = await getDoc(doc(db, "DBTriviasStereoPicnic", cedula));
    if (isExisting.data()) {
      return "existing";
    } else {
      await setDoc(doc(db, "DBTriviasStereoPicnic", cedula), {
        nombre: name,
        cedula,
        telefono,
        ciudadPais,
        genero,
        puntaje: 0,
        tiempo: 0,
        fecha: Timestamp.now(),
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function registerRecord(cedula: string, time, score) {
  await updateDoc(doc(db, "DBTriviasStereoPicnic", cedula), {
    puntaje: score,
    tiempo: time,
  });
}

export async function getRecords(): Promise<Record[]> {
  const collectionRef = collection(db, "DBTriviasStereoPicnic"); // Cambia el nombre de la colección
  const snapshot = await getDocs(collectionRef);
  const documentos = snapshot.docs.map((doc) => ({
    id: doc.id, // Si deseas obtener el ID del documento
    nombre: doc.data().nombre,
    puntaje: doc.data().puntaje,
    tiempo: doc.data().tiempo,
  }));

  return documentos;
}
