import React from "react"

import "./style/Header.css"

const Header = () => {
  return (
    <div className="header">
      <div className="dificultad">Dificil</div>
      <div className="gameInfo">
        <div className="gameInfo_minas">99</div>
        <div className="gameInfo_tiempo">000</div>
      </div>
      <div className="reiniciar">reiniciar</div>
    </div>
  )
}

export default Header