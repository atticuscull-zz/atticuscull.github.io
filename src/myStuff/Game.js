import React, { useState } from "react";
import Wordlist from "./Wordlist";
import Playerlist from "./Playerlist";

function Game(props) {
  const [wordlist, setWordList] = useState(["hi", "ho"]);
  const [playerlist, setPlayerlist] = useState([{
      name: "Atticus", 
      shibboleth: "c",
      active: false
    }, {
      name: "Cull",
      shibboleth: "b",
      active: false 
    }, {
      name: "Cull2",
      shibboleth: "b",
      active: false
    }, {
      name: "Cull3",
      shibboleth: "b",
      active: false
    }, {
      name: "Cull4",
      shibboleth: "b",
      active: false
    }]);
  const [teams, setTeams] = useState([[playerlist[0]],[playerlist[1]]]);
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
  }

  function updatePlayerInList(playerIndex, newPlayer) {
    let newList = [];
    newList.push(...playerlist);
    newList[playerIndex] = newPlayer;
    setPlayerlist(newList);
  }

  function addPlayer(player) {
    let newList = [];
    newList.push(...playerlist, player);
    setPlayerlist(newList);
  }

  function randomizeTeams() {
    let p = []
    let newTeams = [[],[]]
    p.push(...playerlist)
    while(p.length > 0){
      let L = p.length;
      let index = Math.floor(L * Math.random());
      newTeams[L % 2].push(p.splice(index, 1));
    }
    setTeams(newTeams);
  }

  function onStartRound(){
    newWordSet();
    setPlayerlist(playerlist.map(function(e) {
      let newE = e
      newE.active = true;
      return newE
    }))
    randomizeTeams();
    setGameRunning(true);
  }

  return(
    <div className="game">
      <div>
        <Playerlist
          playerlist={playerlist}
          player={playerlist[thisPlayer]}
          gameRunning={gameRunning}
        />
      </div>
      <div>
        <Wordlist
          wordlist={wordlist}
          player={playerlist[thisPlayer]}
        />
      </div>
      {gameRunning || (
        <button onClick={() => onStartRound()} className="start-button">
          Start Round
        </button>)
      }

    </div>
  )
}

export default Game;