import React, {useState} from 'react';

const Players = props => {

  const {player, playerWins, opponentWins, leaveGame, gameType} = props
  const [toggleLeave, setToggleLeave] = useState(false)
  const opponentChip = player === 'r'? 'y chip': 'r chip'
  const playerChip = `${player} chip`
  let userName = 'You'
  let opponentName = 'AI'

  if (gameType === "vsLocal"){
    userName = ''
    opponentName = ''
  }
  
  return(
    <div id='players'>
      <div className={playerChip}><div>{userName}</div><div className="wins">wins: {playerWins}</div></div>
      {toggleLeave && (
      <div id="leave-box">
        <div className="dialogue">
          <div className="margin-bottom-20">Leave the game?</div>
          <div className="start-buttons">
            <a className="start-btn" onClick={()=>{leaveGame();setToggleLeave(false);}}>YES</a>
            <a className="start-btn" onClick={()=>setToggleLeave(false)}>NO</a>
          </div>
        </div>
      </div>)}
      <div><a className="vs-toggle" type="button" onClick={()=>{setToggleLeave(true)}}>VS.</a></div>
      <div className={opponentChip}><div>{opponentName}</div><div className="wins">wins: {opponentWins}</div></div>
    </div>
  );
};

export default Players
