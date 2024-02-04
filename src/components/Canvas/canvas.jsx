import React, { useState, useEffect, useRef, useContext } from "react";
import { CanvasContext } from "../Context/CanvasContext";

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
        { word: " Food", start: 0.0, end: 0.46, probability: 0.9250689744949341 },
        { word: " manufacturing", start: 0.46, end: 0.98, probability: 0.9233144521713257 },
        { word: " workers", start: 0.98, end: 1.4, probability: 0.9884375929832458 },
        { word: " are", start: 1.4, end: 1.7, probability: 0.9968340992927551 },
        { word: " needed.", start: 1.7, end: 2.0, probability: 0.9912281036376953 },
        { word: " No", start: 2.44, end: 2.62, probability: 0.9830584526062012 },
        { word: " experience", start: 2.62, end: 3.08, probability: 0.9937577247619629 },
        { word: " is", start: 3.08, end: 3.36, probability: 0.9924800395965576 },
        { word: " required.", start: 3.36, end: 3.8, probability: 0.9992625117301941 },
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
        { word: " Listen", start: 4.38, end: 4.56, probability: 0.968858003616333 },
        { word: " to", start: 4.56, end: 4.78, probability: 0.9826560020446777 },
        { word: " music", start: 4.78, end: 5.0, probability: 0.9862344264984131 },
        { word: " while", start: 5.0, end: 5.22, probability: 0.9965022802352905 },
        { word: " you", start: 5.22, end: 5.36, probability: 0.9988345503807068 },
        { word: " work.", start: 5.36, end: 5.66, probability: 0.9955690503120422 },
        { word: " Full", start: 6.18, end: 6.34, probability: 0.8614761233329773 },
        { word: " time", start: 6.34, end: 6.64, probability: 0.872488796710968 },
        { word: " or", start: 6.64, end: 6.88, probability: 0.985895037651062 },
        { word: " part", start: 6.88, end: 7.08, probability: 0.9917831420898438 },
        { word: " time.", start: 7.08, end: 7.5, probability: 0.7733853459358215 },
        { word: " Find", start: 7.88, end: 8.08, probability: 0.9921563863754272 },
        { word: " local", start: 8.08, end: 8.36, probability: 0.9517604112625122 },
        { word: " positions", start: 8.36, end: 8.76, probability: 0.9885636568069458 },
        { word: " here.", start: 8.76, end: 9.2, probability: 0.9945582151412964 },
      ],
    },
  ],
  language: "English",
};

