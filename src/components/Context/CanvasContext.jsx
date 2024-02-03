import React, { useState, useRef } from "react";

const CanvasContext = React.createContext();

function CanvasContextProvider(props) {
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);

  const sourceVideoRef = useRef();

  const GLOBAL = {
    currentVideoTime,
    videoDuration,
    setCurrentVideoTime,
    setVideoDuration,
    sourceVideoRef,
  };
  return <CanvasContext.Provider value={GLOBAL}>{props.children}</CanvasContext.Provider>;
}

export { CanvasContextProvider, CanvasContext };
