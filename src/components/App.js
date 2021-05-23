import React from "react";

import Header from "./Header";
import Board from "./Board";

import "./style/App.css";

class App extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      nivel: 3,
      board: [],
      viewBoard: [],
    };    
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.createBoard();
  }

  handleClick(event, indexF, indexC) {
    let { viewBoard } = this.state;
    if(event.button === 2){
      if(viewBoard[indexF][indexC] === 0){
        viewBoard[indexF][indexC] = 2
      }
      else if(viewBoard[indexF][indexC] === 2){
        viewBoard[indexF][indexC] = 0
      }
    }
    else if(event.button === 0){
      let { board } = this.state;
      viewBoard[indexF][indexC] = 1;
      //si toque mina pierdo
  
      if (board[indexF][indexC] === 0) {
        viewBoard = this.abrirCasillas(viewBoard, indexF, indexC);
      }
    }
    this.setState({ viewBoard: viewBoard });
  }

  abrirCasillas(viewBoard, indexF, indexC) {
    const filas = viewBoard.length;
    const cols = viewBoard[0].length;
    const { board } = this.state;
    for (let f = -1; f <= 1; f++) {
      const indiceF = indexF + f;
      if (indiceF > -1 && indiceF < filas) {
        for (let c = -1; c <= 1; c++) {
          const indiceC = indexC + c;
          if (indiceC > -1 && indiceC < cols) {
            if (
              board[indiceF][indiceC] === 0 &&
              viewBoard[indiceF][indiceC] === 0
            ) {
              viewBoard[indiceF][indiceC] = 1;
              viewBoard = this.abrirCasillas(viewBoard, indiceF, indiceC);
            } else {
              viewBoard[indiceF][indiceC] = 1;
            }
          }
        }
      }
    }
    return viewBoard;
  }

  createBoard() {
    let fila = 0;
    let col = 0;

    if (this.state.nivel === 3) {
      fila = 20;
      col = 24;
    }
    let board = [];
    let viewBoard = [];
    for (let i = 0; i < fila; i++) {
      board.push([]);
      viewBoard.push([]);
      for (let j = 0; j < col; j++) {
        board[i].push(0);
        viewBoard[i].push(0);
      }
    }
    this.setState({ board: board, viewBoard: viewBoard }, () => {
      this.formatBoard();
    });
  }

  formatBoard() {
    let { board } = this.state;
    //colocamos las minas
    let minas = 0;
    const filas = board.length;
    const cols = board[0].length;
    if (this.state.nivel === 3) {
      minas = 99;
    }
    for (let i = 0; i < minas; i++) {
      const indexF = Math.floor(Math.random() * filas);
      const indexC = Math.floor(Math.random() * cols);
      if (board[indexF][indexC] !== -1) {
        board[indexF][indexC] = -1;
        board = this.setNumberMines(board, indexF, indexC, filas, cols);
      } else {
        i--;
      }
    }
    //colocamos los numeros alrededor de las minas
    // board.forEach((fila, indexF) => {
    //   fila.forEach((valor, indexC) => {
    //     if (valor !== -1) {
    //       let cantMinas = 0;
    //       for (let f = -1; f <= 1; f++) {
    //         const indiceF = indexF + f;
    //         if (indiceF > -1 && indiceF < board.length) {
    //           for (let c = -1; c <= 1; c++) {
    //             const indiceC = indexC + c;
    //             if (indiceC > -1 && indiceC < fila.length) {
    //               if (board[indiceF][indiceC] === -1) {
    //                 cantMinas += 1;
    //               }
    //             }
    //           }
    //         }
    //       }
    //       if (cantMinas !== 0) {
    //         board[indexF][indexC] = cantMinas;
    //       }
    //     }
    //   });
    // });
    this.setState({ board: board });
  }
  setNumberMines(board, indexF, indexC, filas, cols) {
    for (let f = -1; f <= 1; f++) {
      const indiceF = indexF + f;
      if (indiceF > -1 && indiceF < filas) {
        for (let c = -1; c <= 1; c++) {
          const indiceC = indexC + c;
          if (indiceC > -1 && indiceC < cols) {
            if (board[indiceF][indiceC] !== -1) {
              board[indiceF][indiceC] += 1;
            }
          }
        }
      }
    }
    return board;
  }

  render() {
    return (
      <div className="game">
        <div className="container">
          <div className="tablero">
            <Header />
            <Board
              board={this.state.board}
              viewBoard={this.state.viewBoard}
              handleClick={this.handleClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
