import React, { useState, useContext, useRef, useEffect } from "react";
import Canvas from "./Canvas";
import CanvasControls from "./CanvasControls";
import { AudioUpload, VideoUpload } from "./Upload";
import { TwoCol } from "./Layout";
import CanvasContextProvider from "./Context/CanvasContextProvider";
import TimerContextProvider from "./Context/TimerContextProvider";

export default function MainContainer() {
    return (
        <CanvasContextProvider>
            <div className="container">
                {/* 2 columns  */}
                <TwoCol>
                    {/* <!-- AUDIO UPLOAD --> */}
                    <AudioUpload />
                    {/* <!-- VIDEO UPLOAD --> */}
                    <VideoUpload />
                </TwoCol>

                <TwoCol>
                    {/* Canvas element*/}
                    <Canvas />
                    {/* canvas controls */}
                    {/* <TimerContextProvider> */}
                    <CanvasControls />
                    {/* </TimerContextProvider> */}
                </TwoCol>
            </div>
        </CanvasContextProvider>
    );
}
