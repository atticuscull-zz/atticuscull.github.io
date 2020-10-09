import React, { useEffect, useState } from "react";
import Wordlist from "./Wordlist";
import Playerlist from "./Playerlist";
import GameLog from "./GameLog";
import Timer from "./Timer";
import socketIOClient from "socket.io-client";
import ChangeNameButton from "./ChangeNameButton";

const ENDPOINT = "http://127.0.0.1:4001";
const S = socketIOClient(ENDPOINT);

function Game(props) {
  const [wordlist, setWordList] = useState([]);
  const [playerlist, setPlayerlist] = useState([]);
  const [thisPlayer, setThisPlayer] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);
  const [history, setHistory] = useState([]);
  const [time, setTime] = useState(0);
  
  useEffect(()=>{
    S.on("setTimer", data => {
      setTime(data);
    });

    S.on("setPlayerList", newList=>{
      setPlayerlist(newList);
    });

    S.on("changeIndex", i => {
      setThisPlayer(i);
    });

    S.on("setGameRunning", data=>{
      setGameRunning(data);
    })

    S.on("setWordList", newList=>{
      setWordList(newList);
    })

    S.on("setHistory", newHistory=>{
      setHistory(newHistory);
    })
  });
  
  return(
    <div className="game">
      <div className="leftside">
        <Playerlist
          playerlist={playerlist}
          player={playerlist[thisPlayer]}
          gameRunning={gameRunning}
          onClick={(guessedPlayers)=>{
            if(time === 0){
              setTime(45);
              S.emit("teamGuess", guessedPlayers);
            }
          }}
        />
        <Wordlist
          wordlist={wordlist}
          player={playerlist[thisPlayer]}
          gameRunning={gameRunning}
          onClick={(h)=>{
            S.emit("wordGuess", h);
          }}
        />
        <ChangeNameButton onClick={()=>{
          let N = prompt("Enter your new name");
          if(!playerlist.map(e=>e.name).includes(N)){
            S.emit("changeName", N);
          }
        }}/>
        {gameRunning || (
          <button onClick={()=>{S.emit("startRound")}} className="start-button">
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