function chunkSegment(segment) {
  const timedSentenceChunks = [];
  const sentences = segment.text.trim().split(".");
  //   sentences.forEach((sentence, iSentence) => {
  let timedSentence = {
    start: null,
    end: null,
    sentenceTextLines: [],
    wordTimes: [],
  };
  const words = segment.words;
  const x = 0;
  let endOfSentence = false;
  let charCount = 0;
  let startIndex = undefined;
  words.forEach(({ word, start, end }) => {
    charCount += word.length;

    if (timedSentence.sentenceTextLines.length == 0) {
      timedSentence.sentenceTextLines.push("");
    }
    if (timedSentence.start == undefined) {
      timedSentence.start = start;
    }
    if (charCount > 20) {
      charCount = 0;
      timedSentence.sentenceTextLines.push("");
    }

    if (word.includes(".")) {
      endOfSentence = true;
      charCount = 0;
    }
    let currentLine = timedSentence.sentenceTextLines.slice(-1)[0];
    currentLine += word;
    timedSentence.sentenceTextLines[timedSentence.sentenceTextLines.length - 1] = currentLine;
    timedSentence.wordTimes.push({ word: word.trim(), start, end });

    if (endOfSentence) {
      timedSentence.end = end;

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

function wordBreakDown(textSegments, sourceVideoRef, canvasCtx) {
  const timelyWords = [];
  textSegments.forEach((segment, iSeg) => {
    const { text, start, end } = segment;
    // segment.words.forEach(({ word, start, end }, iWord) => {
    console.log({ text, start, end });

    //some function to break this into 16 characters =======
    const timedSentenceChunks = chunkSegment(segment);

    timedSentenceChunks.forEach((textSentence, i) => {
      const { wordTimes, sentenceTextLines, start, end } = textSentence;

      let wordIndex = 0;
      let x = 30;
      let y = 30;
      sentenceTextLines.forEach((line, iLine) => {
        //should return ex and why coords?
        console.log(line);
        line = line.trim();
        const lineWidth = canvasCtx.measureText(line).width;
        const canvasWidth = canvasCtx.canvas.width;
        const textStartOffset = (canvasWidth - lineWidth) / 2;
        let nextWordStartOffset = 0;
        debugger;
        const lineWords = line.split(" ");
        // const wordsThusFar = wordTimes.filter((wd) => wd.start < (parseFloat(sourceVideoRef.current.currentTime) || 0));
        const wordsData = wordTimes.map((wtf, iWtf) => {
          const _y = iLine * y;
          const _x = textStartOffset + nextWordStartOffset; // * iWtf; //TODOOOOO
          timelyWords.push({
            x: _x,
            y: _y,
            word: wtf.word,
            // color: iWtf == wordsThusFar.length - 1 ? "red" : "white",
          });
          nextWordStartOffset += canvasCtx.measureText(wtf.word).width;
        });
      });

      //   debugger;
      //   // ------------------------------   with ffmpeg      --------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.
      //   // const comma = iLine == sentenceTextLines.length - 1 && iSeg == textSegments.length - 1 && i == timedSentenceChunks.length - 1 ? "" : ", ";
      //   //   if (i == 0 && iLine == 1) {
      //   //     command += `drawtext=text='${line}':x=(w-text_w)/2:y=(h/4)+((text_h + (10*${iLine})) * ${iLine}):fontsize=40:fontcolor=red:enable='between(t,${start},${end})'${comma}`;
      //   //   } else {
      //   // command += `drawtext=text='${line}':x=(w-text_w)/2:y=(h/4)+((text_h + (10*${iLine})) * ${iLine}):fontsize=35:fontcolor=white:borderw=3:bordercolor=black:enable='between(t,${start},${end})'${comma}`;
      //   //   }
      //   // const lineWords = line.split(" ");
      //   // lineWords.forEach((lineWord, iWord) => {
      //   //   if (iWord < wordIndex) return;
      //   //   const wordTime = wordTimes.find((wt) => wt.word == lineWord);
      //   //   console.log(wordTime);
      //   //   const { word, start, end } = wordTime;
      //   //   command += `drawtext=text='${word}':x=(w-text_w)/2:y=(h/4)+((text_h + (10*${iLine})) * ${iLine}):fontsize=40:fontcolor=red:enable='between(t,${start},${end})'${comma}`;
      //   // });
      // });
    });

    //   });
  });
  return timelyWords;
}

export default function canvas(props) {
  const { currentVideoTime, setCurrentVideoTime, videoDuration, setVideoDuration, sourceVideoRef } = useContext(CanvasContext) || {};

  const [loadedVideo, setLoadedVideo] = useState(false);
  const [loadedMetaData, setLoadedMetaData] = useState(false);
  const [canvasCtx, setCanvasCtx] = useState(false);
  const { video } = props;
  // console.log(video);
  const outputCanvasRef = useRef();
  // const sourceVideoRef = useRef();

  const drawText = (wordsData, sourceVideoRef) => {
    const currentWords = wordsData.filter((wd) => {
      return wd.start < (parseFloat(sourceVideoRef.current.currentTime) || 0);
    });
    // Set font properties
    canvasCtx.font = "30px Arial";
    canvasCtx.textBaseline = "top"; // Align text from the top
    canvasCtx.fillStyle = "white";

    // Calculate the position for drawing each word
    let x = 20;
    const y = 40;

    // Loop through each word and draw it with the appropriate color
    currentWords.forEach((wordData, index) => {
      if (index === currentWords.length - 1) {
        // Set red color for the word "Text"
        canvasCtx.fillStyle = "red";
      } else {
        // Set white color for other words
        canvasCtx.fillStyle = "white";
      }

      // Draw the word at the specified position
      canvasCtx.fillText(wordData.word, x, y);

      // Update the x-coordinate for the next word
      x += canvasCtx.measureText(wordData.word + " ").width; // Include space after each word
    });
  };

  useEffect(() => {
    if (outputCanvasRef.current && !canvasCtx) {
      setCanvasCtx(outputCanvasRef.current.getContext("2d"));
    }
  }, [outputCanvasRef.current, canvasCtx]);

  useEffect(() => {
    if (loadedVideo && outputCanvasRef.current && canvasCtx && loadedMetaData && sourceVideoRef.current) {
      const canvas = outputCanvasRef.current;
      canvas.width = sourceVideoRef.current.videoWidth / 1.5;
      canvas.height = sourceVideoRef.current.videoHeight / 1.5;
      console.log(canvas.width, canvas.height);
      console.log("CALLED ONCE");

      //TODO
      //TODO
      const wordSegments = wordBreakDown(wordsData.segments, sourceVideoRef, canvasCtx);
      debugger;
      drawVideo();
      sourceVideoRef.current.addEventListener("timeupdate", (event) => {
        onTrackedVideoFrame(sourceVideoRef.current.currentTime, sourceVideoRef.current.duration);
      });

      function onTrackedVideoFrame(currentTime, duration) {
        // console.log({ currentTime, duration });
        setCurrentVideoTime(currentTime.toFixed(1)); //Change #current to currentTime
        setVideoDuration(duration.toFixed(1));
      }

      function drawVideo() {
        canvasCtx.drawImage(sourceVideoRef.current, 0, 0, canvas.width, canvas.height);
        drawText(wordSegments, sourceVideoRef);
        requestAnimationFrame(drawVideo);
      }
    }
  }, [loadedVideo, loadedMetaData, outputCanvasRef.current, canvasCtx, sourceVideoRef?.current]);

  return (
    <div className="border border-f00">
      <h2>cavas</h2>
      <canvas ref={outputCanvasRef} id="outputCanvas"></canvas>

      {video && (
        <div
          style={{
            border: "2px solid red",
            overflow: "hidden",
            height: "0px",
          }}
          id="videoContainer"
        >
          <video
            ref={sourceVideoRef}
            onLoadedData={(e) => {
              setLoadedVideo(true);
            }}
            onLoadedMetadata={() => {
              setLoadedMetaData(true);
            }}
            style={{
              maxWidth: "100%",
              // height: "200px",
              // width: "200px",
              visibility: "hidden",
            }}
            id="sourceVideo"
            autoPlay={false}
            controls
            src={video}
          ></video>
        </div>
      )}
    </div>
  );
}
