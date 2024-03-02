import React, { useEffect, useState } from "react";
import TextToVoice from "../components/TextToVoice";
import OpenAI from "openai";

const openai = new OpenAI({
  dangerouslyAllowBrowser: true,
  apiKey: "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", // This is the default and can be omitted
});

// Define the props type for Settings
interface SettingsProps {
  setSelectedOption: (value: string) => void;
  setCountdownStart: React.Dispatch<React.SetStateAction<boolean>>;
  setCallInterviewer: React.Dispatch<React.SetStateAction<string>>;
}

const Settings: React.FC<SettingsProps> = ({
  setSelectedOption,
  setCountdownStart,
  setCallInterviewer,
}) => {
  const [responseText, setResponseText] = useState("");
  const [userAnswer, setUserAnswer] = useState("");

  //   Voice to text code
  const [isRecording, setIsRecording] = useState(false);
  const [isBtnRecordDisabled, setIsBtnRecordDisabled] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const [blobArr, setBlobArr] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const stopRecording = async () => {
    // Disable the button
    setIsBtnRecordDisabled(true);
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setIsRecording(false);
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
      setUserAnswer(transcription.text);
      setBlobArr([]);
    } else {
      setUserAnswer("...");
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
    setIsBtnRecordDisabled(false);
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
    if (userAnswer !== "") {
      console.log("userAnswer:", userAnswer);
      console.log("==> getting question useeffect");
      getQuestion(responseText, userAnswer).then((question) => {
        setResponseText(question);
      });
    }
  }, [userAnswer]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value);
  };

  const handleEndText = () => {
    console.log("===> startRecording");
    startRecording();
  };

  const handleStartInterview = () => {
    console.log("Interview Started");
    setCountdownStart(true);
    setCallInterviewer("block flex flex-col");

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

    // Disable the button
    setIsButtonDisabled(true);
  };

  // const handleStop = () => {
  //   setCountdownStart(false); // Stop countdown
  //   setCountdownKey(0);
  // };

  return (
    <div className="bg-[#1a1a1a] p-8 ml-10">
      <div className="mt-4">
        <select
          className="select select-bordered select-lg w-full bg-[#2e2e2e]"
          onChange={handleChange}
          defaultValue="" // To address the controlled component aspect
        >
          <option disabled value="">
            Select company...
          </option>
          <option value="Atlassian">Atlassian</option>
        </select>

        {/* <div className="flex flex-col rounded-md border border-white p-4 mt-4 justify-center items-center">
          <div className="w-full">
            <input
              className="p-4 w-full bg-white text-black rounded-md"
              placeholder="Include your own questions..."
            />
          </div>
          <button className="btn bg-[#2e2e2e] rounded-full mt-6 mb-2 text-white border border-blue-600 hover:bg-[#363636] hover:border hover:border-blue-600">
            Add question
          </button>
        </div> */}
      </div>
      <div className="mt-8 flex justify-end flex-col">
        <div className="flex-row self-end space-x-4">
          <button
            onClick={handleStartInterview}
            className="btn text-white bg-[#2e2e2e] hover:bg-[#363636] disabled:bg-[#575757] disabled:text-gray-400"
            disabled={isButtonDisabled}
          >
            Start interview
          </button>
          <button
            className="btn text-white bg-[#2e2e2e] hover:bg-[#363636] disabled:bg-[#575757] disabled:text-gray-400"
            onClick={stopRecording}
            disabled={isBtnRecordDisabled}
          >
            Stop Recording
          </button>
        </div>
      </div>
      {responseText && (
        <TextToVoice text={responseText} handleEnd={handleEndText} />
      )}
    </div>
  );
};

export default Settings;
