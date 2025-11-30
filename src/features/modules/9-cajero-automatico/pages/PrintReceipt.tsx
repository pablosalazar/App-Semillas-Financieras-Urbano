import { ATM } from "../components/atm/ATM";

export default function PrintReceipt() {
  const config = {
    title: "Imprimir recibo",

    left: [
      {
        number: 3,
        label: "Consulta saldo",
        href: null,
      },
      {
        number: 4,
        label: "Retirar dinero",
        href: null,
      },
    ],
    right: [],
  };

  return <ATM config={config} />;
}
