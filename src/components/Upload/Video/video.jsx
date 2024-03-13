import React, { useContext, useState, useEffect } from "react";
import { BasicBtn } from "../../Button";
import { VideoInput } from "../../Input";
import CanvasContext from "../../Context/CanvasContext";
import VideoCardItem from "./components/VideoCardItem";

export default function Video(props) {
    // console.log("Video");
    const { previewVideo, setPreviewVideo, selectedVideoFiles, setSelectedVideoFiles, previewVideos, setPreviewVideos } = useContext(CanvasContext);

    useEffect(() => {
        if (!previewVideo) return;
        //so we need to remove the current previewVideo?
        const found = previewVideos.find((pv) => pv.name == previewVideo.name);
        debugger;
        if (!found) {
            setPreviewVideo(null);
        }
    }, [previewVideos]);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        console.log(files);
        // Update selected video files
        setSelectedVideoFiles(files);

        // Generate preview URLs for each file
        const newPreviewVideos = files.map((file) => {
            file.videoUrl = URL.createObjectURL(file);
            return file;
        });
        setPreviewVideos((previewVideos) => [...previewVideos, ...newPreviewVideos]);
        if (!previewVideo && newPreviewVideos.length > 0) {
            setPreviewVideo(newPreviewVideos[0]);
        }
    };

    const clearVideoFiles = () => {
        setSelectedVideoFiles([]);
        setPreviewVideos([]); // Clear previews
    };

    return (
        <div>
            <h1>Video Upload</h1>
            <VideoInput onChange={handleFileChange} />
            {/* <br /> */}
            {/* <BasicBtn id="uploadVideoButton" text="Upload Video Files" /> */}
            <br />
            <BasicBtn id="clearVideoFilesList" text="Clear video Files" onClick={clearVideoFiles} />
            {/* Display Previews */}
            {previewVideos.length > 0 && (
                <div>
                    <div className="flex flex-wrap justify-around py-4" id="videoFilesList">
                        {previewVideos.map((file) => (
                            <React.Fragment key={file.name}>
                                <VideoCardItem file={file} />
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
