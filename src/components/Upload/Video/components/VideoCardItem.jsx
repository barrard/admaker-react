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

export default function VideoCardItem({ file = {} }) {
    const { YOUR_VIDEO_FILES, setYOUR_VIDEO_FILES } = useContext(CanvasContext);
    const [enabledVideo, setEnabledVideo] = useState(true);

    function removeVideoFile(fileName) {
        console.log("Remove  " + fileName);
        setYOUR_VIDEO_FILES(
            YOUR_VIDEO_FILES.filter((af) => af.originalFileName != fileName)
        );
    }
    console.log(file);

    return (
        <Card className="border border-green-500 relative">
            <Switch
                className="top-1 right-1 absolute"
                checked={enabledVideo}
                onCheckedChange={() => setEnabledVideo(!enabledVideo)}
            />
            <CardHeader
                className={"border border-red-300 p-1"}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <CardTitle className="text- font-semibold">
                    {file.name}
                </CardTitle>

                <CardDescription className="overflow-hidden">
                    <video
                        className="w-28 m-2"
                        src={file.videoUrl}
                        // width="75"
                        controls
                    />
                </CardDescription>
            </CardHeader>
            {/* <CardContent>
                <p>Card Content</p>
            </CardContent> */}
            <CardFooter className={"border border-blue-300 p-1"}>
                <BasicBtn
                    // id="clearAudioFilesList"
                    onClick={() =>
                        removeVideoFile("videoFile.originalFileName")
                    }
                    text={<Trash2 className="text-red-500" size={18} />}
                    title="Delete"
                />
                <BasicBtn
                    // id="clearAudioFilesList"
                    onClick={() => console.log("videoFile.originalFileName")}
                    text={<Play className="text-green-500" size={18} />}
                    title="Play"
                />
            </CardFooter>
        </Card>
    );
}
