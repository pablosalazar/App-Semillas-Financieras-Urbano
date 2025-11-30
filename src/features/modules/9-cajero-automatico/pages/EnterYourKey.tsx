import { useNavigate } from "react-router";
import { ATM } from "../components/atm/ATM";
import { KeyPad } from "../components/key-pad/KeyPad";
import { ATM_BASE_PATH, ATM_ROUTES } from "../constants/atm";

export default function EnterYourKey() {
  const navigate = useNavigate();

  const handlePinComplete = (pin: string) => {
    console.log("PIN entered:", pin);
    // Navigate to the next step after PIN is entered
    navigate(`${ATM_BASE_PATH}/${ATM_ROUTES.SELECT_AMOUNT}`);
  };

  const config = {
    title: "Por favor ingresa tu clave",
    left: [],
    right: [],
    screen: <KeyPad onComplete={handlePinComplete} maxLength={4} />,
  };

  return <ATM config={config} />;
}
