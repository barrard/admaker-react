import React, { useState, useContext, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

import { Trash2, Play, Pause } from "lucide-react";
import { BasicBtn } from "../../../Button";

import CanvasContext from "../../../Context/CanvasContext";
import TimerContext from "../../../Context/TimerContext";

export default function DownloadCardItem(props) {
    const { item } = props;

    const { audio, preset, video, blobUrl } = item;
    return (
        <Card
            className={`border border-green-500 relative

        `}
        >
            <Switch
                className="top-1 right-1 absolute"
                // checked={enabledAudio} onCheckedChange={() => setEnabledAudio(!enabledAudio)}
            />
            <CardHeader
                className={"border border-red-300 p-1"}
                // onClick={() => setIsExpanded(!isExpanded)}
            >
                <CardTitle className="text-sm font-semibold">{"audioFile.originalFileName"}</CardTitle>

                {/* {isExpanded && (
                    <CardDescription className="overflow-hidden">
                        {audioFile.audioJson.segments.map((segment) => {
                            const { end, text } = segment;

                            return <p key={end}>{text}</p>;
                        })}
                    </CardDescription>
                )} */}
            </CardHeader>
            {/* <CardContent>
                <p>Card Content</p>
            </CardContent> */}
            <CardFooter className={"border border-blue-300 p-1"}>
                <div>
                    <a href={blobUrl} download={"recorded_video.webm"}>
                        DOWNLOAD
                    </a>
                </div>
                <BasicBtn
                    // id="clearAudioFilesList"
                    // onClick={() => removeAudioFile(audioFile.originalFileName)}
                    text={<Trash2 className="text-red-500" size={18} />}
                    title="Delete"
                />
                {/* {audioFile.source && (
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
                )} */}
            </CardFooter>
        </Card>
    );
}
