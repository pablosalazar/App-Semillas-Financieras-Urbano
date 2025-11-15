import { useAuthenticatedUser } from "@/context";
import { UserSummary } from "@/fetaures/users/components/UserSummary";
import { Modal } from "@/shared/components/ui";
import { displayName } from "@/shared/utils/user";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

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

  // Close modal when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className="bg-white py-4 px-6 flex justify-between items-center">
      <span>{displayName(user)}</span>
      <button onClick={handleOpen}>Open</button>
      <Modal isOpen={isOpen} onClose={handleClose} size="full">
        <UserSummary />
      </Modal>
    </header>
  );
}
