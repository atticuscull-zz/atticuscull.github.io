import React, { useEffect, useState } from "react";
import Player from "./Player.js";

function Playerlist (props) {
  const [players, setPlayers] = useState(props.playerlist);

  function onTeam() {
    return undefined;
  }
  function notOnTeam() {
    return undefined;
  }

  function renderPlayer(inPlayer) {
    if(inPlayer.active) {
      return (<Player
        name={inPlayer.name}
        color={(props.player.name === inPlayer.name) ? "green" : "grey"}
        highlightColor={(props.player.name === inPlayer.name) ? "green" : "red"}
        onClick={(props.player.shibboleth === inPlayer.shibboleth) ? onTeam : notOnTeam}
        key={inPlayer.name}

      />)
    } else if (props.gameRunning) {
      return (<Player
        name={inPlayer.name}
        color={(props.player.name === inPlayer.name) ? "green" : "yellow"}
        highlightColor={(props.player.name === inPlayer.name) ? "green" : "yellow"}
        onClick={() => { }}
        key={inPlayer.name}
      />)
    }
    return (<Player
      name={inPlayer.name}
      color={(props.player.name === inPlayer.name) ? "green" : "grey"}
      highlightColor={(props.player.name === inPlayer.name) ? "green" : "grey"}
      onClick={() => { }}
      key={inPlayer.name}
    />)
    

  }

  useEffect(()=>{
    setPlayers(props.playerlist);
  },[setPlayers, props])

  return(
    <div 
      className="playerlist" 
    >
      <p className="header">Players</p>
      {players.map(e=> renderPlayer(e))}
    </div>
  )
}

export default Playerlist;