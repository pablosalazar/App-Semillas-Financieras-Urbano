import { ATM } from "../components/atm/ATM";

const config = {
  title: "Selecciona tu transacción",
  left: [
    {
      number: 3,
      label: "Consulta saldo",
      href: "/modulos/cajero-automatico/insertar-tarjeta",
    },
    {
      number: 4,
      label: "Depósito en efectivo",
      href: "/modulos/cajero-automatico/insertar-tarjeta",
    },
  ],
  right: [],
};

export default function ATMStart() {
  return <ATM config={config} />;
}
