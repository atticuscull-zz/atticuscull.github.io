import React from "react";
import Wordlist from "./Wordlist";
import Playerlist from "./Playerlist";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wordlist: ["hi", "ho"],
      players: [{ name: "Atticus", shibboleth: "c" }, {name: "Cull", shibboleth: "b" }],
      teams: [
        { shibboleth: "c", players: [{ name: "Atticus", shibboleth: "c" }] },
        { shibboleth: "b", players: [{ name: "Cull", shibboleth: "b" }] }
      ],
      thisPlayer: { name: "Atticus", shibboleth: "c" },
      gameRunning: false
    }
  }

  newWordSet() {
    let newlist = [];
    for (let i = 0; i < 2; i++) {
      newlist.push("b");
      for (let j = 0; j < i; j++) {
        newlist[i] += "a";
      }
    }
    this.setState({ wordlist: newlist })
  }

  render() {
    return (
      <div className="game">
        <Playerlist
          playerlist={this.state.players}
          player={this.state.thisPlayer}
        />
        <Wordlist
          wordlist={this.state.wordlist}
          player={this.state.thisPlayer}
        />
        {!this.state.gameRunning && (
          <button onClick={() => { }}>
            Start Round
          </button>)
        }
      </div>
    )
  }
}

export default Game;