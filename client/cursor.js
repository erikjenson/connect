import React, {useEffect, useState} from 'react';

function useMousePosition() {

    const [mousePosition, setMousePosition] = useState({ x: null, y: null });
    
    useEffect(() => {
      const mouseMoveHandler = (event) => {
        const { clientX, clientY } = event;
        setMousePosition({ x: clientX, y: clientY });
      };
      const mouseLeaveHandler = (event) => {
        const { clientX, clientY } = event;
        setMousePosition({ x: -35, y: -35 });
      };
      const mouseEnterHandler = (event) => {
        const { clientX, clientY } = event;
        setMousePosition({ x: clientX, y: clientY });
      };

      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseleave", mouseLeaveHandler);
      document.addEventListener("mouseenter", mouseEnterHandler);

      return () => {
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseleave", mouseLeaveHandler);
        document.removeEventListener("mouseenter", mouseEnterHandler);
      };
    }, [])
    return mousePosition;
  }

  function Cursor ({cursor}){

    const color = cursor
    const tag = `${color}-cursor`
    const { x, y } = useMousePosition();

    return(
     
      <div id={tag} style={{left: `${x}px`, top: `${y}px`}}></div>)
  }

  export default Cursor