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
    const [isPlaying, setIsPlaying] = useState(false);

    const [previewVideo, setPreviewVideo] = useState(null);

    const [YOUR_AUDIO_FILES, setYOUR_AUDIO_FILES] = useState(readFromLocalStorage("audioFiles", []));
    // const [YOUR_VIDEO_FILES, setYOUR_VIDEO_FILES] = useState(readFromLocalStorage("videoFiles", []));
    const [previewVideos, setPreviewVideos] = useState([]); // State to manage VIDEO preview URLs
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

    function handleTogglePlay(files = {}) {
        debugger;
        const { audioFile, videoFile } = files;
        if (!currentAudioFile?.source || !audioElRef?.current) {
            console.log("debug");
            return;
        }

        if (isPlaying) {
            setIsPlaying(false);

            //stop playing audio
            if (isAudioPlaying) {
                setIsAudioPlaying(false);
                audioElRef?.current?.pause();
                // audioElRef.current.currentTime = 0;
            }

            //stop playing video
            if (isVideoPlaying) {
                setIsVideoPlaying(false);
                sourceVideoRef.current.pause();
                // sourceVideoRef.current.currentTime = 0;
            }
        } else {
            //start playing audio
            if (audioFile) {
                setCurrentAudioFile(audioFile);
                setWordsData(audioFile.audioJson);
            }
            setIsAudioPlaying(true);
            audioElRef.current.play();

            //start playing video
            if (videoFile) {
                setPreviewVideo(videoFile);
            }
            setIsVideoPlaying(true);
            sourceVideoRef.current.play();

            setIsPlaying(true);
        }
    }

    function restartVideoAndAudio() {
        restartAudio();
        restartVideo();
    }

    function restartVideo() {
        if (sourceVideoRef?.current) {
            sourceVideoRef.current.pause();
            sourceVideoRef.current.currentTime = 0;
            sourceVideoRef.current.play();
            setIsPlaying(true);
            setIsVideoPlaying(true);
        }
    }

    function restartAudio() {
        if (audioElRef?.current) {
            audioElRef.current.pause();
            audioElRef.current.currentTime = 0;
            audioElRef.current.play();
            setIsPlaying(true);
            setIsAudioPlaying(true);
        }
    }

    const GLOBAL = {
        activeWordColor,
        audioElRef,
        audioFileInputRef,
        backgroundColor,
        baseUrl,
        canvasCtx,
        currentAudioDuration,
        currentAudioFile,
        currentPrestSettings,
        fontFamily,
        fontSize,
        handleTogglePlay,
        isAudioPlaying,
        isPlaying,
        isRecording,
        isVideoPlaying,
        lineHeight,
        loadedMetaData,
        loadedVideo,
        presetName,
        previewVideo,
        previewVideos,
        restartAudio,
        restartVideo,
        restartVideoAndAudio,
        selectedAudioFiles,
        selectedVideoFiles,
        setActiveWordColor,
        setBackgroundColor,
        setCanvasCtx,
        setCurrentAudioDuration,
        setCurrentAudioFile,
        setCurrentPrestSettings,
        setFontFamily,
        setFontSize,
        setIsAudioPlaying,
        setIsPlaying,
        setIsRecording,
        setIsVideoPlaying,
        setLineHeight,
        setLoadedMetaData,
        setLoadedVideo,
        setPresetName,
        setPreviewVideo,
        setPreviewVideos,
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
        setWordsData,
        setWordSpace,
        setXAxis,
        setYAxis,
        setYOUR_AUDIO_FILES,
        setYOUR_PRESETS,
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
        wordsData,
        wordSpace,
        xAxis,
        yAxis,
        YOUR_AUDIO_FILES,
        YOUR_PRESETS,
        yourAudioFiles,
        yourVideoFiles,
    };
    return <CanvasContext.Provider value={GLOBAL}>{props.children}</CanvasContext.Provider>;
}

export default CanvasContextProvider;
