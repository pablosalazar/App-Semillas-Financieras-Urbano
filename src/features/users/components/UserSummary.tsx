import { useAuth, useAuthenticatedUser } from "@/context/AuthContext";
import { modules } from "@/shared/constants/modules";
import { UserProfileCard } from "./UserProfileCard";
import { ModuleCard } from "./ModuleCard";
import { LogOut } from "lucide-react";

export function UserSummary() {
  const user = useAuthenticatedUser();
  const { logout } = useAuth();

  return (
    <div className="flex justify-center gap-5">
      <div className="w-[400px] space-y-5">
        <UserProfileCard user={user} />

        <div className="text-center">
          <button onClick={logout} className="btn btn-outline-red">
            <LogOut />
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 px-10 flex-1">
        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            id={module.id}
            name={module.name}
            image={module.image}
            completed={true}
          />
        ))}
      </div>
    </div>
  );
}
