import React, { useState, useRef } from "react";
import { readFromLocalStorage } from "../../utils";
import CanvasContext from "./CanvasContext";

function CanvasContextProvider(props) {
    const [currentVideoTime, setCurrentVideoTime] = useState(0);
    const [videoDuration, setVideoDuration] = useState(0);
    const [textDecoration, setTextDecoration] = useState("italic");
    const [fontSize, setFontSize] = useState(40);
    const [lineHeight, setLineHeight] = useState(180);
    const [fontFamily, setFontFamily] = useState(`Rubik Mono One`); //Serif  // "Josefin Sans" //  Rubik Mono One
    const [wordSpace, setWordSpace] = useState("l");
    const [canvasCtx, setCanvasCtx] = useState(false);
    const [activeWordColor, setActiveWordColor] = useState("red");
    const [wordColor, setWordColor] = useState("white");
    const [strokeColor, setStrokeColor] = useState("black");
    const [backgroundColor, setBackgroundColor] = useState("green");
    const [presetName, setPresetName] = useState("My Silly Preset");
    const [textStrokeThickness, setTextStrokeThickness] = useState(5);
    const [withTextStroke, setWithTextStroke] = useState(true);
    const [withBackground, setWithBackground] = useState(true);
    const [withSingleWord, setWithSingleWord] = useState(true);
    const [withWordAnimation, setWithWordAnimation] = useState(true);
    const [withActiveWordColor, setWithActiveWordColor] = useState(true);

    const [yourAudioFiles, setYourAudioFiles] = useState([]);
    const [yourVideoFiles, setYourVideoFiles] = useState([]);
    const [selectedVideoFiles, setSelectedVideoFiles] = useState([]);
    const [selectedAudioFiles, setSelectedAudioFiles] = useState([]);

    const [previewVideo, setPreviewVideo] = useState(null);
    const [previewAudio, setPreviewAudio] = useState(null);
    const [YOUR_AUDIO_FILES, setYOUR_AUDIO_FILES] = useState(readFromLocalStorage("audioFiles", []));
    const [YOUR_VIDEO_FILES, setYOUR_VIDEO_FILES] = useState(readFromLocalStorage("videoFiles", []));
    const [YOUR_PRESETS, setYOUR_PRESETS] = useState(readFromLocalStorage("presets", []));
    const [currentPrestSettings, setCurrentPrestSettings] = useState(null);

    const [loadedVideo, setLoadedVideo] = useState(false);
    const [loadedMetaData, setLoadedMetaData] = useState(false);

    const audioFileInputRef = useRef();

    const sourceVideoRef = useRef();
    const audioElRef = useRef();
    const baseUrl = "http://localhost:3001";

    const GLOBAL = {
        loadedVideo,
        setLoadedVideo,
        loadedMetaData,
        setLoadedMetaData,
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
        presetName,
        setPresetName,

        lineHeight,
        setLineHeight,

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
        YOUR_PRESETS,
        setYOUR_PRESETS,
        currentPrestSettings,
        setCurrentPrestSettings,

        withTextStroke,
        setWithTextStroke,
        withSingleWord,
        setWithSingleWord,

        withBackground,
        setWithBackground,

        withWordAnimation,
        setWithWordAnimation,

        withActiveWordColor,
        setWithActiveWordColor,
    };
    return <CanvasContext.Provider value={GLOBAL}>{props.children}</CanvasContext.Provider>;
}

export default CanvasContextProvider;
