import React, { useEffect, useState } from "react";
import Player from "./Player.js";
import GuessTeamButton from "./GuessTeamButton";
import styles from "./Constants/styles";

function Playerlist (props) {
  const [players, setPlayers] = useState(props.playerlist);
  const [highlightCount, setHighlightCount] = useState(0);
  const [guessAvaialbe, setGuessAvailable] = useState(false);

  function renderPlayer(inPlayer) {
    let isThisPlayer = (props.player.name === inPlayer.name);
    if(inPlayer.active) {
      return (<Player
        name={inPlayer.name}
        color={isThisPlayer ? styles.players.thisPlayerColor : styles.players.defaultColor}
        highlightColor={isThisPlayer ? styles.players.thisPlayerColor : styles.players.highlightColor}
        key={inPlayer.name}
        changeHighlightCount={(n) => { setHighlightCount(highlightCount + n*(!isThisPlayer)) }}
        active={true}

      />)
    } else if (props.gameRunning) {
      return (<Player
        name={inPlayer.name}
        color={isThisPlayer ? styles.players.thisPlayerColor : styles.players.notPlayingColor}
        highlightColor={isThisPlayer ? styles.players.thisPlayerColor : styles.players.notPlayingColor}
        key={inPlayer.name}
        changeHighlightCount={(n)=>{}}
        active={false}
      />)
    }
    return (<Player
      name={inPlayer.name}
      color={isThisPlayer ? styles.players.thisPlayerColor : styles.players.beforeGameColor}
      highlightColor={isThisPlayer ? styles.players.thisPlayerColor : styles.players.beforeGameColor}
      key={inPlayer.name}
      changeHighlightCount={(n) => {}}
      active={false}
    />)
    

  }

  useEffect(()=>{
    setPlayers(props.playerlist);
    setGuessAvailable((highlightCount===2));
  },[setPlayers, props, highlightCount, setGuessAvailable])

  return(
    <div 
      className="playerlist" 
    >
      <p className="header">Players</p>
      {players.map(e=> renderPlayer(e))}
      <GuessTeamButton available={guessAvaialbe}/>
    </div>
  )
}

export default Playerlist;