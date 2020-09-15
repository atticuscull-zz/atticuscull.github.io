import React from "react";
import Player from "./Player.js";

class Playerlist extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      players: props.playerlist
    }
  }

  onTeam() {
    return undefined;
  }
  notOnTeam() {
    return undefined;
  }

  renderPlayer(player) {
    return(
      <Player
        name={player.name}
        color={(this.props.player.name === player.name) ? "green": "grey"}
        onClick={(this.props.player.shibboleth === player.shibboleth) ? this.onTeam : this.notOnTeam}
        key={player.name}
      />
    )
  }

  render() {
    return(
      <div className="playerlist">
        {this.state.players.map(e=> this.renderPlayer(e))}
      </div>
    )
  }
}

export default Playerlist;