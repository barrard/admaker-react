import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function VideoInput(props) {
    const { onChange } = props;
    return (
        // <label htmlFor="videoFile">Choose an video file:</label>
        // <input type="file" id="videoFiles" name="videoFiles[]" multiple accept="video/*" />

        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="videoFile">Choose an video file:</Label>
            <Input onChange={onChange} type="file" id="videoFiles" name="videoFiles[]" multiple accept="video/*" />
        </div>
    );
}
