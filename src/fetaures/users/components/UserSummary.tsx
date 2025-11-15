import { useAuth, useAuthenticatedUser } from "@/context/AuthContext";
import { displayName } from "@/shared/utils/user";
import { Link } from "react-router";

export function UserSummary() {
  const user = useAuthenticatedUser();
  const { logout } = useAuth();
  return (
    <div>
      {displayName(user)}
      <ul>
        <li>
          <Link to="/profile">Perfil</Link>
        </li>
        <li>
          <button onClick={logout}>Cerrar sesión</button>
        </li>
      </ul>
    </div>
  );
}
