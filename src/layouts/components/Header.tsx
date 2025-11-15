import { useAuth, useAuthenticatedUser } from "@/context";
import { displayName } from "@/shared/utils/user";

export function Header() {
  const user = useAuthenticatedUser();
  const { logout } = useAuth();

  return (
    <div>
      <div>
        <span>{displayName(user)}</span>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
