import React from "react";

import Header from "./Header";
import Board from "./Board";

import "./style/App.css";

class App extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      nivel: 2,
      partidaPerdida: false,
      minasRestante: 0,
      winner: false,
      rowCol: [],
      active: false,
      board: [],
      viewBoard: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleReboot = this.handleReboot.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    this.createBoard();
  }

  handleReboot() {
    this.createBoard();
  }

  iAmWinner() {
    const { viewBoard, nivel, rowCol } = this.state;
    const minas = [10, 40, 99];
    const espaciosVacios = rowCol[0] * rowCol[1] - minas[nivel - 1];
    let suma = 0;
    viewBoard.forEach((fila) => {
      const array = fila.filter((element) => element === "visible");
      suma += array.length;
    });
    if (espaciosVacios === suma) {
      return true;
    }
    return false;
  }

  handleSelect(nivel) {
    const level = parseInt(nivel);
    this.setState({ nivel: level }, () => this.createBoard());
  }

  handleClick(event, indexF, indexC) {
    let { viewBoard, partidaPerdida, minasRestante, active } = this.state;
    active = true;
    let ganador;
    if (event.button === 2) {
      if (viewBoard[indexF][indexC] === "noVisible") {
        viewBoard[indexF][indexC] = "bandera";
        minasRestante--;
      } else if (viewBoard[indexF][indexC] === "bandera") {
        viewBoard[indexF][indexC] = "noVisible";
        minasRestante++;
      }
    } else if (event.button === 0) {
      let { board } = this.state;
      viewBoard[indexF][indexC] = "visible";

      if (board[indexF][indexC] === -1) {
        partidaPerdida = true;
        active = false;
        viewBoard = this.mostrarMinas(board, viewBoard);
      } else if (board[indexF][indexC] === 0) {
        viewBoard = this.abrirCasillas(viewBoard, indexF, indexC);
      }
      ganador = this.iAmWinner();
    }
    this.setState({
      viewBoard: viewBoard,
      partidaPerdida: partidaPerdida,
      minasRestante: minasRestante,
      winner: ganador,
      active: active,
    });
  }

  mostrarMinas(board, viewBoard) {
    board.forEach((fila, indexF) => {
      fila.forEach((item, indexC) => {
        if (item === -1) {
          if (viewBoard[indexF][indexC] === "noVisible") {
            viewBoard[indexF][indexC] = "visible";
          }
        } else if (item !== -1 && viewBoard[indexF][indexC] === "bandera") {
          viewBoard[indexF][indexC] = "banderaErronea";
        }
      });
    });
    return viewBoard;
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
            if (viewBoard[indiceF][indiceC] === "noVisible") {
              if (board[indiceF][indiceC] === 0) {
                viewBoard[indiceF][indiceC] = "visible";
                viewBoard = this.abrirCasillas(viewBoard, indiceF, indiceC);
              } else {
                viewBoard[indiceF][indiceC] = "visible";
              }
            }
          }
        }
      }
    }
    return viewBoard;
  }

  createBoard() {
    let filasColumnas = [
      [8, 10],
      [14, 18],
      [20, 24],
    ];
    let minas = [10, 40, 99];
    const { nivel } = this.state;

    const rowCol = filasColumnas[nivel - 1];
    const minasRestante = minas[nivel - 1];

    let board = [];
    let viewBoard = [];

    for (let i = 0; i < rowCol[0]; i++) {
      board.push([]);
      viewBoard.push([]);
      for (let j = 0; j < rowCol[1]; j++) {
        board[i].push(0);
        viewBoard[i].push("noVisible");
      }
    }
    board = this.formatBoard(board, minasRestante);

    this.setState({
      board: board,
      viewBoard: viewBoard,
      rowCol: rowCol,
      minasRestante: minasRestante,
      partidaPerdida: false,
      active: false,
      winner: false,
    });
  }

  formatBoard(board, minas) {
    const filas = board.length;
    const cols = board[0].length;
    for (let i = 0; i < minas; i++) {
      const indexF = Math.floor(Math.random() * filas);
      const indexC = Math.floor(Math.random() * cols);
      if (board[indexF][indexC] !== -1) {
        board[indexF][indexC] = -1;
        board = this.setNumberMines(board, indexF, indexC);
      } else {
        i--;
      }
    }
    return board;
  }

  setNumberMines(board, indexF, indexC) {
    const filas = board.length;
    const cols = board[0].length;
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
      <div className="container">
        <div className="tablero">
          <Header
            minasRestante={this.state.minasRestante}
            handleReboot={this.handleReboot}
            active={this.state.active}
            partidaPerdida={this.state.partidaPerdida}
            handleSelect={this.handleSelect}
            nivel={this.state.nivel}
            winner={this.state.winner}
          />
          <Board
            board={this.state.board}
            viewBoard={this.state.viewBoard}
            handleClick={this.handleClick}
            partidaPerdida={this.state.partidaPerdida}
            nivel={this.state.nivel}
            rowCol={this.state.rowCol}
            winner={this.state.winner}
          />
        </div>
      </div>
    );
  }
}

export default App;
