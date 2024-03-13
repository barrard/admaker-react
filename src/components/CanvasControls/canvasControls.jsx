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
// let recordedChunks = [];
export default function canvasControls(props) {
    const { setCurrentVideoTime, currentVideoTime, setCurrentAudioTime } = useContext(TimerContext) || {};
    const {
        // wordSpace,
        activeWordColor,
        audioElRef,
        backgroundColor,
        downloadLinkRefs,
        canvasCtx,
        currentAudioFile,
        currentPrestSettings,
        fontSize,
        isAudioPlaying,
        isRecording,
        isVideoPlaying,
        loadedMetaData,
        loadedVideo,
        previewVideos,
        previewVideo,
        setActiveWordColor,
        setBackgroundColor,
        setCurrentAudioDuration,
        setCurrentAudioFile,
        setCurrentPrestSettings,
        setFontSize,
        setIsAudioPlaying,
        setIsRecording,
        setIsVideoPlaying,
        setLoadedMetaData,
        setLoadedVideo,
        setPreviewVideo,
        setStrokeColor,
        setTextStrokeThickness,
        setVideoDuration,
        setWithActiveWordColor,
        setWithBackground,
        setWithSingleWord,
        setWithTextStroke,
        setWithWordAnimation,
        setWordColor,
        setWordsData,
        wordsData,
        sourceVideoRef,
        strokeColor,
        textStrokeThickness,
        videoDuration,
        withActiveWordColor,
        withBackground,
        withSingleWord,
        withTextStroke,
        withWordAnimation,
        wordColor,
        YOUR_AUDIO_FILES,
        YOUR_PRESETS,
        isPlaying,
        setIsPlaying,
        handleTogglePlay,
        restartVideoAndAudio,
        restartVideo,
        restartAudio,
    } = useContext(CanvasContext) || {};
    // console.log("canvasControls");

    const [blobUrls, setBlobUrls] = useState([]);
    const [tab, setTab] = useState("control");

    const mediaRecorder = useRef();

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
                setIsRecording(true);

                let currentAudioIndex;
                let currentVideoIndex;
                let currentPresetIndex;
                debugger;
                const audioFiles = YOUR_AUDIO_FILES.filter((af) => af.enabled);
                const videoFiles = previewVideos;
                const textPresets = Object.values(YOUR_PRESETS).filter((preset) => preset.isActiveTextPreset);
                while (audioIndex < audioFiles.length) {
                    videoIndex = 0;
                    while (videoIndex < videoFiles.length) {
                        presetIndex = 0;
                        while (presetIndex < textPresets.length) {
                            //Do something
                            debugger;
                            const audioFile = audioFiles[audioIndex];
                            setCurrentAudioFile(audioFile);
                            // if (currentAudioIndex !== audioIndex) {
                            setWordsData({ ...audioFile?.audioJson });
                            // }

                            const preset = textPresets[presetIndex];
                            setCurrentPrestSettings(preset);

                            const videoFile = videoFiles[videoIndex];
                            setPreviewVideo(videoFile);
                            if (currentVideoIndex !== videoIndex || currentAudioIndex !== audioIndex) {
                                await timeWait(2);
                            }

                            currentAudioIndex = audioIndex;
                            currentVideoIndex = videoIndex;
                            currentPresetIndex = presetIndex;

                            try {
                                await new Promise((resolve, reject) => {
                                    const data = {
                                        audioFile,
                                        videoFile,
                                        preset,
                                        audioIndex,
                                        videoIndex,
                                        presetIndex,
                                        canvasCtx,
                                        audioElRef,
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
                setIsRecording(false);
            }

            function recordVideoIterator(data, resolve, reject) {
                try {
                    let recordedChunks = [];

                    const { canvasCtx, audioElRef } = data;
                    setIsRecording(true);
                    // alert("lets record");
                    restartVideoAndAudio();
                    // const videoPlayer = sourceVideoRef.current;

                    // const audioContext = new AudioContext();
                    // const audioSource = audioContext.createMediaElementSource(
                    //     audioElRef?.current
                    // );
                    const canvasStream = canvasCtx.canvas.captureStream(60);
                    const audioStream = audioElRef.current.captureStream();
                    debugger;
                    const combinedStream = new MediaStream();
                    canvasStream.getTracks().forEach((track) => combinedStream.addTrack(track));
                    audioStream.getTracks().forEach((track) => {
                        debugger;
                        combinedStream.addTrack(track);
                    });

                    // let mimeType;
                    // if (MediaRecorder.isTypeSupported("video/mp4; codecs=h264")) {
                    //     mimeType = "video/mp4; codecs=h264";
                    // } else {
                    //     mimeType = "video/webm; codecs=vp9"; // Or codecs=vp8 for older compatibility
                    // }

                    mediaRecorder.current = new MediaRecorder(combinedStream, {
                        videoBitsPerSecond: 10000000, //25000000, //10000000,
                        mimeType: "video/webm; codecs=vp9",
                        // mimeType: "video/mp4; codecs=h264",

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

                        const { audioFile, videoFile, preset, audioIndex, videoIndex, presetIndex } = data;
                        const blobData = {
                            audio: audioFile.originalFileName,
                            preset: preset.presetName,
                            video: videoFile.name,
                            blobUrl: url,
                            audioIndex,
                            videoIndex,
                            presetIndex,
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
        // console.log(currentAudioFile);
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
            setTimeout(() => {
                //end current recording, and move to the next file
                sourceVideoRef.current.currentTime = 0;
                sourceVideoRef.current.pause();
                mediaRecorder?.current.stop();
                console.log("Stop Recorder");
            }, 500);
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
        setCurrentVideoTime(0);
    }

    function downloadAll() {
        console.log(downloadLinkRefs);
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
                {/* {<p>Videos: {previewVideos?.length}</p>} */}
                {blobUrls.length > 0 && (
                    <>
                        {/* <BasicBtn onClick={downloadAll} text={"DOWNLOAD ALL"} /> */}

                        {blobUrls.map((blobUrl) => {
                            return (
                                <React.Fragment key={blobUrl.blobUrl}>
                                    <DownloadItem blobUrls={blobUrls} setBlobUrls={setBlobUrls} item={blobUrl} />
                                </React.Fragment>
                            );
                        })}
                    </>
                )}
            </div>
        ),

        [
            currentPrestSettings,
            audioElRef?.current,
            isPlaying,
            isRecording,
            currentAudioFile?.audioJson,
            wordsData,
            currentAudioFile,
            mediaRecorder?.current?.state,
            blobUrls,
            setBlobUrls,
            previewVideos,
            YOUR_AUDIO_FILES,
            YOUR_PRESETS,
            audioElRef?.current?.source,
            canvasCtx.canvas,
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
                    src={previewVideo?.videoUrl || ""}
                ></video>
                <audio src={currentAudioFile?.source} style={{ visibility: "hidsden" }} ref={audioElRef} id="audioElement" controls></audio>
            </div>
        </>
    );
}

async function timeWait(time) {
    try {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, time * 1000);
        });
    } catch (err) {
        return err;
    }
}
