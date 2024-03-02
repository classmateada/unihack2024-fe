import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

const Person = () => {
  return (
    <div className="bg-[#333333] rounded-md flex flex-row justify-center p-20 space-x-6">
      <div className="bg-[#605E5E] p-14 rounded-lg flex flex-col items-center space-y-6">
        <div className="bg-[#D9D9D9] p-3 rounded-full">
          <Avatar>
            <AvatarImage alt="User" src="/User.png" className="h-[6vw]" />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
        </div>
        <div className="text-white">User</div>
        <div className="flex space-x-10">
          <button className="btn glass btn-circle">
            <img src="/Mic.png" />
          </button>
          <button className="btn glass btn-circle">
            <img src="/Cam.png" />
          </button>
        </div>
      </div>
      <div className="bg-[#605E5E] p-10 rounded-lg flex flex-col items-center space-y-4">
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
