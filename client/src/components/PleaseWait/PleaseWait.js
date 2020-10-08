import React from "react";

const PleaseWait = props => {
  return (
    <h3 id="loadingScreen" className="text-center container">
      <div className={`box ${props.currentTheme.background}`}><label>Please Wait...</label></div>
      <div id="loadingAnimation">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </h3>
  );
};

export default PleaseWait;
