import type { RouteObject } from "react-router";

import AuthLayout from "@/layouts/AuthLayout";
import { PublicRoute } from "@/shared/components/guards";
import { lazy } from "react";

const IntroPage = lazy(() => import("@/features/intro/pages/IntroPage"));
const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/features/auth/pages/RegisterPage"));

export const AuthRoutes: RouteObject = {
  element: <PublicRoute />,
  children: [
    {
      element: <AuthLayout />,
      children: [
        {
          path: "/",
          element: <IntroPage />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
      ],
    },
  ],
};
