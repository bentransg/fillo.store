import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrlzlPaYrk1YnrecDEXmugG8rqhkmwao8",
  authDomain: "fillo-shoes-store.firebaseapp.com",
  projectId: "fillo-shoes-store",
  storageBucket: "fillo-shoes-store.firebasestorage.app",
  messagingSenderId: "713912360845",
  appId: "1:713912360845:web:0f0d574510bb728631a7c4",
};

const app = initializeApp(firebaseConfig);
console.log(app.name);
export { app };
