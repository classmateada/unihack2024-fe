import TextToSpeech from "../TextToVoice/TextToVoice";
import Countdown from "react-countdown";

// Define the props type for Settings
interface SettingsProps {
  setSelectedOption: (value: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ setSelectedOption }) => {
  // Countdown component
  const Completionist = () => <span>Times up!</span>;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className="bg-[#1a1a1a] p-8 ml-10">
      <div className="mt-4">
        <select
          className="select select-bordered select-lg w-full bg-[#2e2e2e]"
          onChange={handleChange}
          defaultValue="" // To address the controlled component aspect
        >
          <option disabled value="">
            Select company...
          </option>
          <option value="Atlassian">Atlassian</option>
        </select>

        {/* <div className="flex flex-col rounded-md border border-white p-4 mt-4 justify-center items-center">
          <div className="w-full">
            <input
              className="p-4 w-full bg-white text-black rounded-md"
              placeholder="Include your own questions..."
            />
          </div>
          <button className="btn bg-[#2e2e2e] rounded-full mt-6 mb-2 text-white border border-blue-600 hover:bg-[#363636] hover:border hover:border-blue-600">
            Add question
          </button>
        </div> */}
      </div>
      <TextToSpeech text={"Hey, how was your day today?"} />
    </div>
  );
};

export default Settings;
