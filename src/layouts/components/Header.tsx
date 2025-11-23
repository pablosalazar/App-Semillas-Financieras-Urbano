import { useAuthenticatedUser } from "@/context";
import { UserSummary } from "@/features/users/components/UserSummary";
import { Modal } from "@/shared/components/ui";
import { displayName } from "@/shared/utils/user";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import menuImg from "@/assets/images/menuImg.png";

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
        <span className="text-xl font-semibold bg-(--cyan) text-white text-shadow-blue px-4 py-1 rounded-full border-3 border-(--yellow)">
          {displayName(user)}
        </span>
        <button onClick={handleOpen}>
          <img src={menuImg} alt="Menu" className="w-15 cursor-pointer" />
        </button>
      </header>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        size="full"
        className="!bg-white/60 border-3 border-(--blue)"
      >
        <UserSummary />
      </Modal>
    </>
  );
}
