import { useAuth, useAuthenticatedUser } from "@/context/AuthContext";
import { modules } from "@/shared/constants/modules";
import { displayName } from "@/shared/utils/user";
import { Link } from "react-router";

export function UserSummary() {
  const user = useAuthenticatedUser();
  const { logout } = useAuth();
  return (
    <div className="flex gap-8">
      <div className="w-2xl">
        <div className="bg-(--blue) text-white rounded-xl p-6">
          <div className="space-y-4 mb-4">
            <div>
              <div className="text-sm">Nombre</div>
              <div className="font-bold">{displayName(user)}</div>
            </div>
            <div>
              <div className="text-sm">Número de documento</div>
              <div className="font-bold">{user.documentNumber}</div>
            </div>
            <div>
              <div className="text-sm">Correo</div>
              <div className="font-bold">{user.email}</div>
            </div>
          </div>
          <Link to="/profile" className="btn btn-blue btn-full">
            Editar perfil
          </Link>
        </div>
        <ul>
          <li>
            <button onClick={logout}>Cerrar sesión</button>
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {modules.map((module) => (
          <img key={module.id} src={module.image} alt={module.name} />
        ))}
      </div>
    </div>
  );
}
