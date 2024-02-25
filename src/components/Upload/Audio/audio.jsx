import React, { useContext, useEffect, useState } from "react";
import { BasicBtn } from "../../Button";
import { AudioInput } from "../../Input";
import { CanvasContext } from "../../Context/CanvasContext";
import { readFromLocalStorage, writeToLocalStorage } from "../../../utils";
import AudioCardItem from "./components/AudioCardItem";
export default function Audio(props) {
    const {
        previewAudio,
        setPreviewAudio,
        audioElRef,
        audioFileInputRef,
        baseUrl,
        YOUR_AUDIO_FILES,
        setYOUR_AUDIO_FILES,
        YOUR_VIDEO_FILES,
        setYOUR_VIDEO_FILES,
    } = useContext(CanvasContext);

    const [uploadingAudioFiles, setUploadingAudioFiles] = useState(false);

    async function uploadFile(formData, path) {
        try {
            const resp = await fetch(baseUrl + path, {
                method: "POST",
                body: formData,
            });

            const jsonData = await resp.json();

            if (!jsonData.data) {
                throw new Error("No Data");
            }
            return jsonData.data;
        } catch (err) {
            console.error("Error:", err);
            alert("Failed to upload file.");
        }
    }

    function clearAudioFiles() {
        setYOUR_AUDIO_FILES([]);
    }

    useEffect(() => {
        writeToLocalStorage("audioFiles", YOUR_AUDIO_FILES);
    }, [YOUR_AUDIO_FILES]);

    return (
        <div>
            <h1>Audio Upload</h1>

            <AudioInput
                isLoading={uploadingAudioFiles}
                audioFileInputRef={audioFileInputRef}
                onChange={function (e) {
                    // Get the selected file
                    const selectedFiles = event.target.files;

                    if (selectedFiles.length) {
                        let audiosToUpload = [];
                        const formData = new FormData();

                        for (let i = 0; i < selectedFiles.length; i++) {
                            const reader = new FileReader();

                            reader.onload = async function (e) {
                                audiosToUpload.push({
                                    file: selectedFiles[i], // Store the original file
                                    source: e.target.result, // Store the data URL
                                });
                                formData.append("audioFiles", selectedFiles[i]);

                                // If all files are processed, update your UI or handle the data
                                if (
                                    audiosToUpload.length ===
                                    selectedFiles.length
                                ) {
                                    debugger;
                                    console.log(
                                        "All files loaded:",
                                        audiosToUpload
                                    );
                                    // Do something with the audiosToUpload array
                                    audioElRef.current.src =
                                        audiosToUpload[0].source;

                                    setUploadingAudioFiles(true);
                                    const audioFilesUploaded = await uploadFile(
                                        formData,
                                        "/uploads/audio"
                                    );
                                    setUploadingAudioFiles(false);

                                    setYOUR_AUDIO_FILES([
                                        ...YOUR_AUDIO_FILES,
                                        ...audioFilesUploaded,
                                    ]);
                                }
                            };

                            reader.readAsDataURL(selectedFiles[i]);
                        }
                    }
                }}
            />

            <br />
            <BasicBtn
                id="clearAudioFilesList"
                onClick={clearAudioFiles}
                text="Clear Audio Files"
            />

            <div id="audioFilesList">
                {YOUR_AUDIO_FILES.map((audioFile, i) => {
                    console.log(audioFile);
                    return (
                        <React.Fragment key={audioFile.originalFileName}>
                            <AudioCardItem audioFile={audioFile} />
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
}
