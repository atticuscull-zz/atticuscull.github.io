import React, { useEffect, useState } from "react";
import Wordlist from "./Wordlist";
import Playerlist from "./Playerlist";
import wordlist2000 from "./Constants/wordlist";
import GameLog from "./GameLog";
import Timer from "./Timer";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:4001";
const S = socketIOClient(ENDPOINT);
S.on("index", i => {
  S.on("getIndex", () => {
    S.emit("sendIndex", i);
  })
});

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
  const [teamShibboleths, setTeamShibboleths] = useState([]);
  const [history, setHistory] = useState([]);
  const [socket, setSocket] = useState(S);
  const [time, setTime] = useState(0);

  function newWordSet() {
    let L = generateRandomWordSet(18, wordlist2000.split(","))
    setWordList(L);
    return L;
  }

  {/*

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
*/}

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
    setTeamShibboleths([w1, w2]);
    let newList = [];
    newTeams[0].forEach((p)=>{
      p.shibboleth = w1;
      newList.push(p);
    });
    newTeams[1].forEach((p) => {
      p.shibboleth = w2;
      newList.push(p);
    });
    let P = playerlist.map(e => e.name);
    setPlayerlist(newList.sort((a, b) => P.indexOf(a.name) - P.indexOf(b.name) ));
  }

  function onStartRound() {
    setPlayerlist(playerlist.map(function(e) {
      let newE = e
      newE.active = true;
      return newE
    }));
    randomizeTeams(newWordSet());
    setGameRunning(true);
    addMessage([{
      type: "RS",
      parts: {
        players: playerlist.map(e=>e.name),
        words: []
      }
    }])
  }

  function endRound(win) {
    setGameRunning(false);
    setPlayerlist(playerlist.map(function (e) {
      let newE = e
      newE.active = false;
      return newE
    }));
    let Teams = playerlist.reduce((a, e)=> {
      if(!a.includes(e.shibboleth)){
        return a.concat([e.shibboleth]);
      }
      return a
    }, [playerlist[thisPlayer].shibboleth]);
    return({
      type: "RO",
      parts: {
        players: playerlist.map(e => e.name),
        words: [win? Teams[0]: Teams[1]]
      }
    })
  }

  function addMessage(messages) {
    let h = [];
    h.push(...history);
    let m = messages;
    m.map(e=>{
      e.index = history.length + m.indexOf(e)
      return e
    });
    h.push(...m);
    setHistory(h);
  }

  useEffect(()=>{
    socket.on("FromAPI", data => {
      setTime(data);
    });
  },[])

  return(
    <div className="game">
      <div className="leftside">
        <Playerlist
          playerlist={playerlist}
          player={playerlist[thisPlayer]}
          gameRunning={gameRunning}
          onClick={(guessedPlayers)=>{
            let P = playerlist.map(e => e.name);
            addMessage([{ type: "TG", parts: { players: [playerlist[thisPlayer].name, ...guessedPlayers.sort((a, b) => P.indexOf(a) - P.indexOf(b))], words: [] } }]);
          }}
          emit={()=>{socket.emit("resetTimer")}}
        />
        <Wordlist
          wordlist={wordlist}
          player={playerlist[thisPlayer]}
          gameRunning={gameRunning}
          onClick={(h)=>{
            addMessage([
              { type: "WG", parts: { players: [playerlist[thisPlayer].name], words: [h] } },
              endRound(teamShibboleths.includes(h) && playerlist[thisPlayer].shobboleth !== h)
            ]);
          }}
        />
        {gameRunning || (
          <button onClick={() => onStartRound()} className="start-button">
            Start Round
          </button>)
        }
        <Timer time={time} />
      </div>
      <div className="rightside">
        <GameLog history={history} />
      </div>
    </div>
  )
}

export default Game;