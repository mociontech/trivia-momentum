import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAd32fjHVssRxIzHijkeWd37MamHWzCajM',
  authDomain: 'f1-sap.firebaseapp.com',
  databaseURL: 'https://f1-sap-default-rtdb.firebaseio.com',
  projectId: 'f1-sap',
  storageBucket: 'f1-sap.appspot.com',
  messagingSenderId: '1043864334257',
  appId: '1:1043864334257:web:bcc854d01f1c12fa415790',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const database = getDatabase(firebaseApp);
