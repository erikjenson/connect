import React, {useEffect, useState}  from 'react';
import PaintBoard from './paint-board';
import ClearBoard from './clear-board';
import GameMsg from './game-msg';
import Players from './players';
import GameOptions from './game-options';
import GameType from './game-type';
import checkBoard from './check-board';
import minimax from './minimax';

function Game (props) {

  const {cursor, setCursor} = props

  const [player, setPlayer] = useState('r')
  //vsAI vsLocal vsRemote
  const [gameType, setGameType] = useState('')
  //[1,2,3,4]
  const [difficulty, setDifficulty] = useState(4)
  const [playerWins, setPlayerWins] = useState(0)
  const [opponentWins, setOpponentWins] = useState(0)
  const [gameMsg, setGameMsg] = useState('')
  const [board, setBoard] = useState([])
  const [turn, setTurn] = useState('r')
  const [gameOver, setGameOver] = useState(true)
  const [start, setStart] = useState(false)
  const opponent = player === 'r' ? 'y' : 'r'

  useEffect(()=>{
    //make algorithm move
    if (start && turn !== player && !gameOver && gameType === "vsAI"){
      let aiMove = minimax(board, difficulty, Number.NEGATIVE_INFINITY, Infinity, true)
      setTimeout(() => {
        dropChip(aiMove[0])
      }, "750")
    }
  }, [turn, gameOver, player, start])

  //add a piece to the board if the column is open
  function dropChip(column) {
    if (!gameOver){
      let row = -1
      let piece = player === turn ? 1 : 2
      for (let i = board.length-1; i>=0; i--){
        if (board[i][column] === 0){
          board[i][column] = piece
          row = i
          break
        }
      }
      //if row isn't updated, the column is full, try again
      //the algorithm won't pick a full column
      if (row < 0){
        setGameMsg("That's full!")
        return
      }
      //check if the move was a win
      const lastMove = checkBoard(row, column, board)
      //update game state
      updateGame(lastMove, board)
    }
  }

  //update turn, update board, set message, end game, update scores
  function updateGame(lastMove, board){
    let message = ''
    let nextTurn = turn
    let pWins = playerWins
    let oWins = opponentWins

    const validMoves = getValidColumns(board)
    const noMoves = validMoves.length === 0 ? true : false
    const win = lastMove.length > 3

    if (win){
      setGameOver(true)
      board = styleWinningChips(turn, lastMove, board)
      message = turn === 'y'? 'Yellow Wins!' : 'Red Wins!'
      if (turn === player){
        pWins++
        setPlayerWins(pWins)
      } else {
        oWins++
        setOpponentWins(oWins)
      }
    } else if (noMoves){
      setGameOver(true)
      message = "It's a Tie!"
    } else {
      nextTurn = turn === 'r' ? 'y' : 'r'
      message = ''
      //toggle the cursor color when playing locally
      if (gameType === 'vsLocal'){
        setCursor(nextTurn)
      }
    }
    setGameMsg(message)
    setTurn(nextTurn)
    setBoard(board)
  }

  //returns indexes of open columns in the top row of the board
  function getValidColumns(board){
    let columns = []
    for (let i = 0; i < board[0].length; i++){
      if (board[0][i] === 0){
        columns.push(i)
      }
    }
    return columns
  }

  //adds a shimmer css animation to the winning td's when the board is redrawn
  function styleWinningChips(player, winningIndexes, board){
    for (let i = 0; i < winningIndexes.length; i++){
      board[winningIndexes[i][0]][winningIndexes[i][1]] = `${player} win`
    }
    return board
  }

  //this sets a new game at the start and when clearing the board
  function startNewGame(){
    const rowCount = 6
    const columnCount = 7
    let newBoard = []
    for(let i = 0; i < rowCount; i++){
      let row = []
      for(let j = 0; j < columnCount; j++){
        row.push(0)
      }
      newBoard.push(row)
    }
    setTurn(cursor)
    setBoard(newBoard)
    setGameMsg('')
    setGameOver(false)
  }

  //cleans up state when leaving the game
  function leaveGame(){
    setStart(false)
    setBoard([])
    setGameMsg('')
    setGameType('')
    setGameOver(true)
  }

    return (
      <div>
        {!gameType && <GameType setGameType={setGameType}/>}
        {gameType && 
          <div>
            {!start && (
              <div className="flex-col">
                  <GameOptions setStart={setStart} startNewGame={startNewGame} difficulty={difficulty} setDifficulty={setDifficulty} player={player} setPlayer={setPlayer} setCursor={setCursor} gameType={gameType}/>
              </div>
            )}
            {start && (
              <div className="flex-col">
                  <Players player={player} playerWins={playerWins} opponentWins={opponentWins} leaveGame={leaveGame} gameType={gameType}/>
                  <GameMsg player={turn} message={gameMsg} />
                  <PaintBoard boardData={board} dropChip={dropChip} player={player} turn={turn} gameType={gameType}/>
                  <ClearBoard startNewGame={startNewGame} />
              </div>
            )}
          </div>
        }
      </div>
    )
}

export default Game