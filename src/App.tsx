import { RouterProvider } from "react-router";

import router from "@/router/routes";
import { env } from "./config/env";

function App() {
  console.log(env);
  return <RouterProvider router={router} />;
}

export default App;
