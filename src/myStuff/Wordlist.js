import React from "react"
import Word from "./Word"

class Wordlist extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            words: props.wordlist
        }
    }

    renderWord(inWord) {
        let wordColor = "grey";
        if(inWord === this.props.player.shibboleth){
            wordColor = "green";
        }
        return (
            <Word
                word={inWord}
                color={wordColor}
                onClick={()=>{}}
                key={inWord}
            />
        )
    }

    render() {
        return(
            <div className="wordList">
                {this.state.words.map(e=>this.renderWord(e))}
            </div>
        );
    }
    
}

export default Wordlist;