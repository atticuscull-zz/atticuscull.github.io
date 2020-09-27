import React, { useEffect, useState } from "react";
import Message from "./Message";

function GameLog(props) {
  const [history, setHistory] = useState(props.history);

  useEffect(()=>{
    setHistory(props.history);
  },[setHistory, props, history]);

  return(
    <div className="gamelog">
      <p className="header">Game Log</p>
      <div>
        {history.map(e=><Message type={e.type} parts={e.parts} key={e.index}/>)}
      </div>
    </div>
  )
}

export default GameLog;