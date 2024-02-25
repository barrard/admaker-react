import React, { useState, useContext } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

import { Trash2, Play } from "lucide-react";
import { BasicBtn } from "../../../Button";

import { CanvasContext } from "../../../Context/CanvasContext";

export default function AudioCardItem({ audioFile = {} }) {
    const { YOUR_AUDIO_FILES, setYOUR_AUDIO_FILES } = useContext(CanvasContext);
    const [isExpanded, setIsExpanded] = useState(false); // Initially collapsed
    const [enabledAudio, setEnabledAudio] = useState(true);
    function removeAudioFile(fileName) {
        console.log("Remove  " + fileName);
        setYOUR_AUDIO_FILES(
            YOUR_AUDIO_FILES.filter((af) => af.originalFileName != fileName)
        );
    }
    return (
        <Card className="border border-green-500 relative">
            <Switch
                className="top-1 right-1 absolute"
                checked={enabledAudio}
                onCheckedChange={() => setEnabledAudio(!enabledAudio)}
            />
            <CardHeader
                className={"border border-red-300 p-1"}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <CardTitle className="text-sm font-semibold">
                    {audioFile.originalFileName}
                </CardTitle>

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
                <BasicBtn
                    // id="clearAudioFilesList"
                    onClick={() => console.log(audioFile.originalFileName)}
                    text={<Play className="text-green-500" size={18} />}
                    title="Play"
                />
            </CardFooter>
        </Card>
    );
}
