import React, { useEffect, useState } from "react";

function Player(props){
  const [currentColor, setCurrentColor] = useState(props.color);
  const [highlighted, setHighlighted] = useState(false);
  const [active, setActive] = useState(false);

  function setColorDefault() {
    setCurrentColor(props.color);
  }

  function setColorHighlight() {
    setCurrentColor(props.highlightColor);
  }

  useEffect(()=>{
    setCurrentColor(highlighted? props.highlightColor: props.color);
    setActive(props.active);
  }, [setActive, setCurrentColor, props, highlighted]);

  return (
    <button
      className="player"
      onClick={()=>{
        if(active){
          setHighlighted(!highlighted);
          props.changeHighlightCount(Math.pow(-1, highlighted+0), props.name);
        }
      }}
      style={{ color: currentColor }}
      onMouseEnter={() => setColorHighlight()}
      onMouseLeave={() => {highlighted? setColorHighlight(): setColorDefault()}}
    >
      {props.name}
    </button>
  )
  
}

export default Player;