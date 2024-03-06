import React, { useState, useRef } from "react";
import { readFromLocalStorage } from "../../utils";
import TimerContext from "./TimerContext";

function TimerContextProvider(props) {
    const [currentVideoTime, setCurrentVideoTime] = useState(0);
    const [currentAudioTime, setCurrentAudioTime] = useState(0);

    const GLOBAL = {
        currentVideoTime,
        setCurrentVideoTime,
        currentAudioTime,
        setCurrentAudioTime,
    };
    return <TimerContext.Provider value={GLOBAL}>{props.children}</TimerContext.Provider>;
}

export default TimerContextProvider;
