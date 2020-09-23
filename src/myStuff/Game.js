import React, { useState } from "react";
import Wordlist from "./Wordlist";
import Playerlist from "./Playerlist";
import wordlist2000 from "./Constants/wordlist";

function generateRandomWordSet(numberOfWords, list){
  if(numberOfWords === 1){
    return [list[Math.floor(list.length*Math.random())]];
  }
  let randomIndex = Math.floor(list.length * Math.random())
  return [list[randomIndex]].concat(...generateRandomWordSet(
    numberOfWords - 1,
    list.slice(0,randomIndex).concat(...list.slice(randomIndex+1))
  ));
}

function Game(props) {
  const [wordlist, setWordList] = useState([]);
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
  const thisPlayer = 0;
  const [gameRunning, setGameRunning] = useState(false);

  function newWordSet() {
    let L = generateRandomWordSet(18, wordlist2000.split(","))
    setWordList(L);
    return L;
  }

  /*

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
  */

  function randomizeTeams(words) {
    let p = []
    let newTeams = [[],[]]
    p.push(...playerlist);
    while(p.length > 0){
      let L = p.length;
      let index = Math.floor(L * Math.random());
      newTeams[L % 2].push(p.splice(index, 1)[0]);
    }
    setShibboleths(newTeams, words)
  }

  function setShibboleths(newTeams, words) {
    let w1 = Math.floor(18*Math.random());
    let w2 = Math.floor(17*Math.random());
    w2 += (w2>=w1);
    w1 = words[w1];
    w2 = words[w2];
    let newList = [];
    newTeams[0].forEach((p)=>{
      p.shibboleth = w1;
      newList.push(p);
    });
    newTeams[1].forEach((p) => {
      p.shibboleth = w2;
      newList.push(p);
    });

    setPlayerlist(newList);
  }

  function onStartRound(){
    setPlayerlist(playerlist.map(function(e) {
      let newE = e
      newE.active = true;
      return newE
    }));
    randomizeTeams(newWordSet());
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
          gameRunning={gameRunning}
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