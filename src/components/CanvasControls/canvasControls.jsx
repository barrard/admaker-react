import React, { useContext, useState, useRef, useEffect, useMemo } from "react";
import { CanvasContext } from "../Context/CanvasContext";
import { BasicBtn } from "../Button";
import ColorInput from "../Input/ColorInput";
import NumberSlider from "../Input/NumberSlider";
import Text from "../Upload/Text";
import ControlTabs from "./components/ControlTabs";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import TwoCol from "../Layout/TwoCol";

// Recording setup
// let mediaRecorder;
let recordedChunks = [];
export default function canvasControls(props) {
    // const { audioElRef } = props;
    const {
        activeWordColor,
        audioElRef,
        backgroundColor,
        withBackground,
        setWithBackground,
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
        setWordColor,
        sourceVideoRef,
        strokeColor,
        textStrokeThickness,
        videoDuration,
        wordColor,
        withTextStroke,
        setWithTextStroke,
        withActiveWordColor,
        setWithActiveWordColor,
        withSingleWord,
        setWithSingleWord,
        withWordAnimation,
        setWithWordAnimation,
    } = useContext(CanvasContext) || {};
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [blobUrl, setBlobUrl] = useState(false);
    // const [withBackground, setWithBackground] = useState(true);
    // const [withActiveWordColor, setWithActiveWordColor] = useState(true);
    // const [withTextStroke, setWithTextStroke] = useState(true);
    // const [withWordAnimation, setWithWordAnimation] = useState(true);
    const [presetName, setPresetName] = useState("My Silly Preset");

    // const [withSingleWord, setWithSingleWord] = useState(true);
    // const [currentVideoTime, setCurrentVideoTime] = useState(0);
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
        setIsPlaying(true);
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

    const CustomText = (props) => {
        const {
            textStrokeThickness,
            setTextStrokeThickness,
            withTextStroke,
            setWithTextStroke,
            strokeColor,
            setStrokeColor,
            setWithBackground,
            setBackgroundColor,
            withActiveWordColor,
            setWithActiveWordColor,
            withSingleWord,
            setWithSingleWord,
            activeWordColor,
            setActiveWordColor,

            withWordAnimation,
            setWithWordAnimation,
        } = props.opts || {};
        const [_withSingleWord, _setWithSingleWord] = useState(withSingleWord);

        const [_withActiveWordColor, _setWithActiveWordColor] = useState(withActiveWordColor);
        const [_activeWordColor, _setActiveWordColor] = useState(activeWordColor);
        const [_textStrokeThickness, _setTextStrokeThickness] = useState(textStrokeThickness);
        // const [_setTextStrokeThickness, _setSetTextStrokeThickness] = useState(setTextStrokeThickness)
        const [_withTextStroke, _setWithTextStroke] = useState(withTextStroke);
        const [_strokeColor, _setStrokeColor] = useState(strokeColor);
        const [_withBackground, _setWithBackground] = useState(withBackground);
        const [_backgroundColor, _setBackgroundColor] = useState(backgroundColor);
        const [_withWordAnimation, _setWithWordAnimation] = useState(withWordAnimation);
        // const [setStrokeColor, setSetStrokeColor] = useState(second)
        const [xAxis, setXAxis] = useState("50");
        const [yAxis, setYAxis] = useState("50");

        useEffect(() => {
            setTextStrokeThickness(_textStrokeThickness);
            setWithTextStroke(_withTextStroke);
            setStrokeColor(_strokeColor);
            setWithBackground(_withBackground);
            setBackgroundColor(_backgroundColor);
            setWithSingleWord(_withSingleWord);
            setWithWordAnimation(_withWordAnimation);
            setWithActiveWordColor(_withActiveWordColor);
            setActiveWordColor(_activeWordColor);
        }, [
            _textStrokeThickness,
            _withTextStroke,
            _strokeColor,
            _withBackground,
            _backgroundColor,
            _withSingleWord,
            _withWordAnimation,
            _withActiveWordColor,
            _activeWordColor,
        ]);

        return (
            <div className="border border-f00">
                {/* Prest Name */}
                <div class="form-group">
                    <label for="email-input">Preset Name:</label>
                    <Input type="text" placeholder="Enter your email" value={presetName} onChange={(e) => setPresetName(e.target.value)} />
                </div>

                {/* X and Y Axis */}
                <TwoCol>
                    <div class="form-group">
                        <label className="text-gray-900 font-bold text-base mb-2" for="x-axis">
                            X-Axis:
                        </label>
                        <Input name="x-axis" type="number" placeholder="X-Axis" value={xAxis} onChange={(e) => setXAxis(e.target.value)} />
                    </div>
                    <div class="form-group">
                        <label className="text-gray-900 font-bold text-base mb-2" for="y-axis">
                            Y-Axis:
                        </label>
                        <Input name="y-axis" type="number" placeholder="Y-Axis" value={yAxis} onChange={(e) => setYAxis(e.target.value)} />
                    </div>
                </TwoCol>
                {/* WithWord Animation */}
                <span className="flex border justify-center items-baseline">
                    {/* Adjust label text as needed */}
                    <Switch className="me-2" name="word-animation" checked={_withWordAnimation} onCheckedChange={() => _setWithWordAnimation(!_withWordAnimation)} />
                    <label onClick={() => _setWithWordAnimation(!_withWordAnimation)} className="text-gray-900 font-bold text-base mb-2" for="word-animation">
                        {_withWordAnimation ? "Word Animation" : "Word Static"}
                    </label>
                </span>
                {/* <br /> */}
                {/* Single Word or Whole Sentence */}
                <span className="flex border justify-center items-baseline">
                    <Switch className="me-2" checked={_withSingleWord} onCheckedChange={() => _setWithSingleWord(!_withSingleWord)} />
                    <label onClick={() => _setWithSingleWord(!_withSingleWord)} className="text-gray-900 font-bold text-base mb-2" for="word-animation">
                        {/* Adjust label text as needed */}
                        {_withSingleWord ? "Single Word" : "Whole Sentence"}
                    </label>
                </span>

                {/* //WORD COLOR */}
                <ColorInput label="Word Color" color={wordColor} setColor={setWordColor} />
                {/* ACTIVE WORD COLOR */}
                <div className={`${_withActiveWordColor ? "" : ""} flex justify-center items-center`}>
                    <Switch checked={_withActiveWordColor} onCheckedChange={() => _setWithActiveWordColor(!_withActiveWordColor)} />
                    <ColorInput
                        className={`${!_withActiveWordColor ? "opacity-50 cursor-not-allowed" : ""} `}
                        label="Active Word Color"
                        color={_activeWordColor}
                        setColor={_setActiveWordColor}
                        disable={!_withActiveWordColor}
                    />
                </div>
                {/* BAckgroundColor */}
                <div className="flex justify-center items-center">
                    <Switch checked={_withBackground} onCheckedChange={() => _setWithBackground(!_withBackground)} />

                    <ColorInput
                        className={`${!_withBackground ? "opacity-50 cursor-not-allowed" : ""} `}
                        disable={!_withBackground}
                        label="Background Color"
                        color={_backgroundColor}
                        setColor={_setBackgroundColor}
                    />
                </div>
                {/* Color Stroke */}
                <div className="flex justify-center items-center">
                    <Switch checked={_withTextStroke} onCheckedChange={() => _setWithTextStroke(!_withTextStroke)} />
                    <ColorInput
                        disable={!_withTextStroke}
                        className={`${!_withTextStroke ? "opacity-50 cursor-not-allowed" : ""} `}
                        label="Stroke Color"
                        color={_strokeColor}
                        setColor={_setStrokeColor}
                    />
                </div>

                {withTextStroke && <NumberSlider number={textStrokeThickness} setNumber={_setTextStrokeThickness} label="Text Stroke Thickness" />}

                {/* //TODO MOVE THESE */}
                {blobUrl && (
                    <a href={blobUrl} download={"recorded_video.webm"}>
                        DOWNLOAD
                    </a>
                )}
            </div>
        );
    };

    const CustomTextMemo = useMemo(
        () => (
            <CustomText
                opts={{
                    //text stroke thickness
                    setTextStrokeThickness,
                    textStrokeThickness,
                    withTextStroke,
                    setWithTextStroke,
                    strokeColor,
                    setStrokeColor,

                    //with Background color
                    backgroundColor,
                    withBackground,
                    setWithBackground,
                    setBackgroundColor,
                    withActiveWordColor,
                    activeWordColor,
                    setActiveWordColor,
                    withSingleWord,
                    setWithSingleWord,
                    withWordAnimation,
                    setWithWordAnimation,
                    setWithActiveWordColor,
                }}
            />
        ),
        [
            // withSingleWord,
            // setWithSingleWord,
            blobUrl,
            // textStrokeThickness,
            // setTextStrokeThickness,
            setPresetName,
            // strokeColor,
            // activeWordColor,
            wordColor,
            // backgroundColor,
            // withBackground,
            // withActiveWordColor,
            // withTextStroke,
            // withWordAnimation,
            // setWithWordAnimation,
            // setWithTextStroke,
            // setWithBackground,
            // setWithActiveWordColor,
            setStrokeColor,
            setWordColor,
            setActiveWordColor,
            // setBackgroundColor,
        ]
    );

    return (
        <>
            <ControlTabs
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
                    { name: "presets", value: <Text /> },

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
