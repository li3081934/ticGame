require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
function Square(props){
  return (
    <button className="square" onClick={()=>props.onClick()}>
      {props.value}
    </button>
  )
}
/*class Square extends React.Component {
  /!*constructor(){
    super();
    this.state={
      value:null
    };
  }*!/

  render() {
    return (
      <button className="square" onClick={()=>this.props.onClick()}>
        {this.state.value}
      </button>
    );
  }
}*/

class Board extends React.Component {
  /*constructor(){
    super();
    this.state={
      squares:Array(9).fill(null),
      xIsNext:true
    }
  }*/

  renderSquare(i) {
    return <Square value={this.props.squares[i]} onClick={()=>this.props.onClick(i)}/>;
  }
  render() {
    //const status = 'Next player: X';
    const winner = calculateWinner(this.props.squares);
    let status;
    if(winner){
      status='Winner:'+winner;
    }else status='Next player:'+(this.props.xIsNext?'X':'0');
    return (
      <div>
        <div className="status"></div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(){
    super()
    this.state ={
      history:[{squares:Array(9).fill(null)}],
      xIsNext:true
    }
  }
  handleClick(i){
    const history = this.state.history;
    const current = history[history.length-1];
    //const squares=current.squares.slice()
    const squares=current.squares;
    if(calculateWinner(squares)||squares[i]){
      return
    }
    squares[i]=this.state.xIsNext?'X':'0';
    this.setState({
      history:history.concat({
        squares:squares
      }),
      xIsNext:!this.state.xIsNext
    });
  }
  render() {
    const history = this.state.history;
    const current = history[history.length-1];
    const winner=calculateWinner(current.squares);
    let status;
    if(winner){
      status = 'Winner:'+winner;
    }else {
      status = 'Next player:'+(this.state.xIsNext?'X':'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(i)=>this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================
/*

ReactDOM.render(
  <Game />,
  document.getElementById('app')
);
*/

function calculateWinner(squares) {

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


/*class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
      </div>
    );
  }
}
 */
Game.defaultProps = {
};

export default Game;
