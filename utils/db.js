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

export async function register(name, mail) {
  try {
    const isExisting = await getDoc(doc(db, "DBTriviasOracle", mail));
    if (isExisting.data()) {
      return;
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

export async function getRecords() {
  const collectionRef = collection(db, "DBTriviasOracle"); // Cambia el nombre de la colección
  const snapshot = await getDocs(collectionRef);
  const documentos = snapshot.docs.map((doc) => ({
    id: doc.id, // Si deseas obtener el ID del documento
    ...doc.data(), // Los datos del documento
  }));

  console.log(documentos);
  return documentos;
}
