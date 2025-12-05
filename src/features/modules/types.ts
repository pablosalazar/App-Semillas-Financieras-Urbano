import type { RouteObject } from "react-router";
import type { ATM_OPERATIONS } from "./9-cajero-automatico/constants/atm";

/**
 * Module route configuration
 * Each module should export routes that will be mounted under /modules/{module-name}
 */
export interface ModuleRoutes {
  /**
   * The base path for the module (e.g., "1-evaluacion-inicial")
   * This will be used to create the full path: /modules/{basePath}
   */
  basePath: string;

  /**
   * The routes for this module
   * These routes will be automatically prefixed with /modules/{basePath}
   */
  routes: RouteObject[];
}

export type ATMOperationType =
  (typeof ATM_OPERATIONS)[keyof typeof ATM_OPERATIONS];

/**
 * Module-specific data that can be stored for different types of modules
 */
export interface ModuleProgressData {
  score?: number;
  correctAnswers?: number;
  totalQuestions?: number;
  attempts?: number;
}

/**
 * Progress information for a single module
 */
export interface ModuleProgress {
  /** Unique identifier for the module */
  moduleId: string;

  /** When the user first accessed/started this module */
  startedAt: Date;

  /** When the user completed this module (null if not completed) */
  completedAt?: Date | null;

  /** Whether the module is marked as complete */
  isComplete: boolean;

  /** Progress percentage (0-100) */
  progress: number;

  /** Module-specific data (quiz scores, video progress, etc.) */
  data?: ModuleProgressData;
}

/**
 * User's overall progress across all modules
 * This represents a document in the user_progress collection
 */
export interface UserProgress {
  /** Firestore document ID (same as userId) */
  userId: string;

  /** Array of progress for each module the user has accessed */
  modules: ModuleProgress[];

  /** When this progress document was created */
  createdAt: Date;

  /** When this progress document was last updated */
  updatedAt: Date;
}
