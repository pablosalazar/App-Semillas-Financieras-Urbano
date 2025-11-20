import type { ModuleRoutes } from "../types";

/**
 * Module routes for "2-salud-economica"
 * 
 * To add routes to this module:
 * 1. Create pages in the pages/ directory
 * 2. Import them using lazy loading
 * 3. Add route objects to the routes array
 * 
 * Example:
 * const MyPage = lazy(() => import("./pages/MyPage"));
 * 
 * routes: [
 *   { path: "", element: <MyPage /> },
 *   { path: "step-1", element: <Step1Page /> },
 * ]
 */
export const saludEconomicaRoutes: ModuleRoutes = {
  basePath: "2-salud-economica",
  routes: [
    // Add your module routes here
    // Example:
    // {
    //   path: "",
    //   element: <HomePage />,
    // },
  ],
};

