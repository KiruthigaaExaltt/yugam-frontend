import { initializeApp } from "firebase/app";
import type { FirebaseApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";
import type { Analytics } from "firebase/analytics";

import { getMessaging } from "firebase/messaging";
import type { Messaging } from "firebase/messaging";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcjOIzNTuI61TyFaUmt24OpgGCXGJ74aM",
  authDomain: "test-app-20df4.firebaseapp.com",
  projectId: "test-app-20df4",
  storageBucket: "test-app-20df4.firebasestorage.app",
  messagingSenderId: "207478548234",
  appId: "1:207478548234:web:a925b8c7261863a372bcf3",
  measurementId: "G-GB4S0MCNFS",
};

// Initialize Firebase
export const app: FirebaseApp = initializeApp(firebaseConfig);

// Analytics (browser-only)
export const analytics: Analytics | null =
  typeof window !== "undefined" ? getAnalytics(app) : null;

// Firebase Cloud Messaging
export const messaging: Messaging = getMessaging(app);
