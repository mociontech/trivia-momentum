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
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
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
  if (!mail || mail.trim() === '') {
    console.error('Mail is required for register');
    return;
  }
  
  try {
    // Verificar si hay conexión antes de intentar registrar
    if (!navigator.onLine) {
      console.log('Sin conexión - Registro guardado offline:', { name, mail });
      return "offline";
    }

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
    console.log('Error en registro:', error);
    return "error";
  }
}


export async function registerRecord(mail, time, score) {
  if (!mail || mail.trim() === '') {
    console.error('Mail is required for registerRecord');
    return;
  }
  
  try {
    // Verificar si hay conexión antes de intentar actualizar
    if (!navigator.onLine) {
      console.log('Sin conexión - Registro de puntaje guardado offline:', { mail, time, score });
      return "offline";
    }

    await updateDoc(doc(db, "DBTriviasOracle", mail), {
      puntaje: score,
      tiempo: time,
    });
  } catch (error) {
    console.log('Error actualizando registro:', error);
    return "error";
  }
}

export async function getRecords(): Promise<Record[]> {
  try {
    // Verificar si hay conexión antes de intentar obtener registros
    if (!navigator.onLine) {
      console.log('Sin conexión - No se pueden obtener registros');
      return [];
    }

    const collectionRef = collection(db, "DBTriviasOracle");
    const snapshot = await getDocs(collectionRef);
    const documentos = snapshot.docs.map((doc) => ({
      id: doc.id,
      nombre: doc.data().nombre,
      puntaje: doc.data().puntaje,
      tiempo: doc.data().tiempo,
    }));

    return documentos;
  } catch (error) {
    console.log('Error obteniendo registros:', error);
    return [];
  }
}


// Función para buscar una persona por código en la colección de event attendees
export async function findPersonByCode(codeToFind: string): Promise<{email: string, code?: string, id: string, found: boolean, error?: string}> {
  try {
    const collectionRef = collection(db, "6877ed86ee62eed9950c6ec2_event_attendees");
    
    // Intentar obtener documentos con timeout reducido (5 segundos)
    const snapshot = await Promise.race([
      getDocs(collectionRef),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout: No se pudo conectar a Firebase')), 5000)
      )
    ]) as any;
    
    // Buscar en el campo properties.codigo y private_reference_number
    let foundDoc = snapshot.docs.find(doc => {
      const data = doc.data();
      const properties = data.properties || {};
      return properties.codigo === codeToFind || data.private_reference_number === codeToFind;
    });
    
    if (foundDoc) {
      const data = foundDoc.data();
      const properties = data.properties || {};
      
      return {
        id: foundDoc.id,
        email: properties.email,
        code: properties.codigo || data.private_reference_number,
        found: true
      };
    } else {
      return {
        id: '',
        email: '',
        code: codeToFind,
        found: false,
        error: 'Código no encontrado en la colección de event attendees'
      };
    }
    
  } catch (error) {
    return {
      id: '',
      email: '',
      code: codeToFind,
      found: false,
      error: error.message || 'Error de conexión con Firebase'
    };
  }
}

// Función para generar UUID
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Interfaz para datos offline
interface OfflineData {
  localId: string;
  email: string;
  score: number;
  bonusScore: number;
  timestamp: string;
  synced: boolean;
}

// Interfaz para códigos pendientes de búsqueda
interface PendingCode {
  code: string;
  timestamp: string;
  processed: boolean;
}

// Función para guardar códigos pendientes
function savePendingCode(code: string): void {
  try {
    const existingData = localStorage.getItem('pending-codes');
    const pendingCodes: PendingCode[] = existingData ? JSON.parse(existingData) : [];
    
    const pendingCode: PendingCode = {
      code: code,
      timestamp: new Date().toISOString(),
      processed: false
    };
    
    pendingCodes.push(pendingCode);
    localStorage.setItem('pending-codes', JSON.stringify(pendingCodes));
  } catch (error) {
    console.error('Error guardando código pendiente:', error);
  }
}

