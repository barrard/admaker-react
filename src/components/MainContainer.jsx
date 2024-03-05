import React, { useState, useContext, useRef, useEffect } from "react";
import Canvas from "./Canvas";
import CanvasControls from "./CanvasControls";
import { AudioUpload, VideoUpload } from "./Upload";
import { TwoCol } from "./Layout";
import CanvasContextProvider from "./Context/CanvasContextProvider";

export default function MainContainer() {
    return (
        <CanvasContextProvider>
            <div className="container">
                {/* 2 columns  */}
                <TwoCol>
                    {/* Canvas element*/}
                    <Canvas />
                    {/* canvas controls */}
                    <CanvasControls />
                </TwoCol>
                <TwoCol>
                    {/* <!-- AUDIO UPLOAD --> */}
                    <AudioUpload />
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
