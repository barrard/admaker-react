import React, { useContext, useState, useRef, useEffect } from "react";
import { CanvasContext } from "../Context/CanvasContext";
import { BasicBtn } from "../Button";
import ColorInput from "../Input/ColorInput";
import NumberSlider from "../Input/NumberSlider";
// Recording setup
// let mediaRecorder;
let recordedChunks = [];
export default function canvasControls(props) {
    // const { audioElRef } = props;
    const {
        currentVideoTime,
        videoDuration,
        sourceVideoRef,
        canvasCtx,
        setActiveWordColor,
        setWordColor,
        activeWordColor,
        strokeColor,
        wordColor,
        backgroundColor,
        setStrokeColor,
        setBackgroundColor,
        textStrokeThickness,
        setTextStrokeThickness,
        audioElRef,
    } = useContext(CanvasContext) || {};
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [blobUrl, setBlobUrl] = useState(false);
    // const [mediaRecorder, setMediaRecorder] = useState(null)
    const mediaRecorder = useRef();

    const handleTogglePlay = () => {
        if (sourceVideoRef.current) {
            if (isPlaying) {
                sourceVideoRef.current.pause();
                audioElRef.current.pause();
            } else {
                sourceVideoRef.current.play();
                audioElRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const restartVideo = () => {
        sourceVideoRef.current.pause();
        audioElRef.current.pause();
        sourceVideoRef.current.currentTime = 0;
        audioElRef.current.currentTime = 0;
        sourceVideoRef.current.play();
        audioElRef.current.play();
    };

    const handleRecord = () => {
        debugger;
        if (!sourceVideoRef.current) {
            alert("need a video");
        } else if (!audioElRef.current) {
            alert("need a audio");
        } else if (mediaRecorder.current?.state === "recording") {
            mediaRecorder.current.stop();
        } else {
            // alert("lets record");
            restartVideo();
            const videoPlayer = sourceVideoRef.current;

            // const audioContext = new AudioContext();
            // const audioSource = audioContext.createMediaElementSource(
            //     audioElRef.current
            // );
            const canvasStream = canvasCtx.canvas.captureStream(60);
            const audioStream = audioElRef.current.captureStream();

            const combinedStream = new MediaStream();
            canvasStream
                .getTracks()
                .forEach((track) => combinedStream.addTrack(track));
            audioStream
                .getTracks()
                .forEach((track) => combinedStream.addTrack(track));

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

            mediaRecorder.current.start();
        }
    };

    useEffect(() => {
        if (currentVideoTime && mediaRecorder.current?.state === "recording") {
            console.log(currentVideoTime);
            console.log(audioElRef.current.currentTime);
            console.log(audioElRef.current.duration);
        }

        return () => {};
    }, [currentVideoTime, mediaRecorder.current, audioElRef.current]);

    return (
        <div className="border border-f00">
            <h2>canvas controls</h2>
            <BasicBtn
                onClick={handleTogglePlay}
                text={isPlaying ? "Pause" : "Play"}
            />
            <BasicBtn onClick={restartVideo} text={"Restart"} />
            <br />
            <BasicBtn
                onClick={handleRecord}
                text={isRecording ? "Stop" : "Record"}
            />
            <ColorInput
                label="Active Word Color"
                color={activeWordColor}
                setColor={setActiveWordColor}
            />
            <ColorInput
                label="Word Color"
                color={wordColor}
                setColor={setWordColor}
            />
            <ColorInput
                label="Background Color"
                color={backgroundColor}
                setColor={setBackgroundColor}
            />
            <ColorInput
                label="Stroke Color"
                color={strokeColor}
                setColor={setStrokeColor}
            />
            <NumberSlider
                number={textStrokeThickness}
                setNumber={setTextStrokeThickness}
                label="Text Stroke Thickness"
            />
            {blobUrl && (
                <a href={blobUrl} download={"recorded_video.webm"}>
                    DOWNLOAD
                </a>
            )}

            <p>
                <span id="currentVideoTime">{currentVideoTime}</span> /
                <span id="videoDuration">{videoDuration}</span>
            </p>

            <audio ref={audioElRef} id="audioElement" controls>
                <source src="" type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
}
