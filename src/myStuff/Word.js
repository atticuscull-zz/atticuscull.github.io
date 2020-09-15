import React from "react";

function Word(props) {
  return (
    <button className="word" onClick={props.onClick} color={props.color}>
      {props.word}
    </button>
  )
}

export default Word;