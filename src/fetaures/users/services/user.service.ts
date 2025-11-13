import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import type { User, UserInput } from "../types";

const USERS_COLLECTION = "users";

export const createUser = async (userData: UserInput): Promise<User> => {
  try {
    const docRef = await addDoc(collection(db, USERS_COLLECTION), {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    const now = new Date();
    const createdUser: User = {
      ...userData,
      id: docRef.id,
      createdAt: now,
      updatedAt: now,
    };

    return createdUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user. Please try again.");
  }
};

export const getUserByDocumentNumber = async (
  documentNumber: string
): Promise<User | null> => {
  try {
    const q = query(
      collection(db, USERS_COLLECTION),
      where("documentNumber", "==", documentNumber)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    const data = doc.data();

    // Convert Firestore timestamps to Date objects
    const user: User = {
      ...(data as UserInput),
      id: doc.id,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    };

    return user;
  } catch (error) {
    console.error("Error getting user:", error);
    throw new Error("Failed to get user. Please try again.");
  }
};
