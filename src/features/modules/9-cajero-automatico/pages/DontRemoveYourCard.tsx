import { useEffect } from "react";
import { ATM } from "../components/atm/ATM";
import infoImg from "../assets/images/info.png";
import { useNavigate } from "react-router";

const config = {
  title: "No retires tu tarjeta hasta que no finalice la transacción",
  left: [],
  right: [],
  screen: (
    <div>
      <img src={infoImg} alt="info" />
    </div>
  ),
};

export default function DontRemoveYourCard() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/modulos/cajero-automatico/elige-transaccion");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return <ATM config={config} />;
}
