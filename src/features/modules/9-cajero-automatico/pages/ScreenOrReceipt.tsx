import { ATM } from "../components/atm/ATM";

export default function ScreenOrReceipt() {
  const config = {
    title: "Deseas imprimir el recibo o verlo en pantalla?",

    left: [
      {
        number: 4,
        label: "Imprimir recibo",
        href: null,
      },
    ],
    right: [
      {
        number: 4,
        label: "Ver en pantalla",
        href: null,
      },
    ],
  };

  return <ATM config={config} />;
}
