import React, { useEffect, useState } from "react";
import Word from "./Word";
import styles from "./Constants/styles";
import GuessWordButton from "./GuessWordButton";

function rowBreak(arr) {
  let retarr = [];
  for(let l = 0; l < arr.length; l+=3) {
    retarr.push(arr.slice(l,l+3));
  }
  return retarr
}

function Wordlist (props) {
  const [words, setWords] = useState(props.wordlist);
  const [highlightedWord, setHighlightedWord] = useState("");
  const [gameRunning, setGameRunning] = useState(props.gameRunning);

  function renderWord(inWord) {
    let wordColor = styles.words.defaultColor;
    let wordHighlightColor = styles.words.highlightColor;
    let playerWord = false;
    if (inWord === props.player.shibboleth) {
      wordColor = styles.words.shibbolethColor;
      wordHighlightColor = styles.words.shibbolethColor;
      playerWord = true;
    }
    return (
      <td key={inWord}>
        <Word
          word={inWord}
          color={wordColor}
          highlightColor={wordHighlightColor}
          changeHighlightedWord={playerWord? ()=>{}: w=>{
            if(w === highlightedWord) {
              setHighlightedWord("");
            } else {
              setHighlightedWord(w);
            }
          }}
          highlighted={inWord === highlightedWord}
        />
      </td>
    )
  }

  useEffect(() => {
    setWords(props.wordlist);
    setGameRunning(props.gameRunning);
  }, [setGameRunning, setWords, props]);

  //const wordCols = columnBreak(words);

  return (
    <div className="wordlist">
      <p className="header">Words</p>
      <table style={{width: "100%"}}>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rowBreak(words).map(e=> <tr key={e[0]}>{e.map(f=>renderWord(f))}</tr>)}
        </tbody>
      </table>
      {gameRunning && <GuessWordButton available={(highlightedWord != "")}/>}

    </div>
  )

}

export default Wordlist;