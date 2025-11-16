import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-image bg-with-logo">
      <Outlet />
    </main>
  );
}

export default AuthLayout;
