import { useAuthenticatedUser } from "@/context";
import { Modal } from "@/shared/components/ui";
import { displayName } from "@/shared/utils/user";
import { useState } from "react";

export function Header() {
  const user = useAuthenticatedUser();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <header className="bg-white py-4 px-6 flex justify-between items-center">
      <span>{displayName(user)}</span>
      <button onClick={handleOpen}>Open</button>
      <Modal isOpen={isOpen} onClose={handleClose} size="full">
        <div>
          <h2>Modal</h2>
        </div>
      </Modal>
    </header>
  );
}
