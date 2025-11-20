import type { RouteObject } from "react-router";

import AppLayout from "@/layouts/AppLayout";
import { ProtectedRoute } from "@/shared/components/guards";
import { getModuleRoutes } from "@/fetaures/modules";
import { lazy } from "react";

const HomePage = lazy(() => import("@/fetaures/app/pages/HomePage"));
const ProfilePage = lazy(() => import("@/fetaures/users/pages/ProfilePage"));

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
