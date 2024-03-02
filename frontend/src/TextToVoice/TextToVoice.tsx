import React, { useState, useEffect } from "react";

interface TextToSpeechProps {
  text: string;
}

// Text input
function TextToSpeech({ text }: TextToSpeechProps) {
  // States
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [voice, setVoice] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();

    setUtterance(u);
    setVoice(voices[2]);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    } else {
      // Set voice
      utterance.voice = voice;
    }

    synth.speak(utterance);

    setIsPaused(false);
  };

  // const handlePause = () => {
  //   const synth = window.speechSynthesis;

  //   synth.pause();

  //   setIsPaused(true);
  // };

  const handleStop = () => {
    const synth = window.speechSynthesis;

    synth.cancel();

    setIsPaused(false);
  };

  return (
    <div className="mt-8 flex space-x-4 justify-end">
      <button
        onClick={handlePlay}
        className="btn text-white bg-[#2e2e2e] hover:bg-[#363636]"
      >
        {isPaused ? "Resume" : "Start Interview"}
      </button>
      {/* <button
        onClick={handlePause}
        className="btn text-white bg-[#2e2e2e] hover:bg-[#363636]"
      >
        Pause
      </button> */}
      <button
        onClick={handleStop}
        className="btn text-white bg-[#2e2e2e] hover:bg-[#363636]"
      >
        Stop Interview
      </button>
    </div>
  );
}

export default TextToSpeech;
