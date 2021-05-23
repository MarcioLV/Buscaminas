import React from "react"

import "./style/Header.css"

function Header(prop){
  const {minasRestante} = prop
  return (
    <div className="header">
      <div className="dificultad">Dificil</div>
      <div className="gameInfo">
        <div className="gameInfo_minas">{minasRestante}</div>
        <div className="gameInfo_tiempo">000</div>
      </div>
      <div className="reiniciar">Reiniciar</div>
    </div>
  )
}

export default Header