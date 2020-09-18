import React, { useState } from "react";
import Wordlist from "./Wordlist";
import Playerlist from "./Playerlist";

function Game(props) {
  const [wordlist, setWordList] = useState(["hi", "ho"]);
  const [players, setPlayers] = useState([{ name: "Atticus", shibboleth: "c" }, { name: "Cull", shibboleth: "b" }]);
  const [teams, setTeams] = useState([[0],[1]]);
  const thisPlayer = 0;
  const [gameRunning, setGameRunning] = useState(false);

  function newWordSet() {
    let newlist = [];
    for (let i = 0; i < 2; i++) {
      newlist.push("b");
      for (let j = 0; j < i; j++) {
        newlist[i] += "a";
      }
    }
    setWordList(newlist);
    console.log(wordlist);
  }

  function onStartRound(){
    newWordSet();
  }

  return(
    <div className="game">
      <div>
        <Playerlist
          playerlist={players}
          player={players[thisPlayer]}
        />
      </div>
      <div>
        <Wordlist
          wordlist={wordlist}
          player={players[thisPlayer]}
        />
      </div>
      {!gameRunning && (
        <button onClick={() => onStartRound()} className="start-button">
          Start Round
        </button>)
      }
    </div>
  )
}

export default Game;