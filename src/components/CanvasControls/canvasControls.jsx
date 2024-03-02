import React, { useContext, useState, useRef, useEffect, useMemo } from "react";
import CanvasContext from "../Context/CanvasContext";
import { BasicBtn } from "../Button";
import TextPresets from "./components/TextPresets";
import ControlTabs from "./components/ControlTabs";
import TwoCol from "../Layout/TwoCol";
import CustomTextConfig from "./components/CustomTextConfig";

// Recording setup
// let mediaRecorder;
let recordedChunks = [];
export default function canvasControls(props) {
    // const { audioElRef } = props;
    const {
        activeWordColor,
        audioElRef,
        backgroundColor,
        canvasCtx,
        currentVideoTime,
        loadedMetaData,
        loadedVideo,
        previewVideo,
        setActiveWordColor,
        setBackgroundColor,
        setLoadedMetaData,
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
        strokeColor,
        textStrokeThickness,
        videoDuration,
        withActiveWordColor,
        withBackground,
        withSingleWord,
        withTextStroke,
        withWordAnimation,
        wordColor,
        fontSize,
        // wordSpace,
        setFontSize,
    } = useContext(CanvasContext) || {};
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [blobUrl, setBlobUrl] = useState(false);
    const [tab, setTab] = useState("custom");

    // const [withBackground, setWithBackground] = useState(true);
    // const [withActiveWordColor, setWithActiveWordColor] = useState(true);
    // const [withTextStroke, setWithTextStroke] = useState(true);
    // const [withWordAnimation, setWithWordAnimation] = useState(true);

    // const [withSingleWord, setWithSingleWord] = useState(true);
    // const [currentVideoTime, setCurrentVideoTime] = useState(0);
    // const [mediaRecorder, setMediaRecorder] = useState(null)
    const mediaRecorder = useRef();

    const handleTogglePlay = () => {
        if (sourceVideoRef.current) {
            if (isPlaying) {
                sourceVideoRef.current.pause();
                audioElRef?.current.pause();
            } else {
                sourceVideoRef.current.play();
                audioElRef?.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const restartVideo = () => {
        sourceVideoRef.current.pause();
        audioElRef?.current.pause();
        sourceVideoRef.current.currentTime = 0;
        audioElRef.current.currentTime = 0;
        sourceVideoRef.current.play();
        audioElRef?.current.play();
        setIsPlaying(true);
    };

    const handleRecord = () => {
        debugger;
        if (!sourceVideoRef.current) {
            alert("need a video");
        } else if (!audioElRef?.current) {
            alert("need a audio");
        } else if (mediaRecorder?.current?.state === "recording") {
            mediaRecorder?.current.stop();
        } else {
            // alert("lets record");
            restartVideo();
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
                videoBitsPerSecond: 5000000 * 2,
                mimeType: "video/webm; codecs=vp9",
            });

            mediaRecorder.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunks.push(event.data);
                }
            };

            mediaRecorder.current.onstop = () => {
                const blob = new Blob(recordedChunks, { type: "video/webm" });
                const url = URL.createObjectURL(blob);
                // videoPlayer.src = url;
                setBlobUrl(url);
            };

            mediaRecorder?.current.start();
        }
    };

    useEffect(() => {
        if (currentVideoTime && mediaRecorder?.current?.state === "recording") {
            console.log(currentVideoTime);
            console.log(audioElRef?.current.currentTime);
            console.log(audioElRef?.current.duration);
        }

        return () => {};
    }, [currentVideoTime, mediaRecorder?.current, audioElRef?.current]);

    const MainCanvasControlsMemo = useMemo(
        () => (
            <div>
                <h2>canvas controls</h2>

                <BasicBtn onClick={handleTogglePlay} text={isPlaying ? "Pause" : "Play"} />
                <BasicBtn onClick={restartVideo} text={"Restart"} />
                <br />
                <BasicBtn onClick={handleRecord} text={isRecording ? "Stop" : "Record"} />
                <audio style={{ visibility: "hidden" }} ref={audioElRef} id="audioElement" controls>
                    <source src="" type="audio/mp3" />
                    Your browser does not support the audio element.
                </audio>
            </div>
        ),

        [audioElRef, isPlaying, isRecording]
    );

    const CurrentTimeMemo = useMemo(
        () => (
            <p>
                <span id="currentVideoTime">{currentVideoTime}</span>/ <span id="videoDuration">{videoDuration}</span>
            </p>
        ),
        [currentVideoTime, videoDuration]
    );

    const CustomTextMemo = useMemo(
        () => (
            <CustomTextConfig
                tab={tab}
                setTab={setTab}
                // opts={{
                //     //text stroke thickness
                //     //with Background color
                //     blobUrl,
                //     activeWordColor,
                //     backgroundColor,
                //     setActiveWordColor,
                //     setBackgroundColor,
                //     setStrokeColor,
                //     setTextStrokeThickness,
                //     setWithActiveWordColor,
                //     setWithBackground,
                //     setWithSingleWord,
                //     setWithTextStroke,
                //     setWithWordAnimation,
                //     setWordColor,
                //     strokeColor,
                //     textStrokeThickness,
                //     withActiveWordColor,
                //     withBackground,
                //     withSingleWord,
                //     withTextStroke,
                //     withWordAnimation,
                //     wordColor,
                //     fontSize,
                //     setFontSize,
                // }}
            />
        ),
        [
            // withSingleWord,
            // setWithSingleWord,
            blobUrl,
            // textStrokeThickness,
            // setTextStrokeThickness,
            // setPresetName,
            // strokeColor,
            // activeWordColor,
            // wordColor,
            // backgroundColor,
            // withBackground,
            // withActiveWordColor,
            // withTextStroke,
            // withWordAnimation,
            // setWithWordAnimation,
            // setWithTextStroke,
            // setWithBackground,
            // setWithActiveWordColor,
            // wordSpace,
            // setStrokeColor,
            // setWordColor,
            // setActiveWordColor,
            // setBackgroundColor,
        ]
    );

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
                                {" "}
                                <div className="border border-f00">
                                    {MainCanvasControlsMemo}
                                    {CurrentTimeMemo}
                                </div>
                            </>
                        ),
                    },
                    { name: "presets", value: <TextPresets setTab={setTab} tab={tab} /> },

                    { name: "custom", value: CustomTextMemo },
                    // { name: "custom", value: <CustomText /> },
                ]}
                tabs={[
                    { name: "control", value: <>CONTROL</> },
                    { name: "presets", value: <>PRESETS GOOO</> },

                    { name: "custom", value: <>CUSTOM</> },
                ]}
            />
            {previewVideo && (
                <div
                    style={
                        {
                            // border: "2px solid red",
                            // overflow: "hidden",
                            // height: "0px",
                        }
                    }
                    id="videoContainer"
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
                        style={{
                            maxWidth: "100%",
                            height: "200px",
                            width: "200px",
                            // visibility: "hidden",
                            position: "absolute",
                            left: "-20%",
                        }}
                        id="sourceVideo"
                        autoPlay={false}
                        controls
                        src={previewVideo}
                    ></video>
                </div>
            )}
        </>
    );
}
