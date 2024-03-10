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
        currentPrestSettings,
        fontSize,
        lineHeight,
        presetName,
        setActiveWordColor,
        setBackgroundColor,
        setCurrentPrestSettings,
        setFontSize,
        setLineHeight,
        setPresetName,
        setStrokeColor,
        setTextStrokeThickness,
        setWithActiveWordColor,
        setWithBackground,
        setWithSingleWord,
        setWithTextStroke,
        setWithWordAnimation,
        setWordColor,
        setYOUR_PRESETS,
        strokeColor,
        textStrokeThickness,
        withActiveWordColor,
        withBackground,
        withSingleWord,
        withTextStroke,
        withWordAnimation,
        wordColor,
        YOUR_PRESETS,
        xAxis,
        setXAxis,
        yAxis,
        setYAxis,
        wordSpace,
        setWordSpace,
    } = canvasContext;

    const [hasLoadedFirst, setHasLoadedFirst] = useState(false);
    const { tab, setTab } = props || {};
    const [_presetName, _setPresetName] = useState(currentPrestSettings?.presetName !== undefined ? currentPrestSettings?.presetName : presetName);

    const [_withSingleWord, _setWithSingleWord] = useState(currentPrestSettings?.withSingleWord !== undefined ? currentPrestSettings?.withSingleWord : withSingleWord);

    const [_withActiveWordColor, _setWithActiveWordColor] = useState(
        currentPrestSettings?.withActiveWordColor !== undefined ? currentPrestSettings?.withActiveWordColor : withActiveWordColor
    );
    const [_activeWordColor, _setActiveWordColor] = useState(currentPrestSettings?.activeWordColor !== undefined ? currentPrestSettings?.activeWordColor : activeWordColor);
    const [_textStrokeThickness, _setTextStrokeThickness] = useState(
        currentPrestSettings?.textStrokeThickness !== undefined ? currentPrestSettings?.textStrokeThickness : textStrokeThickness
    );
    const [_wordColor, _setWordColor] = useState(currentPrestSettings?.wordColor !== undefined ? currentPrestSettings?.wordColor : wordColor);

    const [_withTextStroke, _setWithTextStroke] = useState(currentPrestSettings?.withTextStroke !== undefined ? currentPrestSettings?.withTextStroke : withTextStroke);
    const [_strokeColor, _setStrokeColor] = useState(currentPrestSettings?.strokeColor !== undefined ? currentPrestSettings?.strokeColor : strokeColor);
    const [_withBackground, _setWithBackground] = useState(currentPrestSettings?.withBackground !== undefined ? currentPrestSettings?.withBackground : withBackground);
    const [_backgroundColor, _setBackgroundColor] = useState(currentPrestSettings?.backgroundColor !== undefined ? currentPrestSettings?.backgroundColor : backgroundColor);
    const [_withWordAnimation, _setWithWordAnimation] = useState(
        currentPrestSettings?.withWordAnimation !== undefined ? currentPrestSettings?.withWordAnimation : withWordAnimation
    );
    const [_lineHeight, _setLineHeight] = useState(currentPrestSettings?.lineHeight !== undefined ? currentPrestSettings?.lineHeight : lineHeight);

    const [_xAxis, _setXAxis] = useState(currentPrestSettings?.xAxis !== undefined ? currentPrestSettings.xAxis : xAxis);
    const [_yAxis, _setYAxis] = useState(currentPrestSettings?.yAxis !== undefined ? currentPrestSettings.yAxis : yAxis);
    const [_fontSize, _setFontSize] = useState(currentPrestSettings?.fontSize !== undefined ? currentPrestSettings?.fontSize : fontSize);
    const [_wordSpace, _setWordSpace] = useState(currentPrestSettings?.wordSpace !== undefined ? currentPrestSettings?.wordSpace : wordSpace);

    const CURRENT_PRESET_DATA = useRef({
        activeWordColor: _activeWordColor,
        backgroundColor: _backgroundColor,
        fontSize: _fontSize,
        lineHeight: _lineHeight,
        presetName: _presetName,
        strokeColor: _strokeColor,
        textStrokeThickness: _textStrokeThickness,
        withActiveWordColor: _withActiveWordColor,
        withBackground: _withBackground,
        withSingleWord: _withSingleWord,
        withTextStroke: _withTextStroke,
        withWordAnimation: _withWordAnimation,
        wordColor: _wordColor,
        xAxis: _xAxis,
        yAxis: _yAxis,
        wordSpace: _wordSpace,
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
        setActiveWordColor(_activeWordColor);
        setBackgroundColor(_backgroundColor);
        setFontSize(_fontSize);
        setLineHeight(_lineHeight);
        setPresetName(_presetName);
        setStrokeColor(_strokeColor);
        setTextStrokeThickness(_textStrokeThickness);
        setWithActiveWordColor(_withActiveWordColor);
        setWithBackground(_withBackground);
        setWithSingleWord(_withSingleWord);
        setWithTextStroke(_withTextStroke);
        setWithWordAnimation(_withWordAnimation);
        setWordColor(_wordColor);
        setXAxis(_xAxis);
        setYAxis(_yAxis);
        setWordSpace(_wordSpace);

        CURRENT_PRESET_DATA.current = {
            activeWordColor: _activeWordColor,
            backgroundColor: _backgroundColor,
            fontSize: _fontSize,
            lineHeight: _lineHeight,
            presetName: _presetName,
            strokeColor: _strokeColor,
            textStrokeThickness: _textStrokeThickness,
            withActiveWordColor: _withActiveWordColor,
            withBackground: _withBackground,
            withSingleWord: _withSingleWord,
            withTextStroke: _withTextStroke,
            withWordAnimation: _withWordAnimation,
            wordColor: _wordColor,
            xAxis: _xAxis,
            yAxis: _yAxis,
            wordSpace: _wordSpace,
        };

        setToCurrentSettings(CURRENT_PRESET_DATA.current);
    }, [
        _activeWordColor,
        _backgroundColor,
        _fontSize,
        _lineHeight,
        _presetName,
        _strokeColor,
        _textStrokeThickness,
        _withActiveWordColor,
        _withBackground,
        _withSingleWord,
        _withTextStroke,
        _withWordAnimation,
        _wordColor,
        _xAxis,
        _yAxis,
        _wordSpace,
    ]);

    useEffect(() => {
        writeToLocalStorage("presets", YOUR_PRESETS);
    }, [YOUR_PRESETS]);

    const savePreset = () => {
        const _presetData = CURRENT_PRESET_DATA.current;

        YOUR_PRESETS[_presetName] = _presetData;
        setYOUR_PRESETS({ ...YOUR_PRESETS });
        setTab("presets");
    };

    return (
        <div className="border border-f00">
            {/* Prest Name */}
            <div className="form-group">
                <label htmlFor="email-input">Preset Name:</label>
                <Input type="text" placeholder="Enter your email" value={_presetName} onChange={(e) => _setPresetName(e.target.value)} />
            </div>

            {/* X and Y Axis */}
            <TwoCol>
                <div className="form-group">
                    <label className="text-gray-900 font-bold text-base mb-2" htmlFor="x-axis">
                        X-Axis:
                    </label>
                    <Input name="x-axis" type="number" placeholder="X-Axis" value={_xAxis} onChange={(e) => _setXAxis(e.target.value)} />
                </div>
                <div className="form-group">
                    <label className="text-gray-900 font-bold text-base mb-2" htmlFor="y-axis">
                        Y-Axis:
                    </label>
                    <Input name="y-axis" type="number" placeholder="Y-Axis" value={_yAxis} onChange={(e) => _setYAxis(parseInt(e.target.value))} />
                </div>
            </TwoCol>
            <TwoCol>
                <div className="form-group">
                    <label className="text-gray-900 font-bold text-base mb-2" htmlFor="font-size">
                        Font Size:
                    </label>
                    <Input name="font-size" type="number" placeholder={"Font Size"} value={_fontSize} onChange={(e) => _setFontSize(e.target.value)} />
                </div>

                <div className="form-group">
                    <label className="text-gray-900 font-bold text-base mb-2" htmlFor="line-height">
                        LineHeight:
                    </label>
                    <Input name="line-height" type="number" placeholder={"Line Height"} value={_lineHeight} onChange={(e) => _setLineHeight(e.target.value)} />
                </div>
                <TextSpaceSelect wordSpace={_wordSpace} setWordSpace={_setWordSpace} />
            </TwoCol>
            {/* WithWord Animation */}
            <span className="flex border justify-center items-baseline">
                {/* Adjust label text as needed */}
                <Switch className="me-2" name="word-animation" checked={_withWordAnimation} onCheckedChange={() => _setWithWordAnimation(!_withWordAnimation)} />
                <label onClick={() => _setWithWordAnimation(!_withWordAnimation)} className="text-gray-900 font-bold text-base mb-2" htmlFor="word-animation">
                    {_withWordAnimation ? "Word Animation" : "Word Static"}
                </label>
            </span>
            {/* <br /> */}
            {/* Single Word or Whole Sentence */}
            <span className="flex border justify-center items-baseline">
                <Switch className="me-2" checked={_withSingleWord} onCheckedChange={() => _setWithSingleWord(!_withSingleWord)} />
                <label onClick={() => _setWithSingleWord(!_withSingleWord)} className="text-gray-900 font-bold text-base mb-2" htmlFor="word-animation">
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

            {_withTextStroke && <NumberSlider number={_textStrokeThickness} setNumber={_setTextStrokeThickness} label="Text Stroke Thickness" />}

            <BasicBtn onClick={savePreset} text="Save Preset" />
        </div>
    );
}
