import React, { useEffect, useState } from "react";
import Wordlist from "./Wordlist";
import Playerlist from "./Playerlist";
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

  if (1) {/*

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

  function setShibboleths(newTeams, w1, w2) {
  setTeamShibboleths([w1, w2]);
  let newList = [];
  newTeams[0].forEach((p) => {
    p.shibboleth = w1;
    p.active = true;
    newList.push(p);
  });
  newTeams[1].forEach((p) => {
    p.shibboleth = w2;
    p.active = true;
    newList.push(p);
  });
  let P = playerlist.map(e => e.name);
  setPlayerlist(newList.sort((a, b) => P.indexOf(a.name) - P.indexOf(b.name)));
}

  function onStartRound(newList, newTeams, w1, w2) {
    setWordList(newList);
    setShibboleths(newTeams, w1, w2);
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
    socket.on("startRound", (newList, newTeams, w1, w2)=>{
      onStartRound(newList, newTeams, w1, w2);
    })
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
          <button onClick={()=>{socket.emit("startRound", playerlist)}} className="start-button">
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