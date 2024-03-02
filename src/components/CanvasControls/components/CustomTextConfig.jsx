import React, { useState, useEffect, useContext, useRef } from "react";
import { Input } from "@/components/ui/input";
import TwoCol from "../../Layout/TwoCol";
import { Switch } from "@/components/ui/switch";
import ColorInput from "../../Input/ColorInput";
import NumberSlider from "../../Input/NumberSlider";
import CanvasContext from "../../Context/CanvasContext";
import TextSpaceSelect from "./TextSpaceSelect";
import { BasicBtn } from "../../Button";
import { readFromLocalStorage, writeToLocalStorage } from "../../../utils";

export default function CustomTextConfig(props) {
    const canvasContext = useContext(CanvasContext);
    const {
        activeWordColor,
        backgroundColor,
        blobUrl,
        setActiveWordColor,
        setBackgroundColor,
        setStrokeColor,
        setTextStrokeThickness,
        setWithActiveWordColor,
        setWithBackground,
        setWithSingleWord,
        setWithTextStroke,
        setWithWordAnimation,
        strokeColor,
        textStrokeThickness,
        withActiveWordColor,
        withBackground,
        withSingleWord,
        setWordColor,
        withTextStroke,
        withWordAnimation,
        wordColor,
        fontSize,
        setFontSize,
        lineHeight,
        setLineHeight,
        YOUR_PRESETS,
        setYOUR_PRESETS,
        currentPrestSettings,
        setCurrentPrestSettings,
        presetName,
        setPresetName,
    } = canvasContext;
    const [hasLoadedFirst, setHasLoadedFirst] = useState(false);
    const { tab, setTab } = props || {};
    const [_presetName, _setPresetName] = useState(currentPrestSettings?.presetName || presetName);

    const [_withSingleWord, _setWithSingleWord] = useState(currentPrestSettings?.withSingleWord || withSingleWord);

    const [_withActiveWordColor, _setWithActiveWordColor] = useState(currentPrestSettings?.withActiveWordColor || withActiveWordColor);
    const [_activeWordColor, _setActiveWordColor] = useState(currentPrestSettings?.activeWordColor || activeWordColor);
    const [_textStrokeThickness, _setTextStrokeThickness] = useState(currentPrestSettings?.textStrokeThickness || textStrokeThickness);
    const [_wordColor, _setWordColor] = useState(currentPrestSettings?.wordColor || wordColor);

    const [_withTextStroke, _setWithTextStroke] = useState(currentPrestSettings?.withTextStroke || withTextStroke);
    const [_strokeColor, _setStrokeColor] = useState(currentPrestSettings?.strokeColor || strokeColor);
    const [_withBackground, _setWithBackground] = useState(currentPrestSettings?.withBackground || withBackground);
    const [_backgroundColor, _setBackgroundColor] = useState(currentPrestSettings?.backgroundColor || backgroundColor);
    const [_withWordAnimation, _setWithWordAnimation] = useState(currentPrestSettings?.withWordAnimation || withWordAnimation);
    const [_lineHeight, _setLineHeight] = useState(currentPrestSettings?.lineHeight || lineHeight);

    const [xAxis, setXAxis] = useState("50");
    const [yAxis, setYAxis] = useState("50");
    const [_fontSize, _setFontSize] = useState(currentPrestSettings?.fontSize || fontSize);
    // const SETTERS = {
    //     setPresetName: _setPresetName,
    //     setWithSingleWord: _setWithSingleWord,
    //     setWithActiveWordColor: _setWithActiveWordColor,
    //     setActiveWordColor: _setActiveWordColor,
    //     setTextStrokeThickness: _setTextStrokeThickness,
    //     setWithTextStroke: _setWithTextStroke,
    //     setStrokeColor: _setStrokeColor,
    //     setWithBackground: _setWithBackground,
    //     setBackgroundColor: _setBackgroundColor,
    //     setWithWordAnimation: _setWithWordAnimation,
    //     setLineHeight: _setLineHeight,
    //     setFontSize: _setFontSize,
    //     wordColor: _setWordColor,
    // };
    const CURRENT_PRESET_DATA = useRef({
        wordColor: _wordColor,
        presetName: _presetName,
        fontSize: _fontSize,
        textStrokeThickness: _textStrokeThickness,
        withTextStroke: _withTextStroke,
        strokeColor: _strokeColor,
        withBackground: _withBackground,
        backgroundColor: _backgroundColor,
        withSingleWord: _withSingleWord,
        withWordAnimation: _withWordAnimation,
        withActiveWordColor: _withActiveWordColor,
        activeWordColor: _activeWordColor,
        lineHeight: _lineHeight,
    });

    function setToCurrentSettings(_CURRENT_PRESET_DATA) {
        if (!_CURRENT_PRESET_DATA) return;
        Object.keys(_CURRENT_PRESET_DATA).forEach((settingName) => {
            if (_CURRENT_PRESET_DATA[settingName]) {
                canvasContext[`set${settingName[0].toUpperCase() + settingName.slice(1)}`](_CURRENT_PRESET_DATA[settingName]);
            }
        });
        setCurrentPrestSettings(_CURRENT_PRESET_DATA);
    }
    useEffect(() => {
        // const CURRENT_PRESET_DATA = readFromLocalStorage("currentPresetSettings");
        setToCurrentSettings(CURRENT_PRESET_DATA.current);
        const YOUR_PRESETS = readFromLocalStorage("presets");
        console.log({ YOUR_PRESETS });
        setYOUR_PRESETS(YOUR_PRESETS);
        setHasLoadedFirst(true);
        return () => {
            debugger;
            //save current settings
            setToCurrentSettings(CURRENT_PRESET_DATA.current);

            // setCurrentPrestSettings(CURRENT_PRESET_DATA);
            // writeToLocalStorage("currentPresetSettings", CURRENT_PRESET_DATA);
        };
    }, []);

    useEffect(() => {
        if (!hasLoadedFirst) {
            console.log("Not loaded here yet");
        } else {
            console.log("YES WE HAVE loaded here");
        }
    }, [hasLoadedFirst]);

    useEffect(() => {
        if (!hasLoadedFirst) return console.log("Has not loaded");
        setTextStrokeThickness(_textStrokeThickness);
        setWithTextStroke(_withTextStroke);
        setStrokeColor(_strokeColor);
        setWithBackground(_withBackground);
        setBackgroundColor(_backgroundColor);
        setWithSingleWord(_withSingleWord);
        setWithWordAnimation(_withWordAnimation);
        setWithActiveWordColor(_withActiveWordColor);
        setActiveWordColor(_activeWordColor);
        setFontSize(_fontSize);
        setLineHeight(_lineHeight);
        setWordColor(_wordColor);
        setPresetName(_presetName);

        CURRENT_PRESET_DATA.current = {
            presetName: _presetName,
            fontSize: _fontSize,
            textStrokeThickness: _textStrokeThickness,
            withTextStroke: _withTextStroke,
            strokeColor: _strokeColor,
            withBackground: _withBackground,
            backgroundColor: _backgroundColor,
            withSingleWord: _withSingleWord,
            withWordAnimation: _withWordAnimation,
            withActiveWordColor: _withActiveWordColor,
            activeWordColor: _activeWordColor,
            lineHeight: _lineHeight,
            wordColor: _wordColor,
        };

        setToCurrentSettings(CURRENT_PRESET_DATA.current);
    }, [
        _fontSize,
        _textStrokeThickness,
        _withTextStroke,
        _strokeColor,
        _withBackground,
        _backgroundColor,
        _withSingleWord,
        _withWordAnimation,
        _withActiveWordColor,
        _activeWordColor,
        _lineHeight,
        _wordColor,
        _presetName,
    ]);

    useEffect(() => {
        writeToLocalStorage("presets", YOUR_PRESETS);
    }, [YOUR_PRESETS]);

    const savePreset = () => {
        debugger;
        const presetData = CURRENT_PRESET_DATA.current;

        YOUR_PRESETS[_presetName] = presetData;

        setYOUR_PRESETS({ ...YOUR_PRESETS });
        setTab("presets");
    };

    return (
        <div className="border border-f00">
            {/* Prest Name */}
            <div class="form-group">
                <label for="email-input">Preset Name:</label>
                <Input type="text" placeholder="Enter your email" value={_presetName} onChange={(e) => _setPresetName(e.target.value)} />
            </div>

            {/* X and Y Axis */}
            <TwoCol>
                <div class="form-group">
                    <label className="text-gray-900 font-bold text-base mb-2" for="x-axis">
                        X-Axis:
                    </label>
                    <Input name="x-axis" type="number" placeholder="X-Axis" value={xAxis} onChange={(e) => setXAxis(e.target.value)} />
                </div>
                <div class="form-group">
                    <label className="text-gray-900 font-bold text-base mb-2" for="y-axis">
                        Y-Axis:
                    </label>
                    <Input name="y-axis" type="number" placeholder="Y-Axis" value={yAxis} onChange={(e) => setYAxis(e.target.value)} />
                </div>
            </TwoCol>
            <TwoCol>
                <div class="form-group">
                    <label className="text-gray-900 font-bold text-base mb-2" for="font-size">
                        Font Size:
                    </label>
                    <Input name="font-size" type="number" placeholder={"Font Size"} value={_fontSize} onChange={(e) => _setFontSize(e.target.value)} />
                </div>

                <div class="form-group">
                    <label className="text-gray-900 font-bold text-base mb-2" for="line-height">
                        LineHeight:
                    </label>
                    <Input name="line-height" type="number" placeholder={"Line Height"} value={_lineHeight} onChange={(e) => _setLineHeight(e.target.value)} />
                </div>
                <TextSpaceSelect />
            </TwoCol>
            {/* WithWord Animation */}
            <span className="flex border justify-center items-baseline">
                {/* Adjust label text as needed */}
                <Switch className="me-2" name="word-animation" checked={_withWordAnimation} onCheckedChange={() => _setWithWordAnimation(!_withWordAnimation)} />
                <label onClick={() => _setWithWordAnimation(!_withWordAnimation)} className="text-gray-900 font-bold text-base mb-2" for="word-animation">
                    {_withWordAnimation ? "Word Animation" : "Word Static"}
                </label>
            </span>
            {/* <br /> */}
            {/* Single Word or Whole Sentence */}
            <span className="flex border justify-center items-baseline">
                <Switch className="me-2" checked={_withSingleWord} onCheckedChange={() => _setWithSingleWord(!_withSingleWord)} />
                <label onClick={() => _setWithSingleWord(!_withSingleWord)} className="text-gray-900 font-bold text-base mb-2" for="word-animation">
                    {/* Adjust label text as needed */}
                    {_withSingleWord ? "Single Word" : "Whole Sentence"}
                </label>
            </span>

            {/* //WORD COLOR */}
            <ColorInput label="Word Color" color={_wordColor} setColor={_setWordColor} />
            {/* ACTIVE WORD COLOR */}
            <div className={`${_withActiveWordColor ? "" : ""} flex justify-center items-center`}>
                <Switch checked={_withActiveWordColor} onCheckedChange={() => _setWithActiveWordColor(!_withActiveWordColor)} />
                <ColorInput
                    className={`${!_withActiveWordColor ? "opacity-50 cursor-not-allowed" : ""} `}
                    label="Active Word Color"
                    color={_activeWordColor}
                    setColor={_setActiveWordColor}
                    disable={!_withActiveWordColor}
                />
            </div>
            {/* BAckgroundColor */}
            <div className="flex justify-center items-center">
                <Switch checked={_withBackground} onCheckedChange={() => _setWithBackground(!_withBackground)} />

                <ColorInput
                    className={`${!_withBackground ? "opacity-50 cursor-not-allowed" : ""} `}
                    disable={!_withBackground}
                    label="Background Color"
                    color={_backgroundColor}
                    setColor={_setBackgroundColor}
                />
            </div>
            {/* Color Stroke */}
            <div className="flex justify-center items-center">
                <Switch checked={_withTextStroke} onCheckedChange={() => _setWithTextStroke(!_withTextStroke)} />
                <ColorInput
                    disable={!_withTextStroke}
                    className={`${!_withTextStroke ? "opacity-50 cursor-not-allowed" : ""} `}
                    label="Stroke Color"
                    color={_strokeColor}
                    setColor={_setStrokeColor}
                />
            </div>

            {withTextStroke && <NumberSlider number={textStrokeThickness} setNumber={_setTextStrokeThickness} label="Text Stroke Thickness" />}

            <BasicBtn onClick={savePreset} text="Save Preset" />

            {/* //TODO MOVE THESE */}
            {blobUrl && (
                <a href={blobUrl} download={"recorded_video.webm"}>
                    DOWNLOAD
                </a>
            )}
        </div>
    );
}
