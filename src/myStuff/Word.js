import React, { useEffect, useState } from "react";

function Word(props) {
  const [currentColor, setCurrentColor] = useState(props.color);
  const [highlighted, setHighlighted] = useState(props.highlighted);

  function setColorDefault() {
    setCurrentColor(props.color);
  }

  function setColorHighlight() {
    setCurrentColor(props.highlightColor);
  }

  useEffect(() => {
    setCurrentColor(highlighted ? props.highlightColor : props.color);
    setHighlighted(props.highlighted);
  }, [setCurrentColor, props, highlighted]);

  return (
    <button
      className="word"
      onClick={() => {
        props.changeHighlightedWord(props.word);
      }}
      style={{ color: currentColor }}
      onMouseEnter={() => setColorHighlight()}
      onMouseLeave={() => { highlighted ? setColorHighlight() : setColorDefault() }}
    >
      {props.word}
    </button>
  )
}

export default Word;