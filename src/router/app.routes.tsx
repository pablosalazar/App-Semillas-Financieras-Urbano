import type { RouteObject } from "react-router";

import AppLayout from "@/layouts/AppLayout";
import { ProtectedRoute } from "@/shared/components/guards";
import { getModuleRoutes } from "@/features/modules";
import { lazy } from "react";

const HomePage = lazy(() => import("@/features/app/pages/HomePage"));
const ProfilePage = lazy(() => import("@/features/users/pages/ProfilePage"));

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
        {
          path: "/profile",
          element: <ProfilePage />,
        },
        {
          path: "/modulos",
          children: getModuleRoutes(),
        },
      ],
    },
  ],
};
