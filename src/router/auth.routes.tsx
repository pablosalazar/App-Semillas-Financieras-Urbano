import type { RouteObject } from "react-router";

import AuthLayout from "@/layouts/AuthLayout";
import { lazy } from "react";

const LoginPage = lazy(() => import("@/fetaures/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/fetaures/auth/pages/RegisterPage"));

export const AuthRoutes: RouteObject = {
  element: <AuthLayout />,
  children: [
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "register",
      element: <RegisterPage />,
    },
  ],
};