// Función para obtener códigos pendientes
function getPendingCodes(): PendingCode[] {
  try {
    const existingData = localStorage.getItem('pending-codes');
    return existingData ? JSON.parse(existingData) : [];
  } catch (error) {
    console.error('Error obteniendo códigos pendientes:', error);
    return [];
  }
}

// Función para marcar código como procesado
function markCodeAsProcessed(code: string): void {
  try {
    const pendingCodes = getPendingCodes();
    const updatedCodes = pendingCodes.map(item => 
      item.code === code ? { ...item, processed: true } : item
    );
    localStorage.setItem('pending-codes', JSON.stringify(updatedCodes));
  } catch (error) {
    console.error('Error marcando código como procesado:', error);
  }
}

// Función para guardar datos offline
function saveOfflineData(data: OfflineData): void {
  try {
    const existingData = localStorage.getItem('evius-offline-data');
    const offlineData: OfflineData[] = existingData ? JSON.parse(existingData) : [];
    
    offlineData.push(data);
    localStorage.setItem('evius-offline-data', JSON.stringify(offlineData));
  } catch (error) {
    console.error('Error guardando datos offline:', error);
  }
}

// Función para obtener datos offline
function getOfflineData(): OfflineData[] {
  try {
    const existingData = localStorage.getItem('evius-offline-data');
    return existingData ? JSON.parse(existingData) : [];
  } catch (error) {
    console.error('Error obteniendo datos offline:', error);
    return [];
  }
}

// Función para marcar datos como sincronizados
function markAsSynced(localId: string): void {
  try {
    const offlineData = getOfflineData();
    const updatedData = offlineData.map(item => 
      item.localId === localId ? { ...item, synced: true } : item
    );
    localStorage.setItem('evius-offline-data', JSON.stringify(updatedData));
  } catch (error) {
    console.error('Error marcando como sincronizado:', error);
  }
}

// Función para procesar códigos pendientes
async function processPendingCodes(): Promise<void> {
  const pendingCodes = getPendingCodes();
  const unprocessedCodes = pendingCodes.filter(item => !item.processed);
  
  console.log(`Procesando ${unprocessedCodes.length} códigos pendientes...`);
  
  for (const pendingCode of unprocessedCodes) {
    try {
      // Buscar el código en Firebase
      const result = await findPersonByCode(pendingCode.code);
      
      if (result.found) {
        // Enviar datos a Evius
        await sendUserDataToEvius(result.email);
        markCodeAsProcessed(pendingCode.code);
        console.log(`Código procesado offline: ${pendingCode.code} -> ${result.email}`);
        
        // Notificar que se encontró el email real (opcional)
        if (typeof window !== 'undefined') {
          // Emitir evento personalizado para notificar al usuario
          window.dispatchEvent(new CustomEvent('codeProcessed', {
            detail: { code: pendingCode.code, email: result.email }
          }));
        }
      } else {
        // Marcar como procesado aunque no se encontró
        markCodeAsProcessed(pendingCode.code);
        console.log(`Código no encontrado: ${pendingCode.code}`);
      }
    } catch (error) {
      console.error('Error procesando código pendiente:', error);
    }
  }
  
  console.log('Procesamiento de códigos pendientes completado');
}

