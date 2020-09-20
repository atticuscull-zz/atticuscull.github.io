import React, { useEffect, useState } from "react";

function GuessTeamButton(props) {
  const [available, setAvailable] = useState(false);
  useEffect(()=>{
    setAvailable(props.available);
  },[setAvailable, props])

  return (
    <button
      className="guessButton"
      style={{
        background: available ? "#008000" : "#00800040",
        color: available ? "#eeeeee" : "#eeeeee80"
      }}
    >Guess Team</button>
  )
}

export default GuessTeamButton;