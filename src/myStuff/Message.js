import React, { useEffect, useState } from "react";

function Message(props) {
  const [messageType, setMessageType] = useState(props.type);
  const [messageParts, setMessageParts] = useState(props.parts);
  useEffect(() => {
    setMessageType(props.type);
    setMessageParts(props.parts);
  }, [setMessageType, setMessageParts, props]);

  return (
    <div
      className="message"
    >
      {(messageType === "WG")&& <div>
        <p className="logplayer">{messageParts.players[0]}</p>
        <p className="logtext"> guessed that </p>
        <p className="logword">{messageParts.words[0]}</p>
        <p className="logtext"> was the other team's word</p>
      </div>}
      {(messageType === "TG") && <div>
        <p className="logplayer">{messageParts.players[0]}</p>
        <p className="logtext"> guessed that </p>
        <p className="logplayer">{messageParts.players[1]}</p>
        <p className="logtext"> and </p>
        <p className="logplayer">{messageParts.players[2]}</p>
        <p className="logtext"> were on their team</p>
      </div>}
      {(messageType === "RO") && <div>
        <p className="logtext">The round ended and team </p>
        <p className="logword">{messageParts.words[0]}</p>
        <p className="logtext"> wins!</p>
        <hr className="rounddivider"/>
      </div>}
      {(messageType === "RS") && <div>
        <p className="logtext">The round started and </p>
        {messageParts.players.map(e=><p className="logplayer" key={e}>{e}</p>)}
        <p className="logtext">are playing</p>
      </div>}
    </div>
  )

}

export default Message;