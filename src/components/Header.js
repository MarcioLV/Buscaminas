import React from "react";

import Timer from "./Timer";
import MenuDificultad from "./MenuDificultad";

import "./style/Header.css";

const Header = (prop) => {
  const { minasRestante, active, nivel, partidaPerdida, winner } = prop;

  let banderas = minasRestante.toString();
  if (banderas.length < 2) {
    banderas = "0" + banderas;
  }

  function handleReboot() {
    prop.handleReboot();
  }

  return (
    <div className="header">
      <div className="dificultad">
        <MenuDificultad nivel={nivel} handleSelect={prop.handleSelect} />{" "}
      </div>
      <div className="gameInfo">
        <div className="gameInfo_minas">
          <img
            src="https://www.google.com/logos/fnbx/minesweeper/flag_icon.png"
            className="gameInfo_minas_bandera"
          />
          {banderas}
        </div>
        <div className="gameInfo_tiempo">
          <img
            src="https://www.google.com/logos/fnbx/minesweeper/clock_icon.png"
            className="gameInfo_tiempo_reloj"
          />
          <Timer
            active={active}
            winner={winner}
            partidaPerdida={partidaPerdida}
          />
        </div>
      </div>
      <div className="reiniciar" onClick={() => handleReboot()}>
        Reiniciar
      </div>
    </div>
  );
};

export default Header;
