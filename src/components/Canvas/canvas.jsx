import React, { useState, useEffect, useRef, useContext } from "react";
import CanvasContext from "../Context/CanvasContext";
import wordBreakDown from "./canvasFns/wordBreakDown";

const wordsData = {
    text: " Food manufacturing workers are needed. No experience is required. Listen to music while you work. Full time or part time. Find local positions here.",
    segments: [
        {
            id: 0,
            seek: 0,
            start: 0.0,
            end: 3.8,
            text: " Food manufacturing workers are needed. No experience is required.",
            tokens: [50364, 11675, 11096, 5600, 366, 2978, 13, 883, 1752, 307, 4739, 13, 50564],
            temperature: 0.0,
            avg_logprob: -0.21428402732400334,
            compression_ratio: 1.2869565217391303,
            no_speech_prob: 0.0022354284301400185,
            words: [
                {
                    word: " Food",
                    start: 0.0,
                    end: 0.46,
                    probability: 0.9250689744949341,
                },
                {
                    word: " manufacturing",
                    start: 0.46,
                    end: 0.98,
                    probability: 0.9233144521713257,
                },
                {
                    word: " workers",
                    start: 0.98,
                    end: 1.4,
                    probability: 0.9884375929832458,
                },
                {
                    word: " are",
                    start: 1.4,
                    end: 1.7,
                    probability: 0.9968340992927551,
                },
                {
                    word: " needed.",
                    start: 1.7,
                    end: 2.0,
                    probability: 0.9912281036376953,
                },
                {
                    word: " No",
                    start: 2.44,
                    end: 2.62,
                    probability: 0.9830584526062012,
                },
                {
                    word: " experience",
                    start: 2.62,
                    end: 3.08,
                    probability: 0.9937577247619629,
                },
                {
                    word: " is",
                    start: 3.08,
                    end: 3.36,
                    probability: 0.9924800395965576,
                },
                {
                    word: " required.",
                    start: 3.36,
                    end: 3.8,
                    probability: 0.9992625117301941,
                },
            ],
        },
        {
            id: 1,
            seek: 0,
            start: 4.38,
            end: 9.2,
            text: " Listen to music while you work. Full time or part time. Find local positions here.",
            tokens: [50564, 7501, 281, 1318, 1339, 291, 589, 13, 13841, 565, 420, 644, 565, 13, 11809, 2654, 8432, 510, 13, 50864],
            temperature: 0.0,
            avg_logprob: -0.21428402732400334,
            compression_ratio: 1.2869565217391303,
            no_speech_prob: 0.0022354284301400185,
            words: [
                {
                    word: " Listen",
                    start: 4.38,
                    end: 4.56,
                    probability: 0.968858003616333,
                },
                {
                    word: " to",
                    start: 4.56,
                    end: 4.78,
                    probability: 0.9826560020446777,
                },
                {
                    word: " music",
                    start: 4.78,
                    end: 5.0,
                    probability: 0.9862344264984131,
                },
                {
                    word: " while",
                    start: 5.0,
                    end: 5.22,
                    probability: 0.9965022802352905,
                },
                {
                    word: " you",
                    start: 5.22,
                    end: 5.36,
                    probability: 0.9988345503807068,
                },
                {
                    word: " work.",
                    start: 5.36,
                    end: 5.66,
                    probability: 0.9955690503120422,
                },
                {
                    word: " Full",
                    start: 6.18,
                    end: 6.34,
                    probability: 0.8614761233329773,
                },
                {
                    word: " time",
                    start: 6.34,
                    end: 6.64,
                    probability: 0.872488796710968,
                },
                {
                    word: " or",
                    start: 6.64,
                    end: 6.88,
                    probability: 0.985895037651062,
                },
                {
                    word: " part",
                    start: 6.88,
                    end: 7.08,
                    probability: 0.9917831420898438,
                },
                {
                    word: " time.",
                    start: 7.08,
                    end: 7.5,
                    probability: 0.7733853459358215,
                },
                {
                    word: " Find",
                    start: 7.88,
                    end: 8.08,
                    probability: 0.9921563863754272,
                },
                {
                    word: " local",
                    start: 8.08,
                    end: 8.36,
                    probability: 0.9517604112625122,
                },
                {
                    word: " positions",
                    start: 8.36,
                    end: 8.76,
                    probability: 0.9885636568069458,
                },
                {
                    word: " here.",
                    start: 8.76,
                    end: 9.2,
                    probability: 0.9945582151412964,
                },
            ],
        },
    ],
    language: "English",
};

