import React, { useEffect, useState } from "react";
import TextToVoice from "../components/TextToVoice";
import OpenAI from "openai";

const openai = new OpenAI({
  dangerouslyAllowBrowser: true,
  apiKey: "", // This is the default and can be omitted
});

const Settings = () => {
  const [responseText, setResponseText] = useState("");
  const [userAnswer, setUserAnswer] = useState("");

  //   Voice to text code
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
    null
  );
  const [transcriptLength, setTranscriptLength] = useState(0);
  const [blobArr, setBlobArr] = useState([]);

  const stopRecording = async () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setIsRecording(false);
    clearInterval(timerInterval!);
    console.log("Recording stopped");

    // console.log(audioBuf)
    // const myReadableStream = bufferToStream(audioBuf);
    if (blobArr.length !== 0) {
        const file = new File(blobArr, "audio.mp3", { type: "audio/mp3" });
        
        const transcription = await openai.audio.transcriptions.create({
          file: file,
          model: "whisper-1",
        });
        
        console.log(transcription);
        console.log(transcription.text);
        setUserAnswer(transcription.text)
        setBlobArr([])
    } else {
        setUserAnswer("...")
    }
  };

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

  const getQuestion = async (prevQuest, prevAns) => {
    const url = "http://127.0.0.1:5000/question";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "prev-question": prevQuest,
        "prev-answer": prevAns,
      }),
    };
    const resultPromise = await fetch(url, options);
    const question = await resultPromise.text();
    return question;
  };

  useEffect(() => {
    if (userAnswer !== '') {
        console.log("userAnswer:", userAnswer)
      console.log("==> getting question useeffect");
      getQuestion(responseText, userAnswer).then((question) => {
        setResponseText(question);
      });
    }
  }, [userAnswer]);

  const handleEndText = () => {
    console.log("===> startRecording");
    startRecording();
  };

  const handleStartInterview = () => {
    const url = "http://127.0.0.1:5000/greeting";

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(url, options)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        console.log("===> data:", data);
        setResponseText(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div className="bg-[#1a1a1a] p-8 ml-10">
      <div className="mt-4">
        <select className="select select-bordered select-lg w-full bg-[#2e2e2e]">
          <option disabled selected>
            Select company...
          </option>
          <option>Atlassian</option>
        </select>
        <div className="flex flex-col rounded-md border border-white p-4 mt-4 justify-center items-center">
          <div className="w-full">
            <input
              className="p-4 w-full bg-white text-black rounded-md"
              placeholder="Include your own questions..."
            />
          </div>
          <button className="btn bg-[#2e2e2e] rounded-full mt-6 mb-2 text-white border border-blue-600 hover:bg-[#363636] hover:border hover:border-blue-600">
            Add question
          </button>
        </div>
      </div>
      <div className="mt-8 flex space-x-4 justify-end">
        <button
          onClick={handleStartInterview}
          className="btn text-white bg-[#2e2e2e] hover:bg-[#363636]"
        >
          Start interview
        </button>
        <button className="btn text-white bg-[#2e2e2e] hover:bg-[#363636]">
          Stop interview
        </button>
      </div>
      {responseText && (
        <TextToVoice text={responseText} handleEnd={handleEndText} />
      )}
      <button onClick={stopRecording}>I'm done</button>
    </div>
  );
};

export default Settings;