// Función para sincronizar datos offline
async function syncOfflineData(): Promise<void> {
  console.log('Iniciando sincronización de datos offline...');
  
  // Primero procesar códigos pendientes
  await processPendingCodes();
  
  // Luego sincronizar datos offline
  const offlineData = getOfflineData();
  const pendingData = offlineData.filter(item => !item.synced);
  
  console.log(`Procesando ${pendingData.length} registros offline...`);
  
  for (const data of pendingData) {
    try {
      const payload = {
        eventExperienceId: "2871e27b-6f67-4f46-8d20-1d6cae422ec2",
        email: data.email,
        play_timestamp: data.timestamp,
        score: data.score,
        bonusScore: data.bonusScore,
        localId: data.localId
      };

      console.log('Enviando datos a Evius:', payload);

      const response = await fetch('https://mocion.app/evius/api/experience-play-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        markAsSynced(data.localId);
        console.log('Datos sincronizados exitosamente:', data.localId);
      } else {
        console.error('Error en respuesta de Evius:', response.status, response.statusText);
        
        // Si es 404, marcar como procesado para evitar reintentos infinitos
        if (response.status === 404) {
          markAsSynced(data.localId);
          console.log('Registro marcado como procesado (404):', data.localId);
        }
      }
    } catch (error) {
      console.error('Error sincronizando datos offline:', error);
    }
  }
  
  console.log('Sincronización de datos offline completada');
}

// Función para verificar conexión a internet
function isOnline(): boolean {
  return navigator.onLine;
}

