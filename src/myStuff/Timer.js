import React, { useState, useEffect} from "react";

function Timer(props) {
  const [time, setTime] = useState(props.time);

  useEffect(() => {
    setTime(props.time);
  }, [setTime, props]);

  return (
    <div>
      <p style={{ color: "red" }}>
        It's {time}
      </p>
    </div>
  
  )
}

export default Timer;