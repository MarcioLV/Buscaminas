import React, {useState} from "react";

import './style/MenuDificultad.css'

function MenuDificultad(prop) {
  const {nivel} = prop 
  const niveles = ["Facil", "Medio", "Dificil"];
  const [visible, setVisible] = useState("hidden");

  function handleClick() {
    if (visible === "hidden") {
      setVisible("visible");
    } else {
      setVisible("hidden");
    }
  }
  function handleSelect(event) {
    prop.handleSelect(event.target.id);
  }

  return (
    <div className="MenuDificultad" onClick={() => handleClick()}>
      {niveles[nivel - 1]}
      <span>
        <img
          className="dificultad-flecha"
          src="https://cdn1.iconfinder.com/data/icons/material-core/10/arrow-drop-down-128.png"
        />
      </span>
      <div className="dificultad-list" style={{ visibility: visible }}>
        <ul
          className="dificultad-list-ul"
          onClick={(event) => handleSelect(event)}
        >
          <li id="1">Facil</li>
          <li id="2">Medio</li>
          <li id="3">Dificil</li>
        </ul>
      </div>
    </div>
  );
}

export default MenuDificultad;
