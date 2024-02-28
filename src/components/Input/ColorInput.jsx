import React, { useState } from "react";
import { CompactPicker } from "react-color";
import { Button } from "@/components/ui/button";
import { BasicBtn } from "../Button";

export default function ColorInput({
    label = "label",
    color,
    setColor,
    className,
    disable = false,
}) {
    const [showPicker, setShowPicker] = useState(false);

    const handleClick = () => {
        console.log(showPicker);
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
        <div className="relative">
            <BasicBtn
                disable={disable}
                className={className}
                style={{
                    backgroundColor: color,
                    boxShadow: showPicker ? "1px 1px 10px 1px red" : "none",
                }}
                onClick={handleClick}
                text={label}
                title={label}
            />
            {/* <Button
                className=""
                variant="outline"
                style={{
                    backgroundColor: color,
                    boxShadow: showPicker ? "1px 1px 10px 1px red" : "none",
                }}
                onClick={handleClick}
            >
                {label}
            </Button> */}
            {/* <p>Selected Color: {color}</p> */}

            {showPicker && (
                <div style={{ position: "absolute", right: 0, zIndex: 10 }}>
                    {" "}
                    {/* Position the picker as needed */}
                    <CompactPicker color={color} onChange={handleChange} />
                </div>
            )}
        </div>
    );
}
