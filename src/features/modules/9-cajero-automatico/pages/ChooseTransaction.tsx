import { ATM } from "../components/atm/ATM";

const config = {
  title: "No retires tu tarjeta hasta que no finalice la transacción",
  left: [
    {
      number: 1,
      label: "Retiro cuenta corriente",
      href: null,
    },
    {
      number: 2,
      label: "Retiro cuenta de ahorro",
      href: null,
    },
    {
      number: 3,
      label: "Transferencia entre cuentas",
      href: null,
    },
    {
      number: 4,
      label: "Cambio de clave",
      href: null,
    },
  ],
  right: [
    {
      number: 1,
      label: "Saldo cuenta corriente",
      href: null,
    },
    {
      number: 2,
      label: "Saldo cuenta de ahorro",
      href: null,
    },
    {
      number: 3,
      label: "Retiro ahorro a la mano",
      href: "/modulos/cajero-automatico/ingresa-tu-clave",
    },
    {
      number: 4,
      label: "Otras transacciones",
      href: null,
    },
  ],
  screen: <div>hehe</div>,
};

export default function ChooseTransaction() {
  return <ATM config={config} />;
}
