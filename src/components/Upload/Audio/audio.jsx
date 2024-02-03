import React from "react";
import { BasicBtn } from "../../Button";
import { AudioInput } from "../../Input";
export default function Audio(props) {
  const { previewAudio, setPreviewAudio, audioElRef } = props;

  console.log(audioElRef);

  return (
    <div>
      <h1>Audio Upload</h1>

      <AudioInput
        onChange={function (e) {
          // Get the selected file
          const selectedFile = event.target.files[0];

          if (selectedFile) {
            // Create a FileReader to read the file
            const reader = new FileReader();

            // Set up the FileReader onload event
            reader.onload = function (e) {
              // Set the audio element's source with the file data
              audioElRef.current.src = e.target.result;
            };

            // Read the file as a data URL
            reader.readAsDataURL(selectedFile);
          }
          setPreviewAudio(media);
        }}
      />

      <br />
      <BasicBtn id="uploadAudioButton" text="Upload Audio Files" />

      <br />
      <BasicBtn id="clearAudioFilesList" text="Clear Audio Files" />

      <div id="audioFilesList"></div>
    </div>
  );
}
