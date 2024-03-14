import React, {useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import Menu from './menu';
import Choose from './choose';
import Cursor from './cursor';
import Game from './connect/game';

function App() {

  const [cursor, setCursor] = useState('r')

  return (
    <div>
      <Cursor cursor={cursor} />
        <Routes>
            <Route exact path='/' element={<Menu/>} />
            <Route exact path="/choose" element={<Choose />} />
            <Route exact path="/game" element={<Game cursor={cursor} setCursor={setCursor}/>} />
        </Routes>
    </div>)
}
export default App