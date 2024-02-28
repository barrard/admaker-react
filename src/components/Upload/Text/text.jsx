import React, { useContext, useState } from "react";
import { BasicBtn } from "../../Button";
// import { TextInput } from "../../Input";
import { CanvasContext } from "../../Context/CanvasContext";
import TextCardItem from "./components/TextCardItem";

export default function Text(props) {
    const {
        previewText,
        setPreviewText,
        selectedTextFiles,
        setSelectedTextFiles,
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
        console.log(files);

        // Update selected video files
        setSelectedTextFiles(files);

        // Generate preview URLs for each file
        const newPreviewUrls = files.map((file) => {
            file.videoUrl = URL.createObjectURL(file);
            debugger;
            return file;
        });
        setPreviewUrls((previewUrls) => [...previewUrls, ...newPreviewUrls]);
        if (!previewText && newPreviewUrls.length > 0) {
            setPreviewText(newPreviewUrls[0].videoUrl);
        }
    };

    const clearTextFiles = () => {
        setSelectedTextFiles([]);
        setPreviewUrls([]); // Clear previews
    };

    return (
        <div>
            <h1>Text Upload</h1>
            {/* <TextInput
                onChange={function (e) {
                    handleFileChange(e);
                    // var media = URL.createObjectURL(e.target.files[0]);
                    // setPreviewText(media);
                }}
            /> */}
            {/* <br /> */}
            {/* <BasicBtn id="uploadTextButton" text="Upload Text Files" /> */}
            <br />
            <BasicBtn
                id="clearTextFilesList"
                text="Clear video Files"
                onClick={clearTextFiles}
            />
            {/* Display Previews */}
            {previewUrls.length > 0 && (
                <div>
                    <div
                        className="flex flex-wrap justify-around py-4"
                        id="videoFilesList"
                    >
                        {previewUrls.map((file) => (
                            <React.Fragment key={file.name}>
                                <TextCardItem file={file} />
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
