import React, { useState, useEffect, useRef, useContext } from "react";
import CanvasContext from "../Context/CanvasContext";
import TimerContext from "../Context/TimerContext";
import wordBreakDown from "./canvasFns/wordBreakDown";

export default function Canvas(props) {
    const { currentVideoTime } = useContext(TimerContext) || {};
    const context = useContext(CanvasContext) || {};
    const {
        audioElRef,
        canvasCtx,
        currentPrestSettings,
        fontFamily,
        isPlaying,
        loadedMetaData,
        loadedVideo,
        previewVideo,
        setCanvasCtx,
        setCurrentPrestSettings,
        setFontFamily,
        setFontSize,
        setLoadedMetaData,
        setLoadedVideo,
        setTextDecoration,
        setTextStrokeThickness,
        sourceVideoRef,
        isRecording,
        textDecoration,
        videoDuration,
        wordsData,
        wordSpace,
        yAxis,
    } = context;
    const {
        wordColor,
        presetName,
        fontSize,
        textStrokeThickness,
        withTextStroke,
        strokeColor,
        withBackground,
        backgroundColor,
        withSingleWord,
        withWordAnimation,
        withActiveWordColor,
        activeWordColor,
        lineHeight,
    } = currentPrestSettings || {};
    // const [loadedVideo, setLoadedVideo] = useState(false);
    // const [loadedMetaData, setLoadedMetaData] = useState(false);
    console.log("Canvas");

    const outputCanvasRef = useRef();

    useEffect(() => {
        if (outputCanvasRef.current && !canvasCtx) {
            const ctx = outputCanvasRef.current.getContext("2d");
            ctx.imageSmoothingEnabled = true;
            setCanvasCtx(ctx);
        }
    }, [outputCanvasRef.current, canvasCtx]);

    useEffect(() => {
        const ctx = outputCanvasRef.current.getContext("2d");
        ctx.font = `${textDecoration} ${fontSize}px ${fontFamily}`;
        setCanvasCtx(ctx);
    }, [fontSize, wordSpace, fontFamily, textDecoration]);

    useEffect(() => {
        if (loadedVideo && outputCanvasRef.current && canvasCtx && loadedMetaData && sourceVideoRef.current && wordsData?.segments && audioElRef?.current) {
            const canvas = outputCanvasRef.current;
            canvas.width = sourceVideoRef.current.videoWidth * 1;
            canvas.height = sourceVideoRef.current.videoHeight * 1;
            // console.log(canvas.width, canvas.height);
            console.log("CALLED ONCE");
            const wordSegments = wordBreakDown(wordsData.segments, canvasCtx, context);

            drawVideo(wordSegments);

            function drawVideo(wordSegments) {
                if (sourceVideoRef.current.paused) {
                    canvasCtx.drawImage(sourceVideoRef.current, 0, 0, canvas.width, canvas.height);
                    drawText(wordSegments, sourceVideoRef);
                    return;
                }
                if (sourceVideoRef.current.ended) {
                    return;
                }
                canvasCtx.drawImage(sourceVideoRef.current, 0, 0, canvas.width, canvas.height);
                drawText(wordSegments, sourceVideoRef);
                requestAnimationFrame(() => drawVideo(wordSegments));
            }
            // EaseInOutCubic function for smooth animation
            function easeInOutCubic(t) {
                return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
            }

            function drawRoundedRect(x, y, width, height, radius) {
                canvasCtx.beginPath();
                canvasCtx.moveTo(x, y + radius);
                canvasCtx.lineTo(x, y + height - radius);
                canvasCtx.arcTo(x, y + height, x + radius, y + height, radius);
                canvasCtx.lineTo(x + width - radius, y + height);
                canvasCtx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
                canvasCtx.lineTo(x + width, y + radius);
                canvasCtx.arcTo(x + width, y, x + width - radius, y, radius);
                canvasCtx.lineTo(x + radius, y);
                canvasCtx.arcTo(x, y, x, y + radius, radius);
                canvasCtx.closePath();
            }
            function drawText(_wordsData, sourceVideoRef) {
                if (!_wordsData) return;
                const currentWords = _wordsData.filter((wd) => {
                    return wd.sentenceEnd > (parseFloat(sourceVideoRef.current.currentTime) || 0) && wd.sentenceStart < (parseFloat(sourceVideoRef.current.currentTime) || 0);
                });

                // Set font properties
                canvasCtx.textBaseline = "top"; // Align text from the...
                canvasCtx.fillStyle = wordColor;

                // Loop through each word and draw it with the appropriate color
                currentWords.forEach((wordData, index) => {
                    // Calculate the position for drawing each word
                    let { x, y, wordWidth, fontHeight, wordWidthSpace } = wordData;
                    if (sourceVideoRef.current.currentTime > wordData.start && sourceVideoRef.current.currentTime < wordData.end) {
                        // Animation calculations
                        let animProgress = (sourceVideoRef.current.currentTime - wordData.start) / (wordData.nextWordStart || wordData.end - wordData.start);
                        animProgress = Math.min(animProgress, 1); // Clamp to 0-1

                        // Modified scaling for a grow-and-shrink effect
                        let scale = 1 + 0.2 * Math.sin(animProgress * Math.PI);

                        // Apply text animation with true center-origin scaling
                        canvasCtx.save();

                        // Translate to the word's center
                        canvasCtx.translate(x + wordWidth / 2, y + fontHeight / 2);

                        if (withWordAnimation) {
                            // Apply the scaling
                            canvasCtx.scale(scale, scale);
                        }

                        // Draw a colored background rectangle
                        if (withBackground) {
                            canvasCtx.fillStyle = backgroundColor; // Or use your desired color
                            // Draw rounded rectangle background
                            const padding = 4; // Adjust as needed
                            const cornerRadius = 5; // Adjust for the desired roundness
                            // Styling for outline (black border)
                            canvasCtx.lineWidth = textStrokeThickness;
                            canvasCtx.strokeStyle = strokeColor;

                            drawRoundedRect(
                                -wordWidth / 2 - (padding + canvasCtx.lineWidth / 2),
                                -fontHeight / 2 - padding - fontHeight * 0.2,
                                wordWidth + (padding * 2 + canvasCtx.lineWidth),
                                fontHeight + 2 * padding,
                                cornerRadius
                            );
                            canvasCtx.fill();
                        }

                        canvasCtx.lineJoin = "round";

                        if (textStrokeThickness && withTextStroke) {
                            canvasCtx.strokeText(wordData.word, -wordWidth / 2, -fontHeight / 2);
                        }

                        // Set red color for the word "Text"
                        canvasCtx.fillStyle = withActiveWordColor ? activeWordColor : wordColor;
                        // Draw text (adjust as needed, depending on your textBaseline settings)
                        canvasCtx.fillText(wordData.word, -wordWidth / 2, -fontHeight / 2);

                        canvasCtx.restore();
                    } else if ((sourceVideoRef.current.currentTime > wordData.start && sourceVideoRef.current.currentTime > wordData.end) || !withSingleWord) {
                        // Set red color for the word "Text"
                        canvasCtx.fillStyle = wordColor;

                        if (textStrokeThickness && withTextStroke) {
                            // Styling for outline (black border)
                            canvasCtx.lineWidth = textStrokeThickness; // Adjust border thickness as desired
                            canvasCtx.strokeStyle = strokeColor;
                            canvasCtx.lineJoin = "round";
                            canvasCtx.strokeText(wordData.word, x, y);
                        }

                        canvasCtx.fillText(wordData.word, x, y);
                    } else {
                        // Set white color for other words
                        canvasCtx.fillStyle = "transparent";
                    }
                });
            }
        }
    }, [
        loadedVideo,
        loadedMetaData,
        outputCanvasRef?.current,
        canvasCtx,
        sourceVideoRef?.current,
        sourceVideoRef?.current?.ended,
        sourceVideoRef?.current?.paused,
        wordColor,
        backgroundColor,
        activeWordColor,
        strokeColor,
        yAxis,
        textStrokeThickness,
        setTextStrokeThickness,
        withTextStroke,
        withBackground,
        withSingleWord,
        withActiveWordColor,
        wordSpace,
        withWordAnimation,
        fontSize,
        textDecoration,
        fontFamily,
        lineHeight,
        /////
        currentPrestSettings,
        wordsData?.segments,
        audioElRef?.current,
        context,
    ]);

    return (
        <div className="border border-f00">
            <canvas ref={outputCanvasRef} id="outputCanvas"></canvas>
        </div>
    );
}
