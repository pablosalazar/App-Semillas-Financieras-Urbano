import { ATM } from "../components/atm/ATM";
import { ATM_OPERATIONS } from "../constants/atm";
import { useATM } from "../context/ATMContext";
import { useNavigate } from "react-router";

export default function ATMStart() {
  const navigate = useNavigate();
  const { setOperationType } = useATM();

  const config = {
    title: "Selecciona tu transacción",

    left: [
      {
        number: 3,
        label: "Consulta saldo",
        onClick: () => {
          setOperationType(ATM_OPERATIONS.CHECK_BALANCE);
          navigate("/modulos/cajero-automatico/insertar-tarjeta");
        },
      },
      {
        number: 4,
        label: "Retirar dinero",
        onClick: () => {
          setOperationType(ATM_OPERATIONS.WITHDRAW_MONEY);
          navigate("/modulos/cajero-automatico/insertar-tarjeta");
        },
      },
    ],
    right: [],
  };

  return <ATM config={config} />;
}
