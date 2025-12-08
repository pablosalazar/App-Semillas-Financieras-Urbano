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

export interface ModuleProgressData {
  score?: number;
  correctAnswers?: number;
  totalQuestions?: number;
  attempts?: number;
  answers?: Record<number, number>;
  totalScore?: number;
}

export interface ModuleProgress {
  moduleId: string;
  startedAt: Date;
  completedAt?: Date | null;
  isComplete: boolean;
  progress: number;
  data?: ModuleProgressData;
}

export interface UserProgress {
  userId: string;
  modules: ModuleProgress[];
  createdAt: Date;
  updatedAt: Date;
}
