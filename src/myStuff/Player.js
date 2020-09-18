import React from "react";

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentColor: this.props.color };
  }
  

  setColorDefault() {
    this.setState({currentColor: this.props.color});
  }

  setColorHighlight() {
    this.setState({ currentColor: this.props.highlightColor });
  }

  render(){
    return (
      <button
        className="player"
        onClick={this.props.onClick}
        style={{ color: this.state.currentColor }}
        onMouseEnter={()=>this.setColorHighlight()}
        onMouseLeave={()=>this.setColorDefault()}
      >
        {this.props.name}
      </button>
    );
  }
  
}

export default Player;