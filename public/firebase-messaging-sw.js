importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAcjOIzNTuI61TyFaUmt24OpgGCXGJ74aM",
  authDomain: "test-app-20df4.firebaseapp.com",
  projectId: "test-app-20df4",
  storageBucket: "test-app-20df4.firebasestorage.app",
  messagingSenderId: "207478548234",
  appId: "1:207478548234:web:a925b8c7261863a372bcf3",
  measurementId: "G-GB4S0MCNFS"
});

const messaging = firebase.messaging();

// listener for background messages
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message", payload);

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/logo.png",
  });
});
