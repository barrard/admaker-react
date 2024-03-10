import React, { useState, useContext, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

import { Trash2, Play, Pause } from "lucide-react";
import { BasicBtn } from "../../../Button";

import CanvasContext from "../../../Context/CanvasContext";
import TimerContext from "../../../Context/TimerContext";

export default function DownloadCardItem(props) {
    const { item } = props;

    const { audio, preset, video, blobUrl, audioIndex, videoIndex, presetIndex } = item;
    debugger;
    const NAME = `video-${videoIndex}_audio-${audioIndex}_preset-${presetIndex}`;
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
                <CardTitle className="text-sm font-semibold">{NAME}</CardTitle>

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
                    <a href={blobUrl} download={`${NAME}.webm`}>
                        DOWNLOAD
                    </a>
                </div>
                <BasicBtn
                    // id="clearAudioFilesList"
                    // onClick={() => removeAudioFile(audioFile.originalFileName)}
                    text={<Trash2 className="text-red-500" size={18} />}
                    title="Delete"
                />
            </CardFooter>
        </Card>
    );
}
