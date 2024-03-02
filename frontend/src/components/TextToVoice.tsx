import React, { useState, useEffect } from "react";

interface TextToSpeechProps {
    text: string;
    handleEnd: () => void;
  }

// Text input
function TextToSpeech({ text, handleEnd}: TextToSpeechProps) {
    // States
    const [isPaused, setIsPaused] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [utterance, setUtterance] = useState(null);
    const [voice, setVoice] = useState(null);

    useEffect(() => {
        const synth = window.speechSynthesis;
        console.log(text)
        const u = new SpeechSynthesisUtterance(text);
        const voices = synth.getVoices();

        setUtterance(u);
        setVoice(voices[2]);

        setIsReady(true);
        
        u.addEventListener("end", () => {
            setIsReady(false);
            handleEnd();
        })

        return () => {
            synth.cancel();
        };
    }, [text]);

    useEffect(() => {
      if (isReady) {
          handlePlay();
      }
  }, [isReady]);

    const handlePlay = () => {
        if (!isReady) return;

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

    const handlePause = () => {
        const synth = window.speechSynthesis;

        synth.pause();

        setIsPaused(true);
    };

    const handleStop = () => {
        const synth = window.speechSynthesis;

        synth.cancel();

        setIsPaused(false);
    };

    return (
      <div>
       {/* <button onClick={handlePlay}>{isPaused ? "Resume" : "Play"}</button>
       <button onClick={handlePause}>Pause</button>
       <button onClick={handleStop}>Stop</button> */}
     </div>
    );
  }


export default TextToSpeech;
