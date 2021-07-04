import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//Square渲染了一个单独的button
// class Square extends React.Component {
    //添加一个构造函数，用来初始化 state
    // constructor(props){
    //     super(props);
    //     this.state={
    //         value:null,
    //     }
    // }
    //在 Square 组件 render 方法中的 onClick 事件监听函数中调用 this.setState，我们就可以在每次 <button> 被点击的时候通知 React 去重新渲染 Square 组件。组件更新之后，Square 组件的 this.state.value 的值会变为 'X'，因此，我们在游戏棋盘上就能看见 X 了。点击任意一个方格，X 就会出现了。每次在组件中调用 setState 时，React 都会自动更新其子组件。
//     render() {
//       return (
//         <button 
//         className="square" 
//         onClick={()=>this.props.onClick()}>
//           {this.props.value}
//         </button>
//       );
//     }
//   }
  function Square(props){
      return(
        <button 
            className="square" 
            onClick={props.onClick}>
            {props.value}
        </button>
      )
  }
  //Board渲染了9个方块
  class Board extends React.Component {
      //为 Board 组件添加构造函数，将 Board 组件的初始状态设置为长度为 9 的空值数组：
    //   constructor(props){
    //       super(props)
    //       this.state={
    //           squares:Array(9).fill(null),
    //           //将 “X” 默认设置为先手棋
    //           xIsNext:true,
    //       }
    //   }
      //向 Board 里添加 handleClick 方法
      //棋子每移动一步，xIsNext（布尔值）都会反转，该值将确定下一步轮到哪个玩家，并且游戏的状态会被保存下来。我们将通过修改 Board 组件的 handleClick 函数来反转 xIsNext 的值：
      
      //从 Board 组件向 Square 组件传递一个函数，当 Square 被点击的时候，这个函数就会被调用。
      //在 Board 组件的 render 方法中调用 calculateWinner(squares) 检查是否有玩家胜出。一旦有一方玩家胜出，就把获胜玩家的信息显示出来，比如，“胜者：X” 或者“胜者：O”。
    renderSquare(i) {
        return(
            <Square 
            value={this.props.squares[i]}
            onClick={()=>this.props.onClick(i)}
          />
          );
        }
        render(){
        // const winner=calculateWinner(this.state.squares);
        // let status;
        // if(winner){
        //     status='Winner:'+winner;
        // }
        // else{
        //     status='Next player:'+(this.state.xIsNext?'X':'O');
        // }
      return (
        <div>
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
  
  //Game渲染了含有默认值的一个棋盘
  class Game extends React.Component {
      constructor(props){
          super(props)
          this.state={
              history:[{
                  squares:Array(9).fill(null),
              }],
              stepNumber: 0,
              xIsNext:true
             
          }
      }
      handleClick(i){   
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares=current.squares.slice()
        if(calculateWinner(squares)||squares[i]){
            return;
        }
        squares[i]=this.state.xIsNext?'X':'O'
        this.setState({
            history: history.concat([{
                squares:squares,
            }]),
            stepNumber: history.length,
            xIsNext:!this.state.xIsNext,
          });
    }
    jumpTo(step){
        this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0,
        });
      }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
            const desc = move ?
              'Go to move #' + move :
              'Go to game start';
            return (
              <li key={move}>
                <button onClick={() => this.jumpTo(move)}>{desc}</button>
              </li>
            );
          });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } 
        else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

      return (
        <div className="game">
          <div className="game-board">
            <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
             />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  //判断胜出者
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