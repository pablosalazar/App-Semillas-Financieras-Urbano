import type { RouteObject } from "react-router";

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

