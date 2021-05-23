import React, { useState } from "react";

import "./style/Board.css";

function Board(prop) {
  const { board } = prop;
  const { viewBoard } = prop;

  function handleClick(event, indexF, indexC) {
    event.preventDefault();
    prop.handleClick(event, indexF, indexC);
  }

  return (
    <div className="contenedor">
      <div className="board">
        {board.map((fila, indexF) => {
          return fila.map((valor, indexC) => {
            const indF = indexF.toString();
            const indC = indexC.toString();
            let color = "item-lightgreen";
            let valorVisible = "";
            if ((indexF + indexC) % 2 === 0) {
              color = "item-green";
            }
            if (viewBoard[indexF][indexC] === 1) {
              if(valor !== 0){
                valorVisible = valor.toString();
              }
              color += "-visible";
            }
            else if (viewBoard[indexF][indexC] === 2){
              valorVisible = '*'
            }
            else if(viewBoard[indexF][indexC] === 3){
              valorVisible = 'X'
            }
            return (
              <div
                className={`item ${color}`}
                key={indF + indC}
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
    </div>
  );
}

export default Board;
