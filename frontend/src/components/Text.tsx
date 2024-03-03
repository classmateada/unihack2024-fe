import { useState, useRef, useEffect } from "react";
import axios from "axios";

const Text = ({
  selectedOption,
  response,
  chatLog,
  setChatLog,
}: {
  selectedOption: string;
  chatLog: { type: string; message: string }[];
  response: string;
  setChatLog: React.Dispatch<
    React.SetStateAction<
      {
        type: string;
        message: string;
      }[]
    >
  >;
}) => {
  const [inputValue, setInputValue] = useState("");
  //   const [chatLog, setChatLog] = useState<{ type: string; message: string }[]>(
  //     []
  //   );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chatLog]);
  useEffect(() => {
    console.log("Chatlog:", chatLog);
  }, [chatLog]);

  useEffect(() => {
    setChatLog((prevChatLog) => [
      ...prevChatLog,
      {
        type: "bot",
        message: response,
      },
    ]);
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { type: "user", message: inputValue },
    ]);

    sendMessage(inputValue);

    setInputValue("");
  };

  // ChatGPT API call here
  const sendMessage = (message: string) => {
    const url = "https://api.openai.com/v1/chat/completions";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        import.meta.env.VITE_NEXT_PUBLIC_OPENAI_API_KEY
      }`,
    };
    const role = selectedOption;
    const data: object = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an interviewer from ${role} currently doing a behavioural interview, answer any questions the user asks (respond in one sentence)`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    };

    if (selectedOption !== "") {
      setIsLoading(true);

      axios
        .post(url, data, { headers: headers })
        .then((response) => {
          console.log(response);
          setChatLog((prevChatLog) => [
            ...prevChatLog,
            { type: "bot", message: response.data.choices[0].message.content },
          ]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      if (inputValue.trim() !== "") {
        console.log("Select a company before starting interview");
        setIsLoading(true);

        axios
          .post(url, data, { headers: headers })
          .then((response) => {
            console.log(response);
            setChatLog((prevChatLog) => [
              ...prevChatLog,
              {
                type: "bot",
                message: "Select a company before starting interview",
              },
            ]);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }
  };

  return (
    <div className="mt-8 flex flex-col p-4 w-full max-w-4xl">
      <div className="flex flex-col gap-4 max-h-32">
        <div className="flex space-x-4 items-start">
          {chatLog.length === 0 && (
            <div className="bg-neutral-600 text-white p-4 rounded-lg">
              Ready to start the interview? ≽^•⩊•^≼
            </div>
          )}
        </div>
        {chatLog.map(
          (message, index) =>
            message.message.trim() !== "" && (
              <div
                className={`flex space-x-4 mt-2 ${
                  message.type === "user" ? "self-end" : "self-start"
                }`}
                key={index}
              >
                <div
                  className={` text-white p-4 rounded-lg ${
                    message.type === "user" ? "bg-blue-500" : "bg-[#888888]"
                  }`}
                >
                  {message.message}
                </div>
                <div ref={messagesEndRef} />
              </div>
            )
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mt-4 p-4 rounded-lg w-[46%] bottom-0 mb-4 absolute">
          <label className="input flex items-center gap-2 bg-[#2e2e2e]">
            <input
              type="text"
              className="grow"
              placeholder="Type message here..."
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
            />
            <button type="submit">
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
            </button>
          </label>
        </div>
      </form>
    </div>
  );
};

export default Text;
