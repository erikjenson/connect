import React, {useState} from 'react';

const ClearBoard = ({startNewGame}) => {
  //this pop-up is disabled
  const [toggleClear, setToggleClear] = useState(false);

  return(
    <div id="control-panel">
      {toggleClear && (
      <div>
        <div className="dialogue">
          <div className="margin-bottom-20">Really?</div>
          <div className="start-buttons">
            <a className="start-btn" onClick={()=>{startNewGame();setToggleClear(false);}}>YES</a>
            <a className="start-btn" onClick={()=>setToggleClear(false)}>NO</a>
          </div>
        </div>
      </div>)}
      {!toggleClear && (
      <button className="clear-btn" type="reset" onClick={()=>{startNewGame();}}>Clear Board</button>)}

    </div>);
};

export default ClearBoard;
