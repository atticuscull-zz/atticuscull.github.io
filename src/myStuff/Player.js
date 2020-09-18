import React, { useEffect, useState } from "react";

function Player(props){
  const [currentColor, setCurrentColor] = useState(props.color)

  function setColorDefault() {
    setCurrentColor(props.color);
  }

  function setColorHighlight() {
    setCurrentColor(props.highlightColor );
  }

  useEffect(()=>{setCurrentColor(props.color)}, [setCurrentColor, props]);

  return (
    <button
      className="player"
      onClick={props.onClick}
      style={{ color: currentColor }}
      onMouseEnter={() => setColorHighlight()}
      onMouseLeave={() => setColorDefault()}
    >
      {props.name}
    </button>
  )
  
}

export default Player;