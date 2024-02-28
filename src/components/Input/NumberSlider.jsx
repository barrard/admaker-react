import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";

export default function NumberSlider({
    number = 1,
    setNumber,
    min = 0,
    max = 10,
    label = "NumberSlider",
}) {
    const [value, setValue] = useState(number); // Initial single value

    const handleChange = (newValue) => {
        console.log(newValue);
        setNumber(newValue[0]);
        setValue(newValue[0]); // Sync and update
    };
    return (
        <>
            <div className="title">{label + `(${value})`}</div>

            <Slider
                min={min}
                max={max}
                value={[value]}
                onValueChange={handleChange}
                step={1}
            />
        </>
    );
}
