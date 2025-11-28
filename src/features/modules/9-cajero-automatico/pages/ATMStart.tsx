import btnRightATM from "../assets/images/btn-right-atm.png";
import btnLeftATM from "../assets/images/btn-left-atm.png";
import fmmHeader from "../assets/images/fmm-header.png";
import "../styles.css";

export default function ATMStart() {
  const leftOptions = [
    "Retiro cuenta corriente",
    "Retiro cuenta de ahorros",
    "Transferencias",
    "Cambio de clave",
  ];

  const rightOptions = [
    "Saldo cuenta corriente",
    "Saldo cuenta de ahorros",
    "Retiro ahorro a la mano",
    "Otras transacciones",
  ];

  return (
    <div className="atm bg-default">
      <div className="atm__header"></div>

      <div className="atm__main">
        <div className="atm__sidebar atm__sidebar--left">
          <div className="atm__buttons">
            {leftOptions.map((_, index) => (
              <button key={index} className="atm__button">
                <img
                  src={btnLeftATM}
                  alt={`Left button ${index + 1}`}
                  className="atm__button-img"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Center screen */}
        <div className="atm__screen">
          {/* Screen header with logo */}
          <div className="atm__screen-header">
            <img src={fmmHeader} alt="FMM Header" className="atm__logo" />
            <h2 className="atm__title">Selecciona tu transacción</h2>
          </div>

          {/* Menu options */}
          <div className="atm__menu">
            <div className="atm__menu-column atm__menu-column--left">
              {leftOptions.map((option, index) => (
                <div key={index} className="atm__menu-option">
                  {option}
                </div>
              ))}
            </div>
            <div className="atm__menu-column atm__menu-column--right">
              {rightOptions.map((option, index) => (
                <div key={index} className="atm__menu-option">
                  {option}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar with buttons */}
        <div className="atm__sidebar atm__sidebar--right">
          <div className="atm__buttons">
            {rightOptions.map((_, index) => (
              <button key={index} className="atm__button">
                <img
                  src={btnRightATM}
                  alt={`Right button ${index + 1}`}
                  className="atm__button-img"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="atm__footer"></div>
    </div>
  );
}
