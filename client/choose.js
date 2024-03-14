import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Choose = () => { 

  return(
      <div className='flex-col choose'>
        <Link className="game-option" to="/game">Play Connect 4</Link>
        <a className="game-option" href="mailto:erik.a.jenson@gmail.com">Contact Erik</a>
      </div>
  );
};

export default Choose;
