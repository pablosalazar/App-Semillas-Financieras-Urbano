import type { RouteObject } from "react-router";

import AppLayout from "@/layouts/AppLayout";
import { lazy } from "react";
import { ProtectedRoute } from "./ProtectedRoute";

const HomePage = lazy(() => import("@/fetaures/app/pages/HomePage"));

export const AppRoutes: RouteObject = {
  element: <ProtectedRoute />,
  children: [
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
      ],
    },
  ],
};
