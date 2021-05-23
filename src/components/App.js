import React from "react";

import Header from "./Header";
import Board from "./Board";

import "./style/App.css";

class App extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      nivel: 3,
      partidaPerdida: false,
      board: [],
      viewBoard: [],
    };    
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.createBoard();
  }

  // componentDidUpdate(){
  //   if(this.state.partidaPerdida){
  //     alert('Partidad Perdida')
  //   }
  // }

  handleClick(event, indexF, indexC) {
    let { viewBoard } = this.state;
    let {partidaPerdida} = this.state
    if(event.button === 2){
      if(viewBoard[indexF][indexC] === "noVisible"){
        viewBoard[indexF][indexC] = "bandera"
      }
      else if(viewBoard[indexF][indexC] === "bandera"){
        viewBoard[indexF][indexC] = "noVisible"
      }
    }
    else if(event.button === 0){
      let { board } = this.state;
      viewBoard[indexF][indexC] = "visible";
      //si toque mina pierdo
      if(board[indexF][indexC] === -1){
        partidaPerdida = true
        viewBoard = this.mostrarMinas(board, viewBoard)
      }
      //muestro todas las minas
      //las minas con bandera no se muestran
      //las banderas mal ubicadas salen con una cruz
  
      else if (board[indexF][indexC] === 0) {
        viewBoard = this.abrirCasillas(viewBoard, indexF, indexC);
      }
    }
    this.setState({ viewBoard: viewBoard, partidaPerdida: partidaPerdida });
  }

  mostrarMinas(board, viewBoard){
    board.forEach((fila, indexF) => {
      fila.forEach((item, indexC) =>{
        //mostrar minas no descubiertas
        //no mostrar minas con bandera
        //mostrar X en banderas mal hubicadas
        if(item === -1){
          if(viewBoard[indexF][indexC] === "noVisible"){
            viewBoard[indexF][indexC] = "visible"
          }
        }
        else if(item !== -1 && viewBoard[indexF][indexC] === "bandera"){
          viewBoard[indexF][indexC] = "banderaErronea"
        }
      })
    })
    return viewBoard
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
              viewBoard[indiceF][indiceC] === 'noVisible'
            ) {
              viewBoard[indiceF][indiceC] = 'visible';
              viewBoard = this.abrirCasillas(viewBoard, indiceF, indiceC);
            } else {
              viewBoard[indiceF][indiceC] = 'visible';
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
        viewBoard[i].push('noVisible');
      }
    }
    this.setState({ board: board, viewBoard: viewBoard }, () => {
      this.formatBoard();
    });
  }

  formatBoard() {
    let { board } = this.state;
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
