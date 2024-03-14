import React from 'react';

const GameMsg = (props) => {
  let message = "Red's Turn";
  if(props.message.length){
    message = props.message;
  }else if(!props.message.length && props.player === 'y'){
    message = "Yellow's Turn";
  }
  return(
    <div>
      <div id="game-msg">{message}</div>
    </div>
  );
};

export default GameMsg;
