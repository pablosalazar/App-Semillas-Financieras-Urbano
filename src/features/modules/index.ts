import type { ModuleRoutes } from "./types";
import { evaluacionInicialRoutes } from "./1-evaluacion-inicial/routes";

/**
 * Registry of all module routes
 * To add a new module:
 * 1. Create the module folder with its routes.tsx file
 * 2. Import the module routes here
 * 3. Add it to the modules array
 */
export const modules: ModuleRoutes[] = [
  evaluacionInicialRoutes,
  // Add more modules here as they are created
];

/**
 * Helper function to transform module routes into React Router RouteObject format
 * This prefixes all module routes with /modules/{basePath}
 */
export function getModuleRoutes(): import("react-router").RouteObject[] {
  return modules.map((module) => ({
    path: `/modulos/${module.basePath}`,
    children: module.routes.map((route) => ({
      ...route,
      // Ensure paths are relative to the module base path
      path:
        route.path === ""
          ? ""
          : route.path?.startsWith("/")
          ? route.path.slice(1)
          : route.path,
    })),
  }));
}
