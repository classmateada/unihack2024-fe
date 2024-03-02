import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

const Text = () => {
  return (
    <div className="mt-8 flex flex-col p-4 w-full max-w-4xl">
      <div className="flex space-x-4 items-start">
        <Avatar>
          <AvatarImage
            alt="Chatbot"
            src="/Interviewer.png"
            className="w-[40px]"
          />
          <AvatarFallback>CB</AvatarFallback>
        </Avatar>
        <div className="bg-neutral-600 text-white p-4 rounded-lg">
          {`
          Hey, how was your day User?
        `}
        </div>
      </div>
      <div className="flex space-x-4 items-start mt-4 self-end">
        <div className="bg-[#009963] text-white p-4 rounded-lg">
          Hi it was great, I'm excited to be here today.
        </div>
        <Avatar>
          <AvatarImage alt="User" src="/UserSmall.png" className="w-[40px]" />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
      </div>
      <div className="mt-4 p-4 rounded-lg w-[46%] bottom-0 mb-4 absolute">
        <label className="input flex items-center gap-2 bg-[#2e2e2e]">
          <input
            type="text"
            className="grow"
            placeholder="Type message here..."
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 512 512"
            className="opacity-70"
          >
            <path
              fill="currentColor"
              d="M290.59 192c-20.18 0-106.82 1.98-162.59 85.95V192c0-52.94-43.06-96-96-96c-17.67 0-32 14.33-32 32s14.33 32 32 32c17.64 0 32 14.36 32 32v256c0 35.3 28.7 64 64 64h176c8.84 0 16-7.16 16-16v-16c0-17.67-14.33-32-32-32h-32l128-96v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V289.86c-10.29 2.67-20.89 4.54-32 4.54c-61.81 0-113.52-44.05-125.41-102.4M448 96h-64l-64-64v134.4c0 53.02 42.98 96 96 96s96-42.98 96-96V32zm-72 80c-8.84 0-16-7.16-16-16s7.16-16 16-16s16 7.16 16 16s-7.16 16-16 16m80 0c-8.84 0-16-7.16-16-16s7.16-16 16-16s16 7.16 16 16s-7.16 16-16 16"
            />
          </svg>
        </label>
      </div>
    </div>
  );
};

export default Text;
