import React, { useState, useRef, useEffect } from "react";
import { readFromLocalStorage, defaultPresets } from "../../utils";
import CanvasContext from "./CanvasContext";
const baseUrl = import.meta.env.VITE_BASE_URL;

function CanvasContextProvider(props) {
    // const [currentVideoTime, setCurrentVideoTime] = useState(0);
    // const [currentAudioTime, setCurrentAudioTime] = useState(0);
    const [currentAudioDuration, setCurrentAudioDuration] = useState(0);
    const [videoDuration, setVideoDuration] = useState(0);
    const [textDecoration, setTextDecoration] = useState("italic");
    const [fontSize, setFontSize] = useState(40);
    const [lineHeight, setLineHeight] = useState(180);
    const [fontFamily, setFontFamily] = useState(`Rubik Mono One`); //Serif  // "Josefin Sans" //  Rubik Mono One
    const [wordSpace, setWordSpace] = useState(5);
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
    const [wordsData, setWordsData] = useState(null);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    const [yourAudioFiles, setYourAudioFiles] = useState([]);
    const [yourVideoFiles, setYourVideoFiles] = useState([]);
    const [selectedVideoFiles, setSelectedVideoFiles] = useState([]);
    const [selectedAudioFiles, setSelectedAudioFiles] = useState([]);
    const [currentAudioFile, setCurrentAudioFile] = useState(null);

    const [previewVideo, setPreviewVideo] = useState(null);
    const [previewAudio, setPreviewAudio] = useState(null);
    const [YOUR_AUDIO_FILES, setYOUR_AUDIO_FILES] = useState(readFromLocalStorage("audioFiles", []));
    const [YOUR_VIDEO_FILES, setYOUR_VIDEO_FILES] = useState(readFromLocalStorage("videoFiles", []));
    const [previewUrls, setPreviewUrls] = useState([]); // State to manage VIDEO preview URLs
    const [isRecording, setIsRecording] = useState(false);

    const [YOUR_PRESETS, setYOUR_PRESETS] = useState(readFromLocalStorage("presets", []));
    const [currentPrestSettings, setCurrentPrestSettings] = useState(null);

    const [xAxis, setXAxis] = useState(50);
    const [yAxis, setYAxis] = useState(50);

    const [loadedVideo, setLoadedVideo] = useState(false);
    const [loadedMetaData, setLoadedMetaData] = useState(false);

    const audioFileInputRef = useRef();

    const sourceVideoRef = useRef();
    const audioElRef = useRef();
    // const baseUrl = "http://localhost:3001";

    useEffect(() => {
        if (!Object.keys(YOUR_PRESETS).length) {
            setYOUR_PRESETS(defaultPresets);
        } else if (!currentPrestSettings) {
            const firstKey = Object.keys(YOUR_PRESETS)[0];
            setCurrentPrestSettings(YOUR_PRESETS[firstKey]);
        }
    }, [YOUR_PRESETS, currentPrestSettings]);

    const GLOBAL = {
        isRecording,
        setIsRecording,
        previewUrls,
        setPreviewUrls,
        activeWordColor,
        audioElRef,
        audioFileInputRef,
        backgroundColor,
        baseUrl,
        canvasCtx,
        isVideoPlaying,
        setIsVideoPlaying,
        currentAudioFile,
        setCurrentAudioFile,
        currentPrestSettings,
        // currentVideoTime,
        isAudioPlaying,
        setIsAudioPlaying,
        fontFamily,
        fontSize,
        currentAudioDuration,
        setCurrentAudioDuration,
        lineHeight,
        loadedMetaData,
        loadedVideo,
        presetName,
        previewAudio,
        previewVideo,
        selectedAudioFiles,
        selectedVideoFiles,
        setActiveWordColor,
        setBackgroundColor,
        setCanvasCtx,
        setCurrentPrestSettings,
        // setCurrentVideoTime,
        setFontFamily,
        setFontSize,
        setLineHeight,
        setLoadedMetaData,
        setLoadedVideo,
        setPresetName,
        setPreviewAudio,
        setPreviewVideo,
        setSelectedAudioFiles,
        setSelectedVideoFiles,
        setStrokeColor,
        setTextDecoration,
        setTextStrokeThickness,
        setVideoDuration,
        setWithActiveWordColor,
        setWithBackground,
        setWithSingleWord,
        setWithTextStroke,
        setWithWordAnimation,
        setWordColor,
        setWordSpace,
        setYOUR_AUDIO_FILES,
        setYOUR_PRESETS,
        setYOUR_VIDEO_FILES,
        setYourAudioFiles,
        setYourVideoFiles,
        sourceVideoRef,
        strokeColor,
        textDecoration,
        textStrokeThickness,
        videoDuration,
        withActiveWordColor,
        withBackground,
        withSingleWord,
        withTextStroke,
        withWordAnimation,
        wordColor,
        wordSpace,
        YOUR_AUDIO_FILES,
        YOUR_PRESETS,
        YOUR_VIDEO_FILES,
        // currentAudioTime,
        // setCurrentAudioTime,

        yourAudioFiles,
        wordsData,
        setWordsData,
        yourVideoFiles,

        xAxis,
        setXAxis,
        yAxis,
        setYAxis,
    };
    return <CanvasContext.Provider value={GLOBAL}>{props.children}</CanvasContext.Provider>;
}

export default CanvasContextProvider;
