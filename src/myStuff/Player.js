import React from "react";

function Player(props) {
  return (
    <button className="player" onClick={props.onClick} color={props.color}>
      {props.name}
    </button>
  )
}

export default Player;