import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useState } from "react";

const Person = () => {
  const [startVideo, setstartVideo] = useState(false);

  const startCamera = () => {
    setstartVideo(true);
    navigator.getUserMedia(
			{
				video: true,
			},
			(stream) => {
				let video = document.getElementsByClassName('app__videoFeed')[0];
				if (video) {
					video.srcObject = stream;
				}
			},
			(err) => console.error(err)
		);
	};

  const stopCamera = () => {
    setstartVideo(false);
    let video = document.getElementsByClassName('app__videoFeed')[0];
		video.srcObject.getTracks()[0].stop();
  };

//   return (
//     <div className="bg-[#333333] rounded-md flex flex-row justify-center p-20 space-x-6">
//       {startVideo ? (
//         <div style={{width: "40%"}}>
//             <video
//               muted
//               autoPlay
//               className="app__videoFeed"
//             />
//     </div>
//           ) :
//       <div className="bg-[#605E5E] p-14 rounded-lg flex flex-col items-center space-y-6">
//         <div className="bg-[#D9D9D9] p-3 rounded-full">
//             <Avatar>
//               <AvatarImage alt="User" src="/User.png" className="h-[6vw]" />
//               <AvatarFallback>User</AvatarFallback>
//             </Avatar>
//         </div>
//         <div className="flex text-white space-y-10">User</div>
//         <div className="flex space-x-10">
//           <button className="btn glass btn-circle">
//             <img src="/Mic.png" />
//           </button>
//           <button onClick={startVideo ? stopCamera : startCamera} className="btn glass btn-circle">
//             <img src="/Cam.png" />
//           </button>
//         </div>
//     </div>
//     }
//     <div className="bg-[#605E5E] p-10 rounded-lg flex flex-col items-center space-y-4">
//         <Avatar>
//           <AvatarImage
//             alt="Interviewer"
//             src="/Interviewer.png"
//             className="h-[9vw]"
//           />
//           <AvatarFallback>Interviewer</AvatarFallback>
//         </Avatar>
//         <div className="text-white">Cat Interviewer</div>
//       </div>
//     </div>
//   );
// };

return (
  <div className="bg-[#333333] rounded-md flex 1 flex-row justify-center p-20 space-x-6" >
    {startVideo ? (
      <div>
        <div className="rounded-lg" style={{width: "450px"}}>
            <video
              muted
              autoPlay
              className="app__videoFeed"
            />
            <div className="flex space-x-10">
        <button className="btn glass btn-circle">
          <img src="/Mic.png" />
        </button>
        <button onClick={startVideo ? stopCamera : startCamera} className="btn glass btn-circle">
          <img src="/Cam.png" />
        </button>
      </div>
      </div>
    </div>
          ) :
    <div className="bg-[#605E5E] p-14 rounded-lg flex flex-col items-center space-y-6" style={{height: "340px", width: "250px"}}>
      <div className="bg-[#D9D9D9] p-3 rounded-full">
          <Avatar>
            <AvatarImage alt="User" src="/User.png" className="h-[6vw]" />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
      </div>
      <div className="flex text-white space-y-10">User</div>
      <div className="flex space-x-10">
        <button className="btn glass btn-circle">
          <img src="/Mic.png" />
        </button>
        <button onClick={startVideo ? stopCamera : startCamera} className="btn glass btn-circle">
          <img src="/Cam.png" />
        </button>
      </div>
  </div>
}
  <div className="bg-[#605E5E] p-10 rounded-lg flex flex-col items-center space-y-4" style={{height: "340px", width: "250px"}}>
      <Avatar>
        <AvatarImage
          alt="Interviewer"
          src="/Interviewer.png"
          className="h-[9vw]"
        />
        <AvatarFallback>Interviewer</AvatarFallback>
      </Avatar>
      <div className="text-white">Cat Interviewer</div>
    </div>
  </div>
);
};

export default Person;
