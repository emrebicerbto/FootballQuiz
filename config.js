import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDfuqSN3vWOBJ5NdrrIDOFRIrHwhS2xzDg",
    authDomain: "footballquiz-c6ed8.firebaseapp.com",
    projectId: "footballquiz-c6ed8",
    storageBucket: "footballquiz-c6ed8.appspot.com",
    messagingSenderId: "375364587528",
    appId: "1:375364587528:web:be1050d6de9f568fbd41bd",
    measurementId: "G-86JLE0EH2Z"
  };


  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  export {firebase};