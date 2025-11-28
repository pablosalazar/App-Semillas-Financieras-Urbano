import { ATM } from "../components/ATM";

const config = {
  left: [
    {
      number: 3,
      label: "Consulta saldo",
      href: null,
    },
    {
      number: 4,
      label: "Depósito en efectivo",
      href: null,
    },
  ],
  right: [],
};

export default function ATMStart() {
  return <ATM config={config} />;
}
