import React, { useState, useContext, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

import { Trash2, Play, Pause } from "lucide-react";
import { BasicBtn } from "../../../Button";

import CanvasContext from "../../../Context/CanvasContext";

export default function AudioCardItem({ audioFile = {} }) {
    const audioCardElRef = useRef();
    const {
        currentAudioTime,
        setCurrentAudioTime,
        YOUR_AUDIO_FILES,
        setYOUR_AUDIO_FILES,
        wordsData,
        setWordsData,
        sourceVideoRef,
        currentAudioFile,
        setCurrentAudioFile,
        isAudioPlaying,
        setIsAudioPlaying,
        audioElRef,
    } = useContext(CanvasContext);
    const [isExpanded, setIsExpanded] = useState(false); // Initially collapsed
    const [enabledAudio, setEnabledAudio] = useState(true);
    const [isCurrentAudio, setIsCurrentAudio] = useState(false);
    // const [currentTime, setCurrentTime] = useState(0);
    function removeAudioFile(fileName) {
        console.log("Remove  " + fileName);
        setYOUR_AUDIO_FILES(YOUR_AUDIO_FILES.filter((af) => af.originalFileName != fileName));
    }

    // const handleAudioEnded = () => {
    //     setIsAudioPlaying(false);
    //     audioCardElRef.current.currentTime = 0;
    // };

    // const handleTimeUpdate = () => {
    //     const currentTime = audioCardElRef.current.currentTime;

    //     setCurrentTime(currentTime);
    // };

    // useEffect(() => {
    //     if (!audioCardElRef.current) return;
    //     audioCardElRef.current?.addEventListener("ended", handleAudioEnded);
    //     audioCardElRef.current?.addEventListener("timeupdate", handleTimeUpdate);

    //     return () => {
    //         audioCardElRef.current?.removeEventListener("ended", handleAudioEnded);
    //         audioCardElRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
    //     };
    // }, [audioCardElRef.current]);
    useEffect(() => {
        console.log(currentAudioFile);
        if (currentAudioFile?.savedFileName === audioFile?.savedFileName) {
            setIsCurrentAudio(true);
        } else {
            setIsCurrentAudio(false);
        }
    }, [currentAudioFile]);
    let audioIsPlaying = !isCurrentAudio ? false : isAudioPlaying && isCurrentAudio ? true : false;

    return (
        <Card className={`border border-green-500 relative ${isCurrentAudio ? " bg-green-500" : ""}`}>
            <Switch className="top-1 right-1 absolute" checked={enabledAudio} onCheckedChange={() => setEnabledAudio(!enabledAudio)} />
            <CardHeader className={"border border-red-300 p-1"} onClick={() => setIsExpanded(!isExpanded)}>
                <CardTitle className="text-sm font-semibold">{audioFile.originalFileName}</CardTitle>

                {isExpanded && (
                    <CardDescription className="overflow-hidden">
                        {audioFile.audioJson.segments.map((segment) => {
                            const { end, text } = segment;

                            return <p key={end}>{text}</p>;
                        })}
                    </CardDescription>
                )}
            </CardHeader>
            {/* <CardContent>
                <p>Card Content</p>
            </CardContent> */}
            <CardFooter className={"border border-blue-300 p-1"}>
                <BasicBtn
                    // id="clearAudioFilesList"
                    onClick={() => removeAudioFile(audioFile.originalFileName)}
                    text={<Trash2 className="text-red-500" size={18} />}
                    title="Delete"
                />
                {audioFile.source && (
                    <>
                        <BasicBtn
                            // id="clearAudioFilesList"
                            onClick={() => {
                                console.log(audioFile.originalFileName);
                                if (isAudioPlaying) {
                                    setIsAudioPlaying(false);
                                    audioElRef.current.pause();
                                    audioElRef.current.currentTime = 0;
                                    if (sourceVideoRef?.current) {
                                        try {
                                            // sourceVideoRef.current.currentTime = 0;
                                            sourceVideoRef.current.pause();
                                        } catch (err) {
                                            console.error(err);
                                        }
                                    }
                                } else {
                                    debugger;
                                    setCurrentAudioFile(audioFile);
                                    setWordsData(audioFile.audioJson);
                                    setIsAudioPlaying(true);
                                    audioElRef.current.play();
                                    //set video to tim 0 and audio to time 0 and play both
                                    if (sourceVideoRef?.current) {
                                        try {
                                            sourceVideoRef.current.currentTime = 0;
                                            sourceVideoRef.current.play();
                                        } catch (err) {
                                            console.error(err);
                                        }
                                    }
                                }
                            }}
                            text={audioIsPlaying ? <Pause className="text-yellow-500" size={18} /> : <Play className="text-green-500" size={18} />}
                            title={audioIsPlaying ? "Pause" : "Play"}
                        />
                        <span className="pl-2">
                            {audioIsPlaying ? currentAudioTime.toFixed(2) : 0.0} : {audioCardElRef.current?.duration.toFixed(2)}
                        </span>
                        <audio src={audioFile.source} ref={audioCardElRef} />
                    </>
                )}
            </CardFooter>
        </Card>
    );
}
