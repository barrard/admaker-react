import React, { useState, useContext, useRef } from "react";
import Canvas from "./Canvas";
import CanvasControls from "./CanvasControls";
import { AudioUpload, VideoUpload } from "./Upload";
import { TwoCol } from "./Layout";
import { CanvasContextProvider } from "./Context/CanvasContext";
export default function MainContainer() {
  const [previewVideo, setPreviewVideo] = useState(null);

  const [previewAudio, setPreviewAudio] = useState(null);
  const audioElRef = useRef();
  return (
    <div className="container">
      {/* 2 columns  */}
      <TwoCol>
        {/* Canvas */}
        <CanvasContextProvider>
          <Canvas video={previewVideo} />
          {/* canvas controls */}
          <CanvasControls audioElRef={audioElRef} />
        </CanvasContextProvider>
      </TwoCol>
      <TwoCol>
        {/* <!-- AUDIO UPLOAD --> */}
        <AudioUpload audioElRef={audioElRef} selectedAudio={previewAudio} setSelectedAudio={setPreviewAudio} />
        {/* <!-- VIDEO UPLOAD --> */}
        <VideoUpload selectedVideo={previewVideo} setSelectedVideo={setPreviewVideo} />
      </TwoCol>

      <div className="columns-1 border border-f00">
        <button id="makeAllFiles">Make All Files</button>
      </div>
    </div>
  );
}
