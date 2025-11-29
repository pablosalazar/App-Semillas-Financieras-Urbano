import { createContext, useContext, useState } from "react";
import { Outlet } from "react-router";

interface ATMContextType {
  operationType: string;
  setOperationType: (type: string) => void;
}

const ATMContext = createContext<ATMContextType | undefined>(undefined);

export function ATMProvider() {
  const [operationType, setOperationType] = useState<string>("");

  return (
    <ATMContext.Provider value={{ operationType, setOperationType }}>
      <Outlet />
    </ATMContext.Provider>
  );
}

export function useATM() {
  const context = useContext(ATMContext);
  if (context === undefined) {
    throw new Error("useATM must be used within an ATMProvider");
  }
  return context;
}
