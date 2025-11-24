import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-image bg-default px-4 py-4 sm:py-8">
      <Outlet />
    </main>
  );
}

export default AuthLayout;
