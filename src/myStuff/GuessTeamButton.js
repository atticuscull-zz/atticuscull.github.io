import React, { useEffect, useState } from "react";
import styles from "./Constants/styles";

function GuessTeamButton(props) {
  const [available, setAvailable] = useState(false);

  useEffect(()=>{
    setAvailable(props.available);
  },[setAvailable, props]);

  return (
    <div>
      <button
        className="guessButton"
        style={{
          background: available ? styles.guessTeam.activeBG : styles.guessTeam.inactiveBG,
          color: available ? styles.guessTeam.activeTextColor : styles.guessTeam.inactiveTextColor
        }}
        onClick={() => { props.onClick()}}
      >Guess Team</button>
    </div>
  )
}

export default GuessTeamButton;