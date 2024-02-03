import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AudioInput(props) {
  const { onChange } = props;

  return (
    // <label for="audioFile">Choose an audio file:</label>
    // <input type="file" id="audioFiles" name="audioFiles[]" multiple accept="audio/*" />

    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="videoFile">Choose an audio file:</Label>
      <Input onChange={onChange} type="file" id="audioFiles" name="audioFiles[]" multiple accept="audio/*" />
    </div>
  );
}
