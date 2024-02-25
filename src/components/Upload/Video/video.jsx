import React, { useContext, useState } from "react";
import { BasicBtn } from "../../Button";
import { VideoInput } from "../../Input";
import { CanvasContext } from "../../Context/CanvasContext";
import VideoCardItem from "./components/VideoCardItem";

export default function Video(props) {
    const {
        previewVideo,
        setPreviewVideo,
        selectedVideoFiles,
        setSelectedVideoFiles,
    } = useContext(CanvasContext);

    const [previewUrls, setPreviewUrls] = useState([]); // State to manage preview URLs

    // const handleFileChange = (event) => {

    //        // Get the selected file
    //        const selectedFiles = event.target.files;

    //     // const files = event.target.files;
    //     setSelectedFiles(Array.from(files));
    // };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);

        // Update selected video files
        setSelectedVideoFiles(files);

        // Generate preview URLs for each file
        const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
        setPreviewUrls(newPreviewUrls);
    };

    const clearVideoFiles = () => {
        setSelectedVideoFiles([]);
        setPreviewUrls([]); // Clear previews
    };

    return (
        <div>
            <h1>Video Upload</h1>
            <VideoInput
                onChange={function (e) {
                    handleFileChange(e);
                    // var media = URL.createObjectURL(e.target.files[0]);
                    // setPreviewVideo(media);
                }}
            />
            {/* <br /> */}
            {/* <BasicBtn id="uploadVideoButton" text="Upload Video Files" /> */}
            <br />
            <BasicBtn
                id="clearVideoFilesList"
                text="Clear video Files"
                onClick={clearVideoFiles}
            />
            {/* Display Previews */}
            {previewUrls.length > 0 && (
                <div>
                    <h2>Previews:</h2>
                    <br />
                    <div
                        className="flex flex-wrap justify-around p-4"
                        id="videoFilesList"
                    >
                        {previewUrls.map((url, index) => (
                            <React.Fragment key={index}>
                                <VideoCardItem url={url} />
                            </React.Fragment>
                            // <video
                            //     className="w-28 m-2"
                            //     src={url}
                            //     key={index}
                            //     width="75"
                            //     controls
                            // />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
