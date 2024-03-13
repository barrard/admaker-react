import React, { useState, useContext, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Switch } from "@/components/ui/switch";

import { Trash2, Download } from "lucide-react";
import { BasicBtn } from "../../../Button";

import CanvasContext from "../../../Context/CanvasContext";
import TimerContext from "../../../Context/TimerContext";

export default function DownloadCardItem(props) {
    const { item, blobUrls, setBlobUrls } = props;
    const downloadLinkRef = useRef();

    const { downloadLinkRefs, setDownloadLinksRefs } = useContext(CanvasContext);

    const [hasDownloaded, setHasDownloaded] = useState(false);

    const { audio, preset, video, blobUrl, audioIndex, videoIndex, presetIndex } = item;

    const NAME = `video-${videoIndex}_audio-${audioIndex}_preset-${presetIndex}`;

    // useEffect(() => {
    //     if (downloadLinkRef.current) {
    //         console.log("adding link");
    //         setDownloadLinksRefs((downloadLinksRefs) => [...downloadLinksRefs, downloadLinkRef]);
    //     }
    // }, [downloadLinkRef?.current]);

    function removeFile(item) {
        console.log(blobUrls);
        console.log(item);
        debugger;
        setBlobUrls((blobUrls) => blobUrls.filter((b) => b.blobUrl != item.blobUrl));
    }

    return (
        <Card
            className={`border border-green-500 relative

        `}
        >
            {/* <Switch
                className="top-1 right-1 absolute"
                // checked={enabledAudio} onCheckedChange={() => setEnabledAudio(!enabledAudio)}
            /> */}
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
                <a ref={downloadLinkRef} href={blobUrl} download={`${NAME}.mp4`}>
                    <BasicBtn
                        // id="clearAudioFilesList"
                        onClick={() => setHasDownloaded(true)}
                        text={<Download className={hasDownloaded ? "text-gray-500" : "text-blue-500"} size={18} />}
                        title="Download"
                    />
                </a>

                <BasicBtn
                    // id="clearAudioFilesList"
                    onClick={() => removeFile(item)}
                    text={<Trash2 className="text-red-500" size={18} />}
                    title="Delete"
                />
            </CardFooter>
        </Card>
    );
}
