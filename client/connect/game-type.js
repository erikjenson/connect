import React, { useState } from 'react';

const GameType = ({setGameType}) => { 

//up next
//<a className="game-option" onClick={()=>{setGameType('vsRemote')}}>Play against someone who's on another device</a>

  return(
    <div className='flex-col choose'>
      <a className="game-option" onClick={()=>{setGameType('vsAI')}}>Play against Erik's code</a>
      <a className="game-option" onClick={()=>{setGameType('vsLocal')}}>Play in person with someone on this device</a>
    </div>
  )
}

export default GameType;