export default function canvas(props) {
    const context = useContext(CanvasContext) || {};
    const {
        previewVideo,
        // activeWordColor,
        // backgroundColor,
        canvasCtx,
        currentVideoTime,
        fontFamily,
        // fontSize,
        setCanvasCtx,
        setCurrentVideoTime,
        setFontFamily,
        setFontSize,
        setTextDecoration,
        setTextStrokeThickness,
        setVideoDuration,
        sourceVideoRef,
        // strokeColor,
        textDecoration,
        // textStrokeThickness,
        videoDuration,
        // wordColor,
        loadedVideo,
        setLoadedVideo,
        loadedMetaData,
        setLoadedMetaData,
        // withTextStroke,
        // withBackground,

        // withSingleWord,
        wordSpace,
        // withWordAnimation,
        // withActiveWordColor,
        isPlaying,
        // lineHeight,

        //
        currentPrestSettings,
        setCurrentPrestSettings,
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

    const outputCanvasRef = useRef();

    useEffect(() => {
        if (outputCanvasRef.current && !canvasCtx) {
            const ctx = outputCanvasRef.current.getContext("2d");
            ctx.imageSmoothingEnabled = true;
            setCanvasCtx(ctx);
        }
    }, [outputCanvasRef.current, canvasCtx]);

    useEffect(() => {
        debugger;
        const ctx = outputCanvasRef.current.getContext("2d");
        ctx.font = `${textDecoration} ${fontSize}px ${fontFamily}`;
        setCanvasCtx(ctx);
    }, [fontSize, wordSpace, fontFamily, textDecoration]);

    useEffect(() => {
        if (loadedVideo && outputCanvasRef.current && canvasCtx && loadedMetaData && sourceVideoRef.current) {
            const canvas = outputCanvasRef.current;
            canvas.width = sourceVideoRef.current.videoWidth * 0.5; //* 1.5;
            canvas.height = sourceVideoRef.current.videoHeight * 0.5; //* 1.5;
            // console.log(canvas.width, canvas.height);
            console.log("CALLED ONCE");

            const wordSegments = wordBreakDown(wordsData.segments, canvasCtx, context);
            // console.log({ wordSegments });

            // if (sourceVideoRef.current.paused) {
            //     return;
            // } else if (sourceVideoRef.current.ended) {
            //     return;
            // } else {
            drawVideo(wordSegments);
            // }
            function onTimeUpdate(event) {
                onTrackedVideoFrame(sourceVideoRef.current.currentTime, sourceVideoRef.current.duration);
            }
            sourceVideoRef.current.addEventListener("timeupdate", onTimeUpdate);

            function onTrackedVideoFrame(currentTime, duration) {
                setCurrentVideoTime(currentTime.toFixed(1)); //Change #current to currentTime
                setVideoDuration(duration.toFixed(1));
            }

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
                const currentWords = _wordsData.filter((wd) => {
                    return wd.sentenceEnd > (parseFloat(sourceVideoRef.current.currentTime) || 0) && wd.sentenceStart < (parseFloat(sourceVideoRef.current.currentTime) || 0);
                });
                // Set font properties
                // canvasCtx.font = `${textDecoration} ${fontSize}px ${fontFamily}`;
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

                    // Draw the word at the specified position

                    // Update the x-coordinate for the next word

                    // x += canvasCtx.measureText(wordData.word + " ").width; // Include space after each word
                });
            }

            return () => {
                sourceVideoRef?.current?.removeEventListener("timeupdate", onTimeUpdate);
            };
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
    ]);

    return (
        <div className="border border-f00">
            <h2>canvas</h2>
            <canvas ref={outputCanvasRef} id="outputCanvas"></canvas>
        </div>
    );
}
