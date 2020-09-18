import React, { useEffect, useState } from "react"
import Word from "./Word"

function Wordlist (props) {
  const [words, setWords] = useState(props.wordlist)
  //const [player, setPlayer] = useState()
  console.log("hi");
  console.log(props);

  function renderWord(inWord) {
    let wordColor = "grey";
    if (inWord === props.player.shibboleth) {
      wordColor = "green";
    }
    return (
      <Word
        word={inWord}
        color={wordColor}
        onClick={() => { }}
        key={inWord}
      />
    )
  }

  useEffect(() => {setWords(props.wordlist)}, [setWords, props]);

  return (
    <div className="wordlist">
      <p className="header">Words</p>
      <div style={{ width: "33%" }}>
        {words.map(e => renderWord(e))}
      </div>
    </div>
  );

}

export default Wordlist;