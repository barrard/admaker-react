import React, { useContext, useState, useRef, useEffect, useMemo } from "react";
import CanvasContext from "../Context/CanvasContext";
import TimerContext from "../Context/TimerContext";

import { BasicBtn } from "../Button";
import TextPresets from "./components/TextPresets";
import ControlTabs from "./components/ControlTabs";
import TwoCol from "../Layout/TwoCol";
import CustomTextConfig from "./components/CustomTextConfig";
import DownloadItem from "./components/DownloadItem";
// Recording setup
// let mediaRecorder;
let recordedChunks = [];
export default function canvasControls(props) {
    const { setCurrentVideoTime, currentVideoTime, setCurrentAudioTime } = useContext(TimerContext) || {};
    const {
        // wordSpace,
        activeWordColor,
        audioElRef,
        backgroundColor,
        canvasCtx,
        fontSize,
        loadedMetaData,
        loadedVideo,
        setCurrentAudioDuration,
        previewVideo,
        setActiveWordColor,
        setBackgroundColor,
        currentAudioFile,
        setCurrentAudioFile,

        setFontSize,
        setLoadedMetaData,
        currentPrestSettings,
        setCurrentPrestSettings,

        setVideoDuration,
        setLoadedVideo,
        setStrokeColor,
        setTextStrokeThickness,
        setWithActiveWordColor,
        setWithBackground,
        setWithSingleWord,
        setWithTextStroke,
        setWithWordAnimation,
        setWordColor,
        sourceVideoRef,
        isVideoPlaying,
        setIsVideoPlaying,
        strokeColor,
        textStrokeThickness,
        isAudioPlaying,
        setIsAudioPlaying,
        videoDuration,
        withActiveWordColor,
        withBackground,
        withSingleWord,
        withTextStroke,
        withWordAnimation,
        wordColor,
        YOUR_AUDIO_FILES,
        previewUrls,
        setPreviewVideo,
        YOUR_PRESETS,
    } = useContext(CanvasContext) || {};
    // console.log("canvasControls");
    const [isPlaying, setIsPlaying] = useState(false); //DO I REALLY NEED THIS?
    const [isRecording, setIsRecording] = useState(false);
    const [blobUrls, setBlobUrls] = useState([]);
    const [tab, setTab] = useState("control");

    const mediaRecorder = useRef();

    const handleTogglePlay = () => {
        if (!currentAudioFile?.source || !audioElRef?.current) {
            console.log("debug");
            return;
        }
        if (sourceVideoRef.current) {
            if (isPlaying) {
                sourceVideoRef.current.pause();
                audioElRef?.current?.pause();
            } else {
                sourceVideoRef.current.play();
                audioElRef?.current?.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

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
        }
    }

    function restartAudio() {
        if (audioElRef?.current) {
            audioElRef.current.pause();
            audioElRef.current.currentTime = 0;
            audioElRef.current.play();
            setIsPlaying(true);
        }
    }

    const handleRecord = () => {
        if (!sourceVideoRef.current) {
            alert("need a video");
        } else if (!audioElRef?.current) {
            alert("need a audio");
        } else if (mediaRecorder?.current?.state === "recording") {
            mediaRecorder?.current.stop();
            setIsRecording(false);
        } else {
            //Loop over all the audio, video and preset, filter by enabled
            beginRecording();

            async function beginRecording() {
                let audioIndex = 0;
                let videoIndex = 0;
                let presetIndex = 0;
                debugger;
                const audioFiles = YOUR_AUDIO_FILES;
                const videoFiles = previewUrls;
                const textPresets = Object.values(YOUR_PRESETS);
                while (audioIndex < audioFiles.length) {
                    videoIndex = 0;
                    while (videoIndex < videoFiles.length) {
                        presetIndex = 0;
                        while (presetIndex < textPresets.length) {
                            //Do something

                            const audioFile = audioFiles[audioIndex];
                            setCurrentAudioFile(audioFile);

                            const preset = textPresets[presetIndex];
                            setCurrentPrestSettings(preset);

                            const videoFile = videoFiles[videoIndex];
                            setPreviewVideo(videoFile.videoUrl);

                            try {
                                await new Promise((resolve, reject) => {
                                    const data = {
                                        audioFile,
                                        videoFile,
                                        preset,
                                    };
                                    return recordVideoIterator(data, resolve, reject);
                                });
                            } catch (err) {
                                debugger;
                                throw err;
                            }

                            //Then increment
                            presetIndex++;
                        }
                        videoIndex++;
                    }
                    audioIndex++;
                }
            }

            function recordVideoIterator(data, resolve, reject) {
                try {
                    setIsRecording(true);
                    // alert("lets record");
                    restartVideoAndAudio();
                    const videoPlayer = sourceVideoRef.current;

                    // const audioContext = new AudioContext();
                    // const audioSource = audioContext.createMediaElementSource(
                    //     audioElRef?.current
                    // );
                    const canvasStream = canvasCtx.canvas.captureStream(60);
                    const audioStream = audioElRef?.current.captureStream();

                    const combinedStream = new MediaStream();
                    canvasStream.getTracks().forEach((track) => combinedStream.addTrack(track));
                    audioStream.getTracks().forEach((track) => combinedStream.addTrack(track));

                    mediaRecorder.current = new MediaRecorder(combinedStream, {
                        videoBitsPerSecond: 10000000 / 2, //25000000, //10000000,
                        mimeType: "video/webm; codecs=vp9",
                        // mimeType: "video/webm; codecs=av1", // Try AV1 if supported, otherwise "video/webm; codecs=vp9"
                    });

                    mediaRecorder.current.ondataavailable = (event) => {
                        if (event.data.size > 0) {
                            recordedChunks.push(event.data);
                        }
                    };

                    mediaRecorder.current.onstop = () => {
                        console.log("recorder onstop event");
                        const blob = new Blob(recordedChunks, { type: "video/webm" });
                        const url = URL.createObjectURL(blob);
                        // videoPlayer.src = url;
                        console.log(data);
                        debugger;
                        const { audioFile, videoFile, preset } = data;
                        const blobData = {
                            audio: audioFile.originalFileName,
                            preset: preset.presetName,
                            video: videoFile.name,
                            blobUrl: url,
                        };
                        setBlobUrls((blobUrls) => [...blobUrls, blobData]);
                        resolve();
                    };

                    mediaRecorder?.current.start();
                } catch (err) {
                    reject(err);
                }
            }
        }
    };

    useEffect(() => {
        console.log(currentAudioFile);
        if (currentAudioFile?.source && audioElRef?.current) {
            setCurrentAudioDuration(audioElRef?.current.duration);
            if (isAudioPlaying) {
                audioElRef.current.pause();
                audioElRef.current.play();
            }
        }
    }, [currentAudioFile, currentAudioFile?.source]);

    //AUDIO EVENTS
    function handleAudioStarted() {
        setIsAudioPlaying(true);
        setIsPlaying(true);
    }

    function handleAudioEnded() {
        console.log("handleAudioEnded");
        setIsPlaying(false);
        setIsAudioPlaying(false);
        audioElRef.current.currentTime = 0;
        //lets also stop the video
        if (mediaRecorder?.current?.state === "recording" || isRecording) {
            //end current recording, and move to the next file
            sourceVideoRef.current.currentTime = 0;
            sourceVideoRef.current.pause();
            mediaRecorder?.current.stop();
            console.log("Stop Recorder");

            //iterate?
        } else {
            console.log("We like loop party");
            //lets loop is keep the party going
            restartVideoAndAudio();
        }
    }
    function handleAudioTimeUpdate() {
        const currentTime = audioElRef.current.currentTime;
        setCurrentAudioTime(currentTime);
    }
    useEffect(() => {
        if (!audioElRef.current) return;
        audioElRef.current?.addEventListener("ended", handleAudioEnded);
        audioElRef.current?.addEventListener("play", handleAudioStarted);
        audioElRef.current?.addEventListener("timeupdate", handleAudioTimeUpdate);

        return () => {
            audioElRef.current?.removeEventListener("ended", handleAudioEnded);
            audioElRef.current?.removeEventListener("timeupdate", handleAudioTimeUpdate);
            audioElRef.current?.removeEventListener("play", handleAudioStarted);
        };
    }, [audioElRef.current]);

    //VIDEO EVENTS

    function onVideoTimeUpdate(event) {
        setCurrentVideoTime(sourceVideoRef.current.currentTime); //Change #current to currentTime
        setVideoDuration(sourceVideoRef.current.duration);
    }

    function handleVideoStarted() {
        setIsVideoPlaying(true);
        setIsPlaying(true);
    }

    function handleVideoEnded() {
        setIsPlaying(false);
        setIsVideoPlaying(false);
        sourceVideoRef.current.currentTime = 0;
    }

    useEffect(() => {
        if (!sourceVideoRef.current) return;
        sourceVideoRef.current?.addEventListener("ended", handleVideoEnded);
        sourceVideoRef.current?.addEventListener("play", handleVideoStarted);
        sourceVideoRef.current.addEventListener("timeupdate", onVideoTimeUpdate);

        return () => {
            sourceVideoRef.current?.removeEventListener("ended", handleVideoEnded);
            sourceVideoRef.current?.removeEventListener("play", handleVideoStarted);
            sourceVideoRef?.current?.removeEventListener("timeupdate", onVideoTimeUpdate);
        };
    }, [sourceVideoRef.current]);

    const MainCanvasControlsMemo = useMemo(
        () => (
            <div>
                <h2>canvas controls</h2>

                <BasicBtn onClick={handleTogglePlay} text={isPlaying ? "Pause" : "Play"} />
                <BasicBtn onClick={restartVideoAndAudio} text={"Restart"} />
                <br />
                <BasicBtn onClick={handleRecord} text={isRecording ? "Stop" : "Record"} />
                {/* <audio src={audioFile.source} ref={audioCardElRef} /> */}
                {previewUrls?.length > 0 && <p>{previewUrls?.length}</p>}
                {blobUrls.length > 0 &&
                    blobUrls.map((blobUrl) => {
                        return (
                            <React.Fragment key={blobUrl.blobUrl}>
                                <DownloadItem item={blobUrl} />
                            </React.Fragment>
                        );
                    })}
            </div>
        ),

        [
            currentPrestSettings,
            audioElRef?.current,
            isPlaying,
            isRecording,
            currentAudioFile?.source,
            mediaRecorder?.current?.state,
            blobUrls,
            setBlobUrls,
            previewUrls,
            YOUR_AUDIO_FILES,
            YOUR_PRESETS,
        ]
    );

    const CurrentTimeMemo = useMemo(
        () => (
            <p>
                <span id="currentVideoTime">{currentVideoTime}</span>/ <span id="videoDuration">{videoDuration || 0}</span>
            </p>
        ),
        [currentVideoTime, videoDuration]
    );

    const CustomTextMemo = useMemo(() => <CustomTextConfig tab={tab} setTab={setTab} />, []);

    return (
        <>
            <ControlTabs
                tab={tab}
                setTab={setTab}
                contents={[
                    {
                        name: "control",
                        value: (
                            <>
                                <div className="border border-f00">
                                    {MainCanvasControlsMemo}
                                    {CurrentTimeMemo}
                                </div>
                            </>
                        ),
                    },
                    { name: "presets", value: <TextPresets setTab={setTab} tab={tab} /> },

                    // { name: "custom", value: CustomTextMemo },
                    { name: "custom", value: <CustomTextConfig tab={tab} setTab={setTab} /> },
                ]}
                tabs={[
                    { name: "control", value: <>CONTROL</> },
                    { name: "presets", value: <>PRESETS GOOO</> },

                    { name: "custom", value: <>CUSTOM</> },
                ]}
            />
            <div
                style={{
                    maxWidth: "100%",
                    height: "200px",
                    width: "200px",
                    // visibility: "hidden",
                    position: "absolute",
                    left: "-200%",
                    top: "0%",
                }}
            >
                <video
                    muted
                    ref={sourceVideoRef}
                    onLoadedData={(e) => {
                        setLoadedVideo(true);
                    }}
                    onLoadedMetadata={() => {
                        setLoadedMetaData(true);
                    }}
                    id="sourceVideo"
                    autoPlay={false}
                    controls
                    src={previewVideo || ""}
                ></video>
                <audio src={currentAudioFile?.source} style={{ visibility: "hidsden" }} ref={audioElRef} id="audioElement" controls></audio>
            </div>
        </>
    );
}
