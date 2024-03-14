import React from 'react';

function PaintBoard (props) {

  const {boardData, dropChip, player, turn, gameType} = props
  let opponent = player === 'r' ? 'y' : 'r'
  
  //draw a new board from board array
  let table = []
  for (let h = 0; h < boardData.length; h++) {
    let tr = []
    for (let w = 0; w < boardData[0].length; w++) {
      let className = ''
      // let className = boardData[h][w]
      if(boardData[h][w] === 1){
        className = player
      }else if(boardData[h][w] === 2){
        className = opponent
      }
      const td = <td key={h+w} data-r={h} data-c={w} className={className}/>
      tr.push(td)
    }
    table.push(<tr key={h}>{tr}</tr>)
  }

  /* allow both players to drop a chip when 'vsLocal'. otherwise only the user can move on 
  their turn against the computer since 'player' does not update after the start */
  let canDrop = player === turn
  if (gameType === "vsLocal"){
    canDrop = true
  }

  return (
    <table id="connect-table">
      <tbody onClick={(e)=>{canDrop ? dropChip(+e.target.dataset.c) : ''}}>{table}</tbody>
    </table>
  );
};

export default PaintBoard;
