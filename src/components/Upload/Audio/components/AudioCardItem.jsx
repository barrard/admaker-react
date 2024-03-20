import React, { useState, useContext, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

import { Trash2, Play, Pause, Pencil, Check, Ban } from "lucide-react";
import { BasicBtn } from "../../../Button";

import CanvasContext from "../../../Context/CanvasContext";
import TimerContext from "../../../Context/TimerContext";
import MyBadge from "../../../Badge";

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
    const [editText, setEditText] = useState(false);
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

    function handleSaveEditedText() {
        setEditText(false);
    }
    function handleCancelEditedText() {
        setEditText(false);
    }

    return (
        <Card className={`border border-green-500 relative ${isCurrentAudio ? " bg-green-500" : ""}`}>
            <Switch className="top-1 right-1 absolute" checked={enabledAudio} onCheckedChange={() => setEnabledAudio(!enabledAudio)} />
            <CardHeader className={"border border-red-300 p-1 "}>
                <CardTitle className="text-sm font-semibold cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                    {audioFile.originalFileName}
                </CardTitle>

                {isExpanded && (
                    <CardDescription className="overflow-hidden">
                        {!editText &&
                            audioFile.audioJson.segments.map((segment) => {
                                const { words } = segment;

                                return words.map((_word, iWord) => {
                                    const { end, word } = _word;
                                    return (
                                        <React.Fragment key={end}>
                                            <span>{word}</span>
                                            {iWord === words.length - 1 && <br />}
                                        </React.Fragment>
                                    );
                                });
                            })}

                        {editText &&
                            audioFile.audioJson.segments.map((segment, iSeg) => {
                                const { words } = segment;

                                return words.map((_word, iWord) => {
                                    const { end, word } = _word;
                                    return (
                                        <React.Fragment key={end}>
                                            <MyBadge audioFile={audioFile} iSeg={iSeg} iWord={iWord} word={word} audioFile={audioFile} />
                                            {iWord === words.length - 1 && <br />}
                                        </React.Fragment>
                                    );
                                });
                            })}
                    </CardDescription>
                )}
            </CardHeader>
            {/* <CardContent>
                <p>Card Content</p>
            </CardContent> */}
            <CardFooter className={"border border-blue-300 p-1"}>
                <BasicBtn
                    onClick={() => {
                        setEditText((edit) => !edit);
                        if (!isExpanded) {
                            setIsExpanded(true);
                        }
                    }}
                    text={<Pencil className={`text-${editText ? "red" : "blue"}-500`} size={18} />}
                    title={editText ? "Done" : "Edit"}
                />
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
