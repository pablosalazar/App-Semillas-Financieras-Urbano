import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import type { UserProgress, ModuleProgress } from "../types";

const USER_PROGRESS_COLLECTION = "user_progress";

export const getUserProgress = async (
  userId: string
): Promise<UserProgress | null> => {
  try {
    const docRef = doc(db, USER_PROGRESS_COLLECTION, userId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    const data = docSnap.data();
    return {
      userId,
      modules: (data.modules || []).map((m: any) => ({
        moduleId: m.moduleId,
        startedAt: m.startedAt?.toDate() || new Date(),
        completedAt: m.completedAt?.toDate() || null,
        isComplete: m.isComplete || false,
        progress: m.progress || 0,
        data: m.data || {},
      })),
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    };
  } catch (error) {
    console.error("Error getting user progress:", error);
    throw new Error("Failed to get user progress. Please try again.");
  }
};

export const registerUserProgress = async (
  userId: string,
  moduleProgress: Omit<ModuleProgress, "startedAt"> & { startedAt?: Date }
): Promise<void> => {
  try {
    const docRef = doc(db, USER_PROGRESS_COLLECTION, userId);
    const docSnap = await getDoc(docRef);
    const now = new Date();

    if (!docSnap.exists()) {
      // Create new progress document
      const newModule = {
        ...moduleProgress,
        startedAt: moduleProgress.startedAt || now,
        completedAt: moduleProgress.completedAt || null,
      };

      await setDoc(docRef, {
        modules: [newModule],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return;
    }

    // Document exists, update it
    const data = docSnap.data();
    const modules = data.modules || [];

    // Find if module already exists
    const moduleIndex = modules.findIndex(
      (m: any) => m.moduleId === moduleProgress.moduleId
    );

    if (moduleIndex === -1) {
      // Module doesn't exist, add it
      const newModule = {
        ...moduleProgress,
        startedAt: moduleProgress.startedAt || now,
        completedAt: moduleProgress.completedAt || now,
      };
      modules.push(newModule);
    } else {
      // Module exists, update it
      modules[moduleIndex] = {
        ...modules[moduleIndex],
        ...moduleProgress,
        // Keep original startedAt if not provided
        startedAt: moduleProgress.startedAt || modules[moduleIndex].startedAt,
        // Update completedAt if marking as complete
        completedAt:
          moduleProgress.isComplete && !modules[moduleIndex].isComplete
            ? now
            : moduleProgress.completedAt || modules[moduleIndex].completedAt,
      };
    }

    await setDoc(
      docRef,
      {
        modules,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error updating user progress:", error);
    throw new Error("Failed to update user progress. Please try again.");
  }
};
