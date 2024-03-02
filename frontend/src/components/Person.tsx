import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useRef, useState } from "react";

const Person = () => {
  const [isMicOn, setIsMicOn] = useState(false);
  const [isCamOn, setIsCamOn] = useState(false);

  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null); // Define the state with type Blob | null

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef(new MediaRecorder(new MediaStream()));

  const toggleMic = () => {
    setIsMicOn(!isMicOn);

    if (!isMicOn) {
      // When turning the mic on
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          if (!isRecording) {
            audioRef.current = new MediaRecorder(stream);
            audioRef.current.start();
            setIsRecording(true);

            const chunks: BlobPart[] = []; // Define the type of chunks explicitly
            audioRef.current.ondataavailable = (e) => {
              chunks.push(e.data);
            };

            audioRef.current.ondataavailable = (e) => {
              chunks.push(e.data);
            };

            audioRef.current.onstop = () => {
              const audioBlob = new Blob(chunks, {
                type: "audio/ogg; codecs=opus",
              });
              setAudioBlob(audioBlob);
            };
          }
        })
        .catch((err) => {
          console.error("Failed to get audio stream", err);
        });
    } else {
      // When turning the mic off
      if (isRecording) {
        audioRef.current.stop();
        setIsRecording(false);
      }
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
    <div className="bg-[#333333] rounded-md flex flex-row justify-center p-20 space-x-6">
      <div className="bg-[#605E5E] p-7 rounded-lg flex flex-col items-center space-y-6 w-[30vw]">
        {/* Conditional rendering based on camera status */}
        {isCamOn ? (
          <video
            ref={videoRef}
            autoPlay
            className="h-[10vw] scale-[1.3] w-auto rounded-sm mt-4 mb-2"
          />
        ) : (
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
        )}
        <div className="text-white">User</div>
        <div className="flex space-x-10">
          <button className="btn glass btn-circle" onClick={toggleMic}>
            <img src={getMicIcon()} alt="Mic" />
          </button>
          <button className="btn glass btn-circle" onClick={toggleCam}>
            <img src={getCamIcon()} alt="Cam" />
          </button>
        </div>
      </div>
      <div className="bg-[#605E5E] p-10 rounded-lg flex flex-col items-center space-y-2 w-[30vw]">
        <Avatar>
          <AvatarImage
            alt="Interviewer"
            src="/Interviewer.png"
            className="h-[10vw] w-auto"
          />
          <AvatarFallback>Interviewer</AvatarFallback>
        </Avatar>
        <div className="text-white">Cat Interviewer</div>
      </div>
    </div>
  );
};

export default Person;
