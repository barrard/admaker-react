import React, { useState, useContext, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

import { Trash2, Play, Pause } from "lucide-react";
import { BasicBtn } from "../../../Button";

import CanvasContext from "../../../Context/CanvasContext";

export default function AudioCardItem({ audioFile = {} }) {
    const audioCardElRef = useRef();
    const { YOUR_AUDIO_FILES, setYOUR_AUDIO_FILES } = useContext(CanvasContext);
    const [isExpanded, setIsExpanded] = useState(false); // Initially collapsed
    const [enabledAudio, setEnabledAudio] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    function removeAudioFile(fileName) {
        console.log("Remove  " + fileName);
        setYOUR_AUDIO_FILES(YOUR_AUDIO_FILES.filter((af) => af.originalFileName != fileName));
    }

    const handleAudioEnded = () => {
        setIsPlaying(false);
        audioCardElRef.current.currentTime = 0;
    };

    const handleTimeUpdate = () => {
        const currentTime = audioCardElRef.current.currentTime;

        setCurrentTime(currentTime);
    };

    useEffect(() => {
        if (!audioCardElRef.current) return;
        audioCardElRef.current?.addEventListener("ended", handleAudioEnded);
        audioCardElRef.current?.addEventListener("timeupdate", handleTimeUpdate);

        return () => {
            audioCardElRef.current?.removeEventListener("ended", handleAudioEnded);
            audioCardElRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
        };
    }, [audioCardElRef.current]);

    return (
        <Card className="border border-green-500 relative">
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
                                if (isPlaying) {
                                    setIsPlaying(false);
                                    audioCardElRef.current.pause();
                                    audioCardElRef.current.currentTime = 0;
                                } else {
                                    setIsPlaying(true);
                                    audioCardElRef.current.play();
                                }
                            }}
                            text={!isPlaying ? <Play className="text-green-500" size={18} /> : <Pause className="text-yellow-500" size={18} />}
                            title="Play"
                        />
                        <span className="pl-2">
                            {currentTime.toFixed(2)} : {audioCardElRef.current?.duration.toFixed(2)}
                        </span>
                        <audio src={audioFile.source} ref={audioCardElRef} />
                    </>
                )}
            </CardFooter>
        </Card>
    );
}
