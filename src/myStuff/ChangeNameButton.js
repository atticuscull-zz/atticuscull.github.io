import React from "react"


function ChangeNameButton(props) {

  return(
    <div>
      <button
        className = "changenamebutton"
        onClick = {props.onClick}
      >Change Name</button>
    </div>
  )
}

export default ChangeNameButton;