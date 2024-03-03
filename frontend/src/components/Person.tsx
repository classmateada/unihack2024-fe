import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useRef, useState, useEffect } from "react";
import cn from "./cn";
import CatWaving from '../../public/Wave-gif.gif'
import CatStandBy from '../../public/Stand-by.gif'
import CatTalking from '../../public/Talking-gif.gif'
import { isContext } from "vm";

interface PersonProps {
  callInterviewer: string;
  isRecording: boolean;
  isButtonDisabled: boolean;
  hasInterviewStart: boolean;

}

const Person = ({ callInterviewer, isRecording, isButtonDisabled, hasInterviewStart }: PersonProps) => {
  const [isMicOn, setIsMicOn] = useState(false);
  const [isCamOn, setIsCamOn] = useState(false);

  // const [isRecording, setIsRecording] = useState(false);
  const [hasWaved, setHasWaved] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null); // Define the state with type Blob | null

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef(new MediaRecorder(new MediaStream()));

  const [opacityClass, setOpacityClass] = useState("opacity-40");

  const [catState, setCatState] = useState(2);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacityClass("opacity-100");
    }, 3500); // 3 second delay

    // Cleanup timeout if the component is unmounted within 1 second
    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
      /*
      start interview - clickStart interview button
      wave (wait for animation to finish) then standy
      question - isButtonDisabled
      talking
      start recording - isRecording
      standby
      */
    // Waving
    console.log("Has it started" + hasInterviewStart);
    console.log("Check if button is disabled" + isButtonDisabled);
    console.log("Is recording working" + isRecording);
    if (hasInterviewStart && !hasWaved) {
      setCatState(0);
      setHasWaved(true);
      const timer = setTimeout(() => {setCatState(2);}, 7000);
      return () => clearTimeout(timer);
    }
    else if (isRecording) {
      console.log("Running Standby" + isButtonDisabled);
        setCatState(2);
      }
    // Talking
    else if (isButtonDisabled) {
    console.log("Running Talking" + isButtonDisabled);
    setCatState(1);
    }
    // Standby 
    else {
    console.log("Running Standby" + isButtonDisabled);
      setCatState(2);
    }

  }, [hasInterviewStart, isButtonDisabled, isRecording]);

  const toggleMic = () => {
    // Toggle the state immediately to reflect the UI change.
    setIsMicOn((currentState) => !currentState);

    // Now act based on the new state.
    if (isMicOn) {
      // If the microphone was on, we now want to stop the recording.
      if (isRecording && audioRef.current) {
        audioRef.current.stop(); // Stop the media recorder.
        setIsRecording(false);

        // Stop all the tracks on the stream.
        audioRef.current.stream.getTracks().forEach((track) => track.stop());
      }
    } else {
      // If the microphone was off, we now want to start the recording.
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          // Create a new media recorder with the stream.
          audioRef.current = new MediaRecorder(stream);
          audioRef.current.start();
          setIsRecording(true);

          const chunks: BlobPart[] = []; // Define the type for chunks.
          audioRef.current.ondataavailable = (e) => {
            chunks.push(e.data);
          };

          audioRef.current.onstop = () => {
            const audioBlob = new Blob(chunks, {
              type: "audio/ogg; codecs=opus",
            });
            setAudioBlob(audioBlob);

            // Stop all the tracks on the stream after we're done recording.
            stream.getTracks().forEach((track) => track.stop());
          };
        })
        .catch((err) => {
          console.error("Failed to get audio stream", err);
        });
    }
  };

  const toggleCam = () => {
    setIsCamOn(!isCamOn);

    if (!isCamOn) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error("Failed to get video stream", err);
        });
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  };

  const getMicIcon = () => {
    return isMicOn ? "/Mic.png" : "/MicOff.png";
  };
  const getCamIcon = () => {
    return isCamOn ? "/Cam.png" : "/CamOff.png";
  };

  return (
    <>
      <div className="bg-[#262626] rounded-md flex flex-row justify-center p-28 space-x-6">
        <div className="flex flex-col items-center space-y-6">
          {/* Conditional rendering based on camera status */}
          {isCamOn ? (
            <div className="relative flex flex-col items-center">
              <video ref={videoRef} autoPlay className="w-[30vw] rounded-lg" />

              {/* Overlay icon */}
              <div className="absolute bottom-0 mb-6 flex justify-center w-full">
                <button className="btn glass btn-circle" onClick={toggleCam}>
                  <img src={getCamIcon()} alt="Cam" />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-[#605E5E] p-7 rounded-lg flex flex-col items-center space-y-6 w-[30vw] h-[35vh]">
              <div className="bg-[#D9D9D9] p-3 rounded-full mt-4">
                <Avatar>
                  <AvatarImage
                    alt="User"
                    src="/User.png"
                    className="h-[6vw] w-auto"
                  />
                  <AvatarFallback>User</AvatarFallback>
                </Avatar>
              </div>
              <div className="text-white">User</div>
              <div className="flex space-x-10">
                {/* <button className="btn glass btn-circle" onClick={toggleMic}>
              <img src={getMicIcon()} alt="Mic" />
            </button> */}
                <button className="btn glass btn-circle" onClick={toggleCam}>
                  <img src={getCamIcon()} alt="Cam" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* <div
          className={cn(
            callInterviewer,
            `bg-[#605E5E] p-10 rounded-lg items-center space-y-2 w-[30vw] duration-0 opacity-40 ${opacityClass}`
          )}
        >
          <Avatar>
            <AvatarImage
              alt="Interviewer"
              src="/Interviewer.png"
              className="h-[10vw] w-auto"
            />
            <AvatarFallback>Interviewer</AvatarFallback>
          </Avatar>
          <div className="text-white">Cat Interviewer</div>
        </div> */}
        
        <img className={`rounded-lg w-[30vw]`} src={catState === 0 ? CatWaving : catState === 1 ? CatTalking : CatStandBy} alt="catState" />

      </div>
    </>
  );
};

export default Person;
