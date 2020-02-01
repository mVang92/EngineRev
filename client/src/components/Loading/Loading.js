import React from "react";
import loadingGif from "../../images/loading.gif";

const Loading = () => {
  return (
    <h3 id="loadingScreen" className="text-center container">
      <img id="loadingGif" src={loadingGif} alt="Loading..."></img>
    </h3>
  );
};

export default Loading;
