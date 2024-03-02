import React, { useState, useEffect } from "react";
import Countdown from "react-countdown";

interface TextToSpeechProps {
  text: string;
}

function TextToSpeech({ text }: TextToSpeechProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(
    null
  );
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [countdownKey, setCountdownKey] = useState(0); // Key to control countdown re-mount
  const [countdownStart, setCountdownStart] = useState(false);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();
    setVoice(voices[2]); // Assuming the first voice is desired
    setUtterance(u);
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (utterance && voice) {
      utterance.voice = voice; // Set the voice to the utterance

      if (isPaused) {
        synth.resume(); // Resume speech if paused
      } else {
        synth.speak(utterance); // Start speech synthesis
      }

      setIsPaused(false);
      setCountdownStart(true); // Start countdown
      setCountdownKey((prevKey) => prevKey + 1); // Increment key to restart countdown
    }
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;
    synth.cancel(); // Stop speech synthesis
    setIsPaused(false);
    setCountdownStart(false); // Stop countdown
    setCountdownKey(0);
  };

  // Renderer for when the countdown completes
  const Completionist = () => <span>Times up!</span>;

  return (
    <div className="flex flex-col">
      <div className="mt-8 text-xl flex justify-end">
        <Countdown
          key={countdownKey} // Key to force re-mount and restart
          date={Date.now() + 1500000} // 25 minutes from now
          onComplete={Completionist}
          autoStart={countdownStart} // Ensure it starts upon re-mount
        />
      </div>
      <div className="mt-4 flex-row self-end space-x-4">
        <button
          onClick={handlePlay}
          className="btn text-white bg-[#2e2e2e] hover:bg-[#363636]"
        >
          Start Interview
        </button>
        <button
          onClick={handleStop}
          className="btn text-white bg-[#2e2e2e] hover:bg-[#363636]"
        >
          Stop Interview
        </button>
      </div>
    </div>
  );
}

export default TextToSpeech;
