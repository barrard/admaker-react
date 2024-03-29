import React, { useContext, useEffect, useState } from "react";
import { BasicBtn } from "../../Button";
import { AudioInput } from "../../Input";
import CanvasContext from "../../Context/CanvasContext";
import { readFromLocalStorage, writeToLocalStorage } from "../../../utils";
import AudioCardItem from "./components/AudioCardItem";
import TimerContextProvider from "../../Context/TimerContextProvider";

export default function Audio(props) {
    const { audioElRef, audioFileInputRef, baseUrl, currentAudioFile, setCurrentAudioFile, setWordsData, setYOUR_AUDIO_FILES, wordsData, YOUR_AUDIO_FILES } =
        useContext(CanvasContext);
    console.log("Audio");

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

        if (!currentAudioFile || !audioElRef?.current) {
            setCurrentAudioFile(YOUR_AUDIO_FILES[0]);
            setWordsData(YOUR_AUDIO_FILES[0]?.audioJson);

            // audioElRef.current
        }

        // if (!wordsData && YOUR_AUDIO_FILES?.length) {
        // }
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
                        let audioFilesData = [];
                        const formData = new FormData();

                        for (let i = 0; i < selectedFiles.length; i++) {
                            const reader = new FileReader();

                            reader.onload = async function (e) {
                                audiosToUpload.push({
                                    file: selectedFiles[i], // Store the original file
                                    source: e.target.result, // Store the data URL
                                });
                                formData.append("audioFiles", selectedFiles[i]);

                                const { name, size, type, lastModified } = selectedFiles[i];
                                audioFilesData.push({
                                    originalFileName: name,
                                    source: e.target.result,
                                    size,
                                    lastModified,
                                    type,
                                });

                                // If all files are processed, update your UI or handle the data
                                if (audiosToUpload.length === selectedFiles.length) {
                                    console.log("All files loaded:", audiosToUpload);
                                    // Do something with the audiosToUpload array
                                    audioElRef.current ? (audioElRef.current.src = audiosToUpload[0].source) : null;

                                    setUploadingAudioFiles(true);
                                    const audioFilesUploaded = await uploadFile(formData, "/uploads/audio");
                                    setUploadingAudioFiles(false);

                                    const audioDatas = audioFilesUploaded.map((af) => {
                                        let file = audioFilesData.find((f) => f.originalFileName === af.originalFileName);
                                        return { ...file, ...af, enabled: true };
                                    });
                                    if (!wordsData) {
                                        setWordsData(audioFilesUploaded[0].audioJson);
                                    }
                                    setYOUR_AUDIO_FILES((YOUR_AUDIO_FILES) => {
                                        return [...YOUR_AUDIO_FILES, ...audioDatas];
                                    });
                                }
                            };

                            reader.readAsDataURL(selectedFiles[i]);
                        }
                    }
                }}
            />

            <br />
            <BasicBtn id="clearAudioFilesList" onClick={clearAudioFiles} text="Clear Audio Files" />

            <div className=" py-4" id="audioFilesList">
                {YOUR_AUDIO_FILES.map((audioFile, i) => {
                    return (
                        <React.Fragment key={audioFile.originalFileName}>
                            <TimerContextProvider>
                                <AudioCardItem audioFile={audioFile} />
                            </TimerContextProvider>
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
}
