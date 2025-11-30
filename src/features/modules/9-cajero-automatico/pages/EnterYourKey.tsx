import { useNavigate } from "react-router";
import { ATM } from "../components/atm/ATM";
import { KeyPad } from "../components/key-pad/KeyPad";
import { ATM_BASE_PATH, ATM_ROUTES } from "../constants/atm";

export default function EnterYourKey() {
  const navigate = useNavigate();

  const handlePinComplete = (pin: string) => {
    console.log("PIN entered:", pin);

    // Check if PIN is correct
    if (pin === "1234") {
      // Navigate to the next step after PIN is entered
      navigate(`${ATM_BASE_PATH}/${ATM_ROUTES.SELECT_AMOUNT}`);
    } else {
      // Navigate to wrong password page
      navigate(`${ATM_BASE_PATH}/${ATM_ROUTES.WRONG_PASSWORD}`);
    }
  };

  const config = {
    title: "Por favor ingresa tu clave",
    left: [],
    right: [],
    screen: <KeyPad onComplete={handlePinComplete} maxLength={4} />,
  };

  return <ATM config={config} />;
}
