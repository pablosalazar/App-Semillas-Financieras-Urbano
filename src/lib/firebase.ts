import { env } from "@/config/env";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = env.firebase;

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
