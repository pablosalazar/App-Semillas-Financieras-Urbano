import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
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
