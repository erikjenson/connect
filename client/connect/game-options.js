import React, { useState } from 'react';

//this will display instead of the game until selections are made
const GameOptions = props => { 

    const {setStart, startNewGame, difficulty, setDifficulty, player, setPlayer, gameType, setCursor} = props
    
    //makes a list of difficulty level options with the selection styled
    const levels = [1,2,3,4]
    const levelChoices = levels.map((l)=>
        <div key={l} className={l == difficulty ? 'level-option' + ' selected' : 'level-option'}>
            <a onClick={()=>{setDifficulty(l)}}>{l}</a>
        </div>)

    //allows user to choose their player and cursor color
    function handleClick(color){
        setPlayer(color)
        setCursor(color)
    }

  return(
      <div className='flex-col'>
        {gameType !== "vsLocal" &&
            <div className="options-title">Choose Your Piece</div>
        }
        {gameType === "vsLocal" &&
            <div className="in-person-title">Who Goes First?</div>
        }
        <div id='players'>
            <a onClick={()=>{handleClick('r')}}><div className={player == 'r' ? 'r options-piece'+' selected': 'r options-piece'}></div></a>
            <a onClick={()=>{handleClick('y')}}><div className={player == 'y' ? 'y options-piece'+' selected': 'y options-piece'}></div></a>
        </div>
        {gameType === 'vsAI'&&
        <div className='flex-col'>
            <div className="options-title">Difficulty Level</div>
                <div className='flex-row'>
                    {levelChoices}
                </div> 
        </div> 
        }
        <div className='start-vs-ai'>
            <a className='start-vs-ai-btn' onClick={()=>{setStart(true); startNewGame()}}>START</a></div>
      </div>
  )
}

export default GameOptions;
