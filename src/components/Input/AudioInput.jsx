import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const LoadingSpinner = ({ className = "" }) => (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("animate-spin", className)}
        >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
    </div>
);

export default function AudioInput(props) {
    const { onChange, audioFileInputRef, isLoading } = props;

    return (
        // <label for="audioFile">Choose an audio file:</label>
        // <input type="file" id="audioFiles" name="audioFiles[]" multiple accept="audio/*" />

        <div className="grid w-full max-w-sm items-center gap-1.5 relative">
            <Label htmlFor="videoFile">Choose an audio file:</Label>
            <Input disabled={isLoading} ref={audioFileInputRef} onChange={onChange} type="file" id="audioFiles" name="audioFiles[]" multiple accept="audio/*" />
            {isLoading && <LoadingSpinner />}
        </div>
    );
}
