import chunkSegment from "./chunkSegment";
export default function wordBreakDown(
    textSegments,

    canvasCtx,
    context
) {
    const {
        // currentVideoTime,
        // setCurrentVideoTime,
        // videoDuration,
        // setVideoDuration,
        // sourceVideoRef,
        textDecoration,
        // setTextDecoration,
        fontSize,
        // setFontSize,
        fontFamily,
        // setFontFamily,
        wordSpace,
        lineHeight,
        yAxis,
    } = context;

    const timelyWords = [];
    canvasCtx.font = `${textDecoration} ${fontSize}px ${fontFamily}`;
    if (!textSegments?.length) return;
    textSegments.forEach((segment, iSeg, textSegmentsArray) => {
        const { text: segmentText, start: segmentStart, end: segmentEnd } = segment;
        // segment.words.forEach(({ word, start, end }, iWord) => {

        //some function to break this into 16 characters =======
        const nextSegment = textSegmentsArray[iSeg + 1];
        const timedSentenceChunks = chunkSegment(segment, nextSegment, canvasCtx, context);

        timedSentenceChunks.forEach((textSentence, i) => {
            const { wordTimes, sentenceTextLines, start: sentenceStart, end: sentenceEnd } = textSentence;

            let wordIndex = 0;
            let x = 30;
            let y = yAxis;
            sentenceTextLines.forEach((line, iLine) => {
                let metrics = canvasCtx.measureText(line);
                let fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
                y += metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent + lineHeight / 10;

                //should return ex and why coords?
                // console.log(line);
                line = line.trim();
                canvasCtx.font = `${textDecoration} ${fontSize}px ${fontFamily}`;
                // if (line.includes("workers are needed.")) {
                //     ;
                // }
                const lineWithWordSpace = line.replaceAll(" ", "");

                const spacesCount = line.split(" ").length - 1;
                // const lineWidth = canvasCtx.measureText(lineWithWordSpace).width;
                const lineWidth = canvasCtx.measureText(lineWithWordSpace).width + spacesCount * wordSpace;

                const canvasWidth = canvasCtx.canvas.width;
                const textStartOffset = (canvasWidth - lineWidth) / 2;
                let nextWordStartOffset = 0;

                const wordsData = wordTimes
                    .filter((wtf) => wtf.line === iLine)
                    .map((wtf, iWtf) => {
                        const _y = y;
                        const _x = textStartOffset + nextWordStartOffset; // * iWtf; //TODOOOOO
                        if (_x < 0) {
                        }
                        const wordWidthSpace = canvasCtx.measureText(`${wtf.word}${""}`).width + wordSpace;

                        const wordWidth = canvasCtx.measureText(`${""}${wtf.word}${""}`).width;

                        timelyWords.push({
                            x: _x,
                            y: _y,
                            word: wtf.word,
                            start: wtf.start,
                            end: wtf.end,
                            segmentStart,
                            segmentEnd,
                            sentenceEnd,
                            sentenceStart,
                            wordWidthSpace,
                            wordWidth,
                            fontHeight,
                        });

                        nextWordStartOffset += wordWidthSpace;
                    });
            });
        });
    });
    return timelyWords;
}
