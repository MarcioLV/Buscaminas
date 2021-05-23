import React, { useState, useEffect } from "react";

import "./style/Header.css";

function Timer(active){
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval
    if(active){
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  });
  return seconds
}

const Header = (prop) => {
  const { minasRestante } = prop;
  const { active } = prop 

  // const [isActive, setIsActive] = useState(false)

  function handleReboot() {
    setSeconds(0)
    prop.handleReboot();
  }


  return (
    <div className="header">
      <div className="dificultad">Dificil</div>
      <div className="gameInfo">
        <div className="gameInfo_minas">
          <img
            src="https://www.google.com/logos/fnbx/minesweeper/flag_icon.png"
            className="gameInfo_minas_bandera"
          />
          {minasRestante}
        </div>
        <div className="gameInfo_tiempo">
          <img
            src="https://www.google.com/logos/fnbx/minesweeper/clock_icon.png"
            className="gameInfo_tiempo_reloj"
          />
          {Timer(active)}
        </div>
      </div>
      <div className="reiniciar" onClick={() => handleReboot()}>
        Reiniciar
      </div>
    </div>
  );
};

export default Header;
