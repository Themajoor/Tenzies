import React from "react";

function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "lightgreen" : "",
  };
  return (
    <div style={styles} onClick={props.onClick}>
      {props.value}
    </div>
  );
}

export default Die;
