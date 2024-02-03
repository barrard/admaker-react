import React, { useContext, useState } from "react";
import { CanvasContext } from "../Context/CanvasContext";
import { BasicBtn } from "../Button";

// Recording setup
let mediaRecorder;
let recordedChunks = [];
export default function canvasControls(props) {
  const { audioElRef } = props;
  const { currentVideoTime, videoDuration, sourceVideoRef } = useContext(CanvasContext) || {};
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const handleTogglePlay = () => {
    if (sourceVideoRef.current) {
      if (isPlaying) {
        sourceVideoRef.current.pause();
        audioElRef.current.pause();
      } else {
        sourceVideoRef.current.play();
        audioElRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleRecord = () => {
    debugger;
    if (!sourceVideoRef.current) {
      alert("need a video");
    } else if (!audioElRef.current) {
      alert("need a audio");
    } else if (mediaRecorder.state === "recording") {
      mediaRecorder.stop();
    } else {
      alert("lets record");
      // Recording setup
      // let mediaRecorder;
      // const recordedChunks = [];
      // const startRecordingButton = document.getElementById("startRecording");
      // const stopRecordingButton = document.getElementById("stopRecording");
      const videoPlayer = sourceVideoRef.current;

      const audioContext = new AudioContext();
      const audioSource = audioContext.createMediaElementSource(audioElRef.current);
      const canvasStream = canvas.captureStream();
      const audioStream = audioSource.connect(audioContext.destination);

      const combinedStream = new MediaStream();
      [canvasStream.getTracks(), audioStream.getAudioTracks()].forEach((tracks) => {
        tracks.forEach((track) => combinedStream.addTrack(track));
      });

      mediaRecorder = new MediaRecorder(combinedStream);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        videoPlayer.src = url;
      };

      mediaRecorder.start();
    }
  };

  return (
    <div className="border border-f00">
      <h2>canvas controls</h2>
      <BasicBtn onClick={handleTogglePlay} text={isPlaying ? "Pause" : "Play"} />
      <BasicBtn onClick={handleRecord} text={isRecording ? "Stop" : "Record"} />

      <p>
        <span id="currentVideoTime">{currentVideoTime}</span> /<span id="videoDuration">{videoDuration}</span>
      </p>

      <audio ref={audioElRef} id="audioElement" controls>
        <source src="" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
