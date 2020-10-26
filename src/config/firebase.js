import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAwq8ZQCBQuqChTiSRZ-Q6sIyuKP81QaNk",
  authDomain: "dieta-flex-41d8a.firebaseapp.com",
  databaseURL: "https://dieta-flex-41d8a.firebaseio.com",
  projectId: "dieta-flex-41d8a",
  storageBucket: "dieta-flex-41d8a.appspot.com",
  messagingSenderId: "637097420001",
  appId: "1:637097420001:web:9a13a100eac6cfb71f03a0",
  measurementId: "G-839843TV0Z"
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
