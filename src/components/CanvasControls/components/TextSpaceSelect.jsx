import React, { useState, useContext, useEffect } from "react";
import Select from "../../Input/Select";
import CanvasContext from "../../Context/CanvasContext";
export default function TextSpaceSelect(props) {
    const { wordSpace, setWordSpace } = props; //useContext(CanvasContext);
    const [value, setValue] = useState(wordSpace);
    const values = { Small: 5, Medium: 10, Large: 20 };

    useEffect(() => {
        setWordSpace(value);
    }, [value]);

    return <Select label={"Word Space"} values={values} value={value} setValue={setValue} />;
}
