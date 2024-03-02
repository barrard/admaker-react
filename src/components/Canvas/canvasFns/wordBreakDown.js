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
    } = context;

    const timelyWords = [];
    canvasCtx.font = `${textDecoration} ${fontSize}px ${fontFamily}`;

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
            let y = 0;
            sentenceTextLines.forEach((line, iLine) => {
                let metrics = canvasCtx.measureText(line);
                debugger;
                let fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
                y += metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent + lineHeight / 10;

                //should return ex and why coords?
                // console.log(line);
                line = line.trim();
                canvasCtx.font = `${textDecoration} ${fontSize}px ${fontFamily}`;
                // if (line.includes("workers are needed.")) {
                //     debugger;
                // }
                const lineWithWordSpace = line.replaceAll(" ", wordSpace);

                const lineWidth = canvasCtx.measureText(lineWithWordSpace).width;
                // const wordSpaceWidth = canvasCtx.measureText(wordSpace).width;

                const canvasWidth = canvasCtx.canvas.width;
                const textStartOffset = (canvasWidth - lineWidth) / 2;
                let nextWordStartOffset = 0;

                const wordsData = wordTimes
                    .filter((wtf) => wtf.line === iLine)
                    .map((wtf, iWtf) => {
                        const _y = y;
                        const _x = textStartOffset + nextWordStartOffset; // * iWtf; //TODOOOOO
                        if (_x < 0) {
                            debugger;
                        }
                        const wordWidthSpace = canvasCtx.measureText(`${wtf.word}${wordSpace}`).width;

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
