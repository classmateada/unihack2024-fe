import React, { useEffect, useState } from "react";
import Duplex from "stream"; // Native Node Module

import OpenAI from "openai";

type Props = {};

const openai = new OpenAI({
  dangerouslyAllowBrowser: true,
  apiKey: "", // This is the default and can be omitted
});

// async function SpeechToText() {
//   const transcription = await openai.audio.transcriptions.create({
//     file: fs.createReadStream("/path/to/file/audio.mp3"),
//     model: "whisper-1",
//   });

//   console.log(transcription.text);
// }

const VoiceToText = (props: Props) => {
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
    null
  );
  const [transcriptLength, setTranscriptLength] = useState(0);
  const [blobArr, setBlobArr] = useState([]);

  const startRecording = async () => {
    console.log("Recording started");
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const audioContext = new (window as any).AudioContext();
      const micSource = audioContext.createMediaStreamSource(audioStream);

      const destination = audioContext.createMediaStreamDestination();
      micSource.connect(destination);

      setIsRecording(true);
      setStream(destination.stream);

      const mimeTypes = ["audio/mp4", "audio/webm"].filter((type) =>
        MediaRecorder.isTypeSupported(type)
      );

      if (mimeTypes.length === 0) {
        return alert("Browser not supported");
      }

      setTimerInterval(
        setInterval(() => {
          setTranscriptLength((t) => t + 1);
        }, 1000)
      );

      const recorder = new MediaRecorder(destination.stream, {
        mimeType: mimeTypes[0],
      });

      recorder.addEventListener("dataavailable", async (event) => {
        if (event.data.size > 0) {
          setBlobArr((prev) => [...prev, event.data]);
        }
      });

      recorder.start(1000);
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const stopRecording = async () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setIsRecording(false);
    clearInterval(timerInterval!);
    console.log("Recording stopped");

    // console.log(audioBuf)
    // const myReadableStream = bufferToStream(audioBuf);
    const file = new File(blobArr, "audio.mp3", { type: "audio/mp3" });

    // const transcription = await openai.audio.transcriptions.create({
    //   file: file,
    //   model: "whisper-1",
    // });
    // console.log(transcription);
    // console.log(transcription.text);
  };

  return (
    <>
      <button onClick={startRecording}>Start</button>
      <button onClick={stopRecording}>Stop</button>
    </>
  );
};

export default VoiceToText;