// Función para enviar datos del usuario a la API de Evius
export async function sendUserDataToEvius(email: string, score?: number, bonusScore?: number): Promise<{success: boolean, error?: string}> {
  try {
    const playTimestamp = new Date().toISOString();
    const localId = generateUUID();
    
    const payload = {
      eventExperienceId: "2871e27b-6f67-4f46-8d20-1d6cae422ec2",
      email: email,
      play_timestamp: playTimestamp,
      score: score || 25,
      bonusScore: bonusScore || 0,
      localId: localId
    };

    console.log('Enviando datos a Evius:', payload);

    // Verificar si hay conexión a internet
    if (!isOnline()) {
      // Guardar offline
      const offlineData: OfflineData = {
        localId: localId,
        email: email,
        score: score || 25,
        bonusScore: bonusScore || 0,
        timestamp: playTimestamp,
        synced: false
      };
      
      saveOfflineData(offlineData);
      console.log('Sin conexión - Datos guardados offline:', offlineData);
      
      return { 
        success: true, 
        error: 'Sin conexión - Datos guardados offline para sincronizar después' 
      };
    }

    // Intentar enviar online
    const response = await fetch('https://mocion.app/evius/api/experience-play-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      return { success: true };
    } else {
      // Si falla, guardar offline
      const offlineData: OfflineData = {
        localId: localId,
        email: email,
        score: score || 25,
        bonusScore: bonusScore || 0,
        timestamp: playTimestamp,
        synced: false
      };
      
      saveOfflineData(offlineData);
      console.log('Error en API - Datos guardados offline:', offlineData);
      
      // Obtener el mensaje de error de la respuesta
      let errorMessage = `Error ${response.status}: ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (e) {
        // Si no se puede parsear el JSON, usar el mensaje por defecto
      }
      
      return { 
        success: false, 
        error: `${errorMessage} - Datos guardados offline para reintentar` 
      };
    }
    
  } catch (error) {
    // Si hay error de conexión, guardar offline
    const playTimestamp = new Date().toISOString();
    const localId = generateUUID();
    
    const offlineData: OfflineData = {
      localId: localId,
      email: email,
      score: score || 25,
      bonusScore: bonusScore || 0,
      timestamp: playTimestamp,
      synced: false
    };
    
    saveOfflineData(offlineData);
    console.log('Error de conexión - Datos guardados offline:', offlineData);
    
    return { 
      success: false, 
      error: `${error.message || 'Error de conexión'} - Datos guardados offline para reintentar` 
    };
  }
}

// Función para buscar código con lógica offline
export async function findPersonByCodeOffline(codeToFind: string): Promise<{email: string, code?: string, id: string, found: boolean, error?: string}> {
  try {
    // Verificar si hay conexión
    if (!isOnline()) {
      // Guardar código para procesar cuando haya internet
      savePendingCode(codeToFind);
      console.log('Sin conexión - Código guardado para procesar después:', codeToFind);
      
      return {
        id: '',
        email: '',
        code: codeToFind,
        found: false,
        error: 'Sin conexión - Código guardado para procesar cuando haya internet'
      };
    }

    // Si hay conexión, buscar normalmente
    return await findPersonByCode(codeToFind);
    
  } catch (error) {
    // Si hay error, guardar código para procesar después
    savePendingCode(codeToFind);
    console.log('Error de conexión - Código guardado para procesar después:', codeToFind);
    
    return {
      id: '',
      email: '',
      code: codeToFind,
      found: false,
      error: 'Error de conexión - Código guardado para procesar cuando haya internet'
    };
  }
}

// Función para obtener estadísticas de datos offline
export function getOfflineStats(): {total: number, pending: number, synced: number, pendingCodes: number} {
  const offlineData = getOfflineData();
  const pending = offlineData.filter(item => !item.synced).length;
  const synced = offlineData.filter(item => item.synced).length;
  
  const pendingCodes = getPendingCodes().filter(item => !item.processed).length;
  
  return {
    total: offlineData.length,
    pending: pending,
    synced: synced,
    pendingCodes: pendingCodes
  };
}

// Función para limpiar datos sincronizados
export function clearSyncedData(): void {
  try {
    const offlineData = getOfflineData();
    const pendingData = offlineData.filter(item => !item.synced);
    localStorage.setItem('evius-offline-data', JSON.stringify(pendingData));
  } catch (error) {
    console.error('Error limpiando datos sincronizados:', error);
  }
}

// Función para limpiar todos los datos offline (emergencia)
export function clearAllOfflineData(): void {
  try {
    localStorage.removeItem('evius-offline-data');
    localStorage.removeItem('pending-codes');
    console.log('Todos los datos offline han sido limpiados');
  } catch (error) {
    console.error('Error limpiando todos los datos offline:', error);
  }
}

// Variable para controlar sincronización en curso
let isSyncing = false;

// Variable global para evitar múltiples configuraciones
let autoSyncConfigured = false;

// Función para sincronizar manualmente
export async function manualSync(): Promise<{success: boolean, synced: number, error?: string}> {
  if (isSyncing) {
    return {
      success: false,
      synced: 0,
      error: 'Sincronización ya en curso'
    };
  }

  isSyncing = true;
  try {
    const beforeSync = getOfflineStats();
    await syncOfflineData();
    const afterSync = getOfflineStats();
    
    const synced = beforeSync.pending - afterSync.pending;
    
    return {
      success: true,
      synced: synced
    };
  } catch (error) {
    return {
      success: false,
      synced: 0,
      error: error.message || 'Error en sincronización manual'
    };
  } finally {
    isSyncing = false;
  }
}

// Función para configurar sincronización automática
export function setupAutoSync(): void {
  // Evitar múltiples configuraciones
  if (autoSyncConfigured) {
    console.log('Sincronización automática ya configurada, omitiendo...');
    return;
  }
  
  autoSyncConfigured = true;
  console.log('Configurando sincronización automática...');

  // Sincronizar cuando se detecte conexión
  window.addEventListener('online', async () => {
    if (isSyncing) {
      console.log('Sincronización ya en curso, omitiendo...');
      return;
    }
    
    console.log('Conexión detectada - Iniciando sincronización automática');
    isSyncing = true;
    
    try {
      await syncOfflineData();
      console.log('Sincronización automática completada');
    } catch (error) {
      console.error('Error en sincronización automática:', error);
    } finally {
      isSyncing = false;
    }
  });

  // Sincronizar cada 5 minutos si hay conexión (solo si hay datos pendientes)
  setInterval(async () => {
    if (isOnline() && !isSyncing) {
      const stats = getOfflineStats();
      if (stats.pending > 0 || stats.pendingCodes > 0) {
        isSyncing = true;
        try {
          await syncOfflineData();
        } catch (error) {
          console.error('Error en sincronización periódica:', error);
        } finally {
          isSyncing = false;
        }
      }
    }
  }, 300000); // 5 minutos = 300,000 ms
}
