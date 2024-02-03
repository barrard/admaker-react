import React from "react";
import { BasicBtn } from "../../Button";
import { VideoInput } from "../../Input";
export default function Video(props) {
  const { selectedVideo, setSelectedVideo } = props;
  return (
    <div>
      <h1>Video Upload</h1>
      {/* <label for="videoFile">Choose an audio file:</label>
      <input type="file" id="videoFiles" name="videoFiles[]" multiple accept="video/*" /> */}
      <VideoInput
        onChange={function (e) {
          var media = URL.createObjectURL(e.target.files[0]);
          setSelectedVideo(media);
        }}
      />
      <br />
      <BasicBtn id="uploadVideoButton" text="Upload Video Files" />

      <br />
      <BasicBtn id="clearVideoFilesList" text="Clear video Files" />

      <div id="videoFilesList"></div>
    </div>
  );
}
