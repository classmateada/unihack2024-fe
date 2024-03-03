import Person from "../components/Person";
import Settings from "../components/Settings";
import Text from "../components/Text";
import React, { useState } from "react";
import Countdown from "react-countdown";

export default function Home() {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [countdownStart, setCountdownStart] = useState(false);
  const [callInterviewer, setCallInterviewer] = useState<string>("hidden");

  // Renderer for when the countdown completes
  const Completionist = () => {
    // Set the state to hide the interviewer call-to-action
    setCallInterviewer("hidden");
    // Return the completion message or component
    return <span>Time's up!</span>;
  };

  return (
    <div>
      <div>
        <Person callInterviewer={callInterviewer} />
        <div className="grid grid-cols-2 px-14 ">
          <div className="overflow-y-auto h-80">
            <Text selectedOption={selectedOption} response={response} />
          </div>

          <Settings
            setSelectedOption={setSelectedOption}
            setCountdownStart={setCountdownStart}
            setCallInterviewer={setCallInterviewer}
            setResponse={setResponse}
          />
          <div className="absolute top-[95%] right-[6rem] text-xl flex flex-row">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="mr-2"
            >
              <path
                fill="currentColor"
                d="M9 3V1h6v2zm2 11h2V8h-2zm1 8q-1.85 0-3.488-.712T5.65 19.35q-1.225-1.225-1.937-2.863T3 13q0-1.85.713-3.488T5.65 6.65q1.225-1.225 2.863-1.937T12 4q1.55 0 2.975.5t2.675 1.45l1.4-1.4l1.4 1.4l-1.4 1.4Q20 8.6 20.5 10.025T21 13q0 1.85-.713 3.488T18.35 19.35q-1.225 1.225-2.863 1.938T12 22"
              />
            </svg>
            {countdownStart ? (
              <Countdown
                date={Date.now() + 900000}
                onComplete={Completionist}
                renderer={({ minutes, seconds, completed }) => {
                  if (completed) {
                    // Render a completed state
                    return <Completionist />;
                  } else {
                    // Render a countdown
                    return (
                      <span>
                        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                      </span>
                    );
                  }
                }}
              >
                {/* Navigate to feedback when countdown done! */}
              </Countdown>
            ) : (
              <p>15:00</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
