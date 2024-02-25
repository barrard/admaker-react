import React, { useState, useContext, useRef, useEffect } from "react";
import Canvas from "./Canvas";
import CanvasControls from "./CanvasControls";
import { AudioUpload, VideoUpload } from "./Upload";
import { TwoCol } from "./Layout";
import { CanvasContextProvider } from "./Context/CanvasContext";
import { readFromLocalStorage } from "../utils";
export default function MainContainer() {
    useEffect(() => {
        // let YOUR_VIDEO_FILES = readFromLocalStorage(
        //     "videoFiles",
        //     yourAudioFiles
        // );
        // let YOUR_AUDIO_FILES = readFromLocalStorage(
        //     "audioFiles",
        //     yourVideoFiles
        // );

        // setYourAudioFiles(YOUR_VIDEO_FILES);
        // setYourVideoFiles(YOUR_AUDIO_FILES);

        //check lists with local storages
        // updateList(videoFilesList, YOUR_VIDEO_FILES, createVideoFileElItem);
        // updateList(audioFilesList, YOUR_AUDIO_FILES, createAudioFileElItem);
        return () => {};
    }, []);

    return (
        <CanvasContextProvider>
            <div className="container">
                {/* 2 columns  */}
                <TwoCol>
                    {/* Canvas */}
                    <Canvas />
                    {/* canvas controls */}
                    <CanvasControls
                    // audioElRef={audioElRef}
                    // audioFileInputRef={audioFileInputRef}
                    />
                </TwoCol>
                <TwoCol>
                    {/* <!-- AUDIO UPLOAD --> */}
                    <AudioUpload
                    // audioFileInputRef={audioFileInputRef}
                    // audioElRef={audioElRef}
                    />
                    {/* <!-- VIDEO UPLOAD --> */}
                    <VideoUpload />
                </TwoCol>

                <div className="columns-1 border border-f00">
                    <button id="makeAllFiles">Make All Files</button>
                </div>
            </div>
        </CanvasContextProvider>
    );
}
