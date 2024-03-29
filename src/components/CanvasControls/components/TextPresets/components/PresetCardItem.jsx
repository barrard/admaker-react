import React, { useState, useContext, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Trash2, Upload, Settings2 } from "lucide-react";
import { BasicBtn } from "../../../../Button";
import CanvasContext from "../../../../Context/CanvasContext";
import { writeToLocalStorage } from "../../../../../utils";

export default function PresetCardItem({ preset = {}, presetName = "presetName", setTab, tab }) {
    const canvasContext = useContext(CanvasContext);
    const { YOUR_PRESETS, setYOUR_PRESETS, currentPrestSettings, setCurrentPrestSettings } = canvasContext;
    const [enabledText, setEnabledText] = useState(preset.isActiveTextPreset);

    function removePreset(presetName) {
        console.log("Remove  " + presetName);
        delete YOUR_PRESETS[presetName];
        debugger;
        setYOUR_PRESETS({ ...YOUR_PRESETS });
    }

    function setAsCurrentPreset(presetName) {
        debugger;
        const _preset = YOUR_PRESETS[presetName];
        if (!_preset) return;
        // Object.keys(preset).forEach((settingName) => {
        //     if (preset[settingName]) {
        //         canvasContext[`set${settingName[0].toUpperCase() + settingName.slice(1)}`](preset[settingName]);
        //     }
        // });
        setCurrentPrestSettings(_preset);
        // writeToLocalStorage("currentPresetSettings", preset);
    }

    function editPreset(preset) {
        setAsCurrentPreset(preset);
        setTab("custom");
    }

    useEffect(() => {
        setYOUR_PRESETS((presets) => {
            presets[presetName].isActiveTextPreset = enabledText;
            return { ...presets };
        });
    }, [enabledText]);
    return (
        <Card className="border border-green-500 relative">
            <Switch className="top-1 right-1 absolute" checked={enabledText} onCheckedChange={() => setEnabledText(!enabledText)} />
            <CardHeader className={"border border-red-300 p-1 cursor-pointer"} onClick={() => setAsCurrentPreset(presetName)}>
                <CardTitle className="text-sm font-semibold">{presetName}</CardTitle>

                {/* <CardDescription className="overflow-hidden">                  
                </CardDescription> */}
            </CardHeader>
            <CardFooter className={"border border-blue-300 p-1"}>
                <BasicBtn onClick={() => removePreset(presetName)} text={<Trash2 className="text-red-500" size={18} />} title="Delete" />
                <BasicBtn onClick={() => editPreset(presetName)} text={<Settings2 className="text-blue-500" size={18} />} title="Edit" />
            </CardFooter>
        </Card>
    );
}
