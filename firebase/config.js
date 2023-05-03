import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCcFetm7DjkodGNwQIzmHL1I40XTfEAXgk',
  authDomain: 'postsapp-goit.firebaseapp.com',
  projectId: 'postsapp-goit',
  storageBucket: 'postsapp-goit.appspot.com',
  messagingSenderId: '723050841048',
  appId: '1:723050841048:web:574748fc4fbe69269c68ad',
  measurementId: 'G-J2YWD8QLVX',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const storage = getStorage();
const firestore = getFirestore(app);
const db = getFirestore(app);

export { auth, db, storage, firestore };
