import { Link } from "react-router";
import { ATM } from "../components/atm/ATM";
import insertCardVideo from "../assets/videos/insertar_tarjeta.mp4";

const config = {
  title: "Inserta tu tarjeta",
  left: [],
  right: [],
  screen: (
    <Link to="/" className="btn btn-orange">
      Click aquí para <br /> insertar tu tarjeta
    </Link>
  ),
};

export default function InsertCard() {
  return <ATM config={config} />;
}
