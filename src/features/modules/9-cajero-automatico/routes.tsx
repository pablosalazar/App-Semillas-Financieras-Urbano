import type { ModuleRoutes } from "../types";
import { lazy } from "react";
import { ATMProvider } from "./context/ATMContext";

const IntroPage = lazy(() => import("./pages/IntroPage"));
const ATMStart = lazy(() => import("./pages/ATMStart"));
const InsertCard = lazy(() => import("./pages/InsertCard"));
const DontRemoveYourCard = lazy(() => import("./pages/DontRemoveYourCard"));
const ChooseTransaction = lazy(() => import("./pages/ChooseTransaction"));

export const cajeroAutomaticoRoutes: ModuleRoutes = {
  basePath: "cajero-automatico",
  routes: [
    {
      element: <ATMProvider />,
      children: [
        {
          path: "",
          element: <IntroPage />,
        },
        {
          path: "inicio",
          element: <ATMStart />,
        },
        {
          path: "insertar-tarjeta",
          element: <InsertCard />,
        },
        {
          path: "no-retires-tu-tarjeta",
          element: <DontRemoveYourCard />,
        },
        {
          path: "elige-transaccion",
          element: <ChooseTransaction />,
        },
      ],
    },
  ],
};
