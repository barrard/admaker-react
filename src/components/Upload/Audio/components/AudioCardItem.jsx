import React, { useState, useContext, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

import { Trash2, Play, Pause } from "lucide-react";
import { BasicBtn } from "../../../Button";

import CanvasContext from "../../../Context/CanvasContext";
import TimerContext from "../../../Context/TimerContext";

export default function AudioCardItem({ audioFile = {} }) {
    const audioCardElRef = useRef();
    const { currentAudioTime, setCurrentAudioTime } = useContext(TimerContext);
    const {
        audioElRef,
        currentAudioFile,
        isAudioPlaying,
        setCurrentAudioFile,
        setIsAudioPlaying,
        setWordsData,
        setYOUR_AUDIO_FILES,
        sourceVideoRef,
        wordsData,
        YOUR_AUDIO_FILES,
        handleTogglePlay,
    } = useContext(CanvasContext);
    const [isExpanded, setIsExpanded] = useState(false); // Initially collapsed
    const [enabledAudio, setEnabledAudio] = useState(audioFile.enabled);
    const [isCurrentAudio, setIsCurrentAudio] = useState(false);
    // const [currentTime, setCurrentTime] = useState(0);
    function removeAudioFile(fileName) {
        console.log("Remove  " + fileName);
        setYOUR_AUDIO_FILES(YOUR_AUDIO_FILES.filter((af) => af.originalFileName != fileName));
    }

    useEffect(() => {
        const indexOf = YOUR_AUDIO_FILES.findIndex((af) => af.savedFileName === audioFile.savedFileName);
        if (indexOf < 0 || !YOUR_AUDIO_FILES[indexOf]) return;

        YOUR_AUDIO_FILES[indexOf].enabled = enabledAudio;
        setYOUR_AUDIO_FILES([...YOUR_AUDIO_FILES]);
    }, [enabledAudio]);

    useEffect(() => {
        // console.log(currentAudioFile);
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
                            onClick={() => {
                                handleTogglePlay({ audioFile });
                            }}
                            text={audioIsPlaying ? <Pause className="text-yellow-500" size={18} /> : <Play className="text-green-500" size={18} />}
                            title={audioIsPlaying ? "Pause" : "Play"}
                        />
                        <span className="pl-2">
                            {audioIsPlaying ? currentAudioTime.toFixed(2) : "0.00"} : {audioCardElRef.current?.duration.toFixed(2)}
                        </span>
                        <audio src={audioFile.source} ref={audioCardElRef} />
                    </>
                )}
            </CardFooter>
        </Card>
    );
}
