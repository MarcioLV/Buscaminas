import React from "react";

import "./style/Board.css";

function Board(prop) {
  const { board, viewBoard, partidaPerdida} = prop;

  function handleClick(event, indexF, indexC) {
    event.preventDefault();
    if(partidaPerdida){return}
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
            if (viewBoard[indexF][indexC] === "visible") {
              if(valor === -1){
                valorVisible = '*'
              }
              else if(valor !== 0){
                valorVisible = valor.toString();
              }
              color += "-visible";
            }
            else if (viewBoard[indexF][indexC] === "bandera"){
              valorVisible = 'P'
            }
            else if(viewBoard[indexF][indexC] === "banderaErronea"){
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
