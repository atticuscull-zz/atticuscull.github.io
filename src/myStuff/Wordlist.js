import React, { useEffect, useState } from "react";
import Word from "./Word";
import styles from "./Constants/styles";

function Wordlist (props) {
  const [words, setWords] = useState(props.wordlist)

  function renderWord(inWord) {
    let wordColor = styles.words.defaultColor;
    if (inWord === props.player.shibboleth) {
      wordColor = styles.words.shibbolethColor;
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
  )

}

export default Wordlist;