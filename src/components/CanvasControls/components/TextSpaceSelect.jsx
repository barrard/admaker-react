import React, { useState, useContext, useEffect } from "react";
import Select from "../../Input/Select";
import CanvasContext from "../../Context/CanvasContext";
export default function TextSpaceSelect() {
    const { wordSpace, setWordSpace } = useContext(CanvasContext);
    const [value, setValue] = useState(wordSpace);
    const values = { i: "Small", o: "Medium", M: "Large" };

    useEffect(() => {
        setWordSpace(value);
    }, [value]);

    return <Select label={"Word Space"} values={values} value={value} setValue={setValue} />;
}
