import React, { useContext, useState, useEffect } from "react";
import { BasicBtn } from "../../../Button";
// import { TextInput } from "../../Input";
import CanvasContext from "../../../Context/CanvasContext";
import PresetCardItem from "./components/PresetCardItem";
import { writeToLocalStorage } from "../../../../utils";
export default function TextPresets(props) {
    const { setTab, tab } = props;
    const { selectedPreset, setSelectedPreset, YOUR_PRESETS, setYOUR_PRESETS } = useContext(CanvasContext);

    const clearPresets = () => {
        setYOUR_PRESETS({});
    };

    useEffect(() => {
        writeToLocalStorage("presets", YOUR_PRESETS);
    }, [YOUR_PRESETS]);

    return (
        <div>
            <h1>Text Upload</h1>

            <br />
            <BasicBtn id="clearTextFilesList" text="Clear video Files" onClick={clearPresets} />
            {/* Display Previews */}
            {Object.keys(YOUR_PRESETS).length > 0 && (
                <div>
                    <div className="flex flex-wrap justify-around py-4" id="videoFilesList">
                        {Object.keys(YOUR_PRESETS).map((presetName) => (
                            <React.Fragment key={presetName}>
                                <PresetCardItem presetName={presetName} preset={YOUR_PRESETS[presetName]} setTab={setTab} tab={tab} />
                            </React.Fragment>
                            // <video
                            //     className="w-28 m-2"
                            //     src={url}
                            //     key={index}
                            //     width="75"
                            //     controls
                            // />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
