import React, { useState } from "react";
import { CompactPicker } from "react-color";
import { Button } from "@/components/ui/button";

export default function ColorInput({ label = "label", color, setColor }) {
    const [showPicker, setShowPicker] = useState(false);

    const handleClick = () => {
        setShowPicker(!showPicker);
    };

    const handleClose = () => {
        setShowPicker(false);
    };

    const handleChange = (newColor) => {
        setColor(newColor.hex);
        handleClose();
    };
    return (
        <div>
            <Button
                variant="outline"
                style={{
                    backgroundColor: color,
                    boxShadow: showPicker ? "1px 1px 10px 1px red" : "none",
                }}
                onClick={handleClick}
            >
                {label}
            </Button>
            {/* <p>Selected Color: {color}</p> */}

            {showPicker && (
                <div style={{ position: "absolute" }}>
                    {" "}
                    {/* Position the picker as needed */}
                    <CompactPicker color={color} onChange={handleChange} />
                </div>
            )}
        </div>
    );
}
