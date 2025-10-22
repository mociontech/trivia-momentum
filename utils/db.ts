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
import { edgeApi } from "@/sdk/init";

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
    const data = await edgeApi.registerAttendee({
      email: mail,
      fullName: name
    })
    return data
  } catch (error) {
    console.log(error);
  }
}
export async function searchBycode(code) {
  try {
    const data = await edgeApi.findAttendeeByCode(code)
    return data
  } catch (error) {
    console.log(error);
  }
}


export async function registerRecord(attendeId,score) {
 try {
  console.log('guardando puntos', attendeId);
  
    const data = await edgeApi.logExperiencePlay({attendeeId:attendeId,play_timestamp: new Date().toISOString(), score })
    return data
  } catch (error) {
    console.log(error);
  }
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
