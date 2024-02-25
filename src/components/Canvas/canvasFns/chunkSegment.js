export default function chunkSegment(segment, nextSegment, canvasCtx, context) {
    const { wordSpace } = context;
    const timedSentenceChunks = [];
    let sentenceCount = 0;
    let sentences = segment.text
        .trim()
        .split(".")
        .filter((s) => s).length;
    //   sentences.forEach((sentence, iSentence) => {
    let timedSentence = {
        start: null,
        end: null,
        sentenceTextLines: [],
        wordTimes: [],
    };
    // if (segment.text.includes("workers are needed. ")) {
    //     debugger;
    // }
    const words = (segment.words = segment.words.map((w) => ({
        ...w,
        word: `${w.word.trim()}${" "}`,
    })));
    const x = 0;
    let endOfSentence = false;
    let tempWordLine = "";
    const canvasWidth = canvasCtx.canvas.width;

    let startIndex = undefined;
    words.forEach(({ word, start, end }, iWord, words) => {
        let wordSpaceWord = word.replace(" ", wordSpace);
        tempWordLine += wordSpaceWord;
        const wordLength = canvasCtx.measureText(tempWordLine).width;

        if (timedSentence.sentenceTextLines.length == 0) {
            timedSentence.sentenceTextLines.push("");
        }
        if (timedSentence.start == undefined) {
            timedSentence.start = start;
        }
        if (wordLength >= canvasWidth) {
            tempWordLine = word;
            timedSentence.sentenceTextLines.push("");
            // endOfSentence = true;
        }

        if (word.includes(".")) {
            endOfSentence = true;
            tempWordLine = "";
            sentences--;
            sentenceCount++;
        }
        let currentLine = timedSentence.sentenceTextLines.slice(-1)[0];
        currentLine += word;
        timedSentence.sentenceTextLines[
            timedSentence.sentenceTextLines.length - 1
        ] = currentLine;
        timedSentence.wordTimes.push({
            word: word.trim(),
            start,
            end,
            line: timedSentence.sentenceTextLines.length - 1,
        });

        //TODO use the time of the next word, or just add half a second
        if (endOfSentence) {
            const lastWord = timedSentence.wordTimes.slice(-1)[0];
            if (sentences > 0 && words[iWord + 1]) {
                const nextWord = words[iWord + 1];
                timedSentence.end = nextWord.start;
                lastWord.end = end;
                lastWord.nextWordStart = nextWord.start;
            } else if (nextSegment && nextSegment.words[0]) {
                const nextWord = nextSegment.words[0];
                timedSentence.end = nextWord.start;
                lastWord.end = end;
                lastWord.nextWordStart = nextWord.start;
            } else {
                timedSentence.end = end;
                lastWord.end = end;
            }

            timedSentenceChunks.push(timedSentence);

            //new sentence
            timedSentence = {
                start: null,
                end: null,
                sentenceTextLines: [],
                wordTimes: [],
            };
            startIndex = undefined;
        }

        endOfSentence = false;
    });

    return timedSentenceChunks;
}
