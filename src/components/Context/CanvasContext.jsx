import React, { useState, useRef } from "react";
import { readFromLocalStorage } from "../../utils";

const CanvasContext = React.createContext();

function CanvasContextProvider(props) {
    const [currentVideoTime, setCurrentVideoTime] = useState(0);
    const [videoDuration, setVideoDuration] = useState(0);
    const [textDecoration, setTextDecoration] = useState("italic");
    const [fontSize, setFontSize] = useState("40px");
    const [fontFamily, setFontFamily] = useState("Arial");
    const [wordSpace, setWordSpace] = useState("i");
    const [canvasCtx, setCanvasCtx] = useState(false);
    const [activeWordColor, setActiveWordColor] = useState("red");
    const [wordColor, setWordColor] = useState("white");
    const [strokeColor, setStrokeColor] = useState("black");
    const [backgroundColor, setBackgroundColor] = useState("green");
    const [textStrokeThickness, setTextStrokeThickness] = useState(5);

    const [yourAudioFiles, setYourAudioFiles] = useState([]);
    const [yourVideoFiles, setYourVideoFiles] = useState([]);
    const [selectedVideoFiles, setSelectedVideoFiles] = useState([]);
    const [selectedAudioFiles, setSelectedAudioFiles] = useState([]);

    const [previewVideo, setPreviewVideo] = useState(null);
    const [previewAudio, setPreviewAudio] = useState(null);
    const [YOUR_AUDIO_FILES, setYOUR_AUDIO_FILES] = useState(
        readFromLocalStorage("audioFiles", [])
    );
    const [YOUR_VIDEO_FILES, setYOUR_VIDEO_FILES] = useState(
        readFromLocalStorage("videoFiles", [])
    );
    const audioFileInputRef = useRef();

    const sourceVideoRef = useRef();
    const audioElRef = useRef();
    const baseUrl = "http://localhost:3001";

    const GLOBAL = {
        baseUrl,
        previewVideo,
        setPreviewVideo,
        previewAudio,
        setPreviewAudio,
        currentVideoTime,
        videoDuration,
        setCurrentVideoTime,
        setVideoDuration,
        sourceVideoRef,
        audioElRef,
        audioFileInputRef,
        textDecoration,
        setTextDecoration,
        fontSize,
        setFontSize,
        fontFamily,
        setFontFamily,
        wordSpace,
        setWordSpace,
        canvasCtx,
        setCanvasCtx,
        activeWordColor,
        setActiveWordColor,
        wordColor,
        setWordColor,
        strokeColor,
        setStrokeColor,
        backgroundColor,
        setBackgroundColor,
        textStrokeThickness,
        setTextStrokeThickness,

        yourAudioFiles,
        setYourAudioFiles,
        yourVideoFiles,
        setYourVideoFiles,
        selectedVideoFiles,
        setSelectedVideoFiles,
        selectedAudioFiles,
        setSelectedAudioFiles,
        YOUR_AUDIO_FILES,
        setYOUR_AUDIO_FILES,
        YOUR_VIDEO_FILES,
        setYOUR_VIDEO_FILES,
    };
    return (
        <CanvasContext.Provider value={GLOBAL}>
            {props.children}
        </CanvasContext.Provider>
    );
}

export { CanvasContextProvider, CanvasContext };
