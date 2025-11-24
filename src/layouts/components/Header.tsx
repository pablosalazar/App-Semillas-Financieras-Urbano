import { useAuthenticatedUser } from "@/context";
import { UserSummary } from "@/features/users/components/UserSummary";
import { Modal } from "@/shared/components/ui";
import { displayName } from "@/shared/utils/user";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import menuImg from "@/assets/images/controls/menu.png";
import { Avatar } from "@/shared/components/guards/Avatar";

export function Header() {
  const user = useAuthenticatedUser();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className="py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Avatar gender={user.gender} className="w-18! h-18!" />
          <span className="text-xl font-semibold bg-(--cyan) text-white text-shadow-blue px-4 py-1 rounded-full border-3 border-(--yellow)">
            {displayName(user)}
          </span>
        </div>
        <button onClick={handleOpen}>
          <img src={menuImg} alt="Menu" className="w-15 cursor-pointer" />
        </button>
      </header>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        size="full"
        className="bg-white/80! border-3 border-(--blue)"
      >
        <UserSummary />
      </Modal>
    </>
  );
}
