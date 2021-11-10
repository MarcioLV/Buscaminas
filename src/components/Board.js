import React, { useState, useEffect } from "react";

import Winner from './winner'

import "./style/Board.css";

function Board(prop) {
  const { board, viewBoard, partidaPerdida, rowCol, nivel, winner } = prop;
  const [opened, setOpened] = useState(false)

  const grilla = {
    display: "grid",
    gridTemplate: `repeat(${rowCol[0]}, 1fr) / repeat(${rowCol[1]}, 1fr)`,
  };

  useEffect(()=>{
    if (winner) {
      board.forEach((fila, indexF) => {
        fila.forEach((valor, indexC) => {
          if (valor === -1 && viewBoard[indexF][indexC] !== "bandera") {
            viewBoard[indexF][indexC] = "bandera";
          }
        });
      });
      setTimeout(() => setOpened(true), 100);
    }
  },[winner])

  const handleClick = (event, indexF, indexC) => {
    event.preventDefault();
    if (partidaPerdida || winner) {
      return;
    }
    prop.handleClick(event, indexF, indexC);
  }

  const closeModal = () => {
    setOpened(false)
  }

  return (
    <div className="board" style={grilla}>
      <Winner isOpened={opened} onClose={closeModal} />
      {board.map((fila, indexF) => {
        return fila.map((valor, indexC) => {
          let color = "item-lightgreen";
          let valorVisible = "";
          let colorNumero = "numero-";

          if ((indexF + indexC) % 2 === 0) {
            color = "item-green";
          }

          if (viewBoard[indexF][indexC] === "visible") {
            if (valor === -1) {
              color = "item-red";
              valorVisible = (
                <div className="mina">
                  <div className="mina_center"></div>
                </div>

);
            } else if (valor !== 0) {
              valorVisible = valor.toString();
              colorNumero += valorVisible;
            }
            color += "-visible";
          } else if (viewBoard[indexF][indexC] === "bandera") {
            valorVisible = (
              <img
                className="bandera_img"
                src="https://www.google.com/logos/fnbx/minesweeper/flag_icon.png"
              />
            );
          } else if (viewBoard[indexF][indexC] === "banderaErronea") {
            valorVisible += "X";
          }
          return (
            <div
              className={`item ${color} ${colorNumero}`}
              key={indexF.toString() + indexC.toString()}
              onClick={(event) => {
                if (valorVisible === "") {
                  handleClick(event, indexF, indexC);
                }
              }}
              onContextMenu={(event) => handleClick(event, indexF, indexC)}
            >
              {valorVisible}
            </div>
          );
        });
      })}
    </div>
  );
}

export default Board;
