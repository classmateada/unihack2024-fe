const Settings = () => {
  return (
    <div className="bg-[#1a1a1a] p-8">
      <div className="mt-4">
        <select className="select select-bordered select-lg w-full bg-[#2e2e2e]">
          <option disabled selected>
            Select company...
          </option>
          <option>Atlassian</option>
        </select>
        <div className="flex flex-col rounded-md border border-white p-4 mt-4 justify-center items-center">
          <div className="w-full">
            <input
              className="p-4 w-full bg-white text-black rounded-md"
              placeholder="Include your own questions..."
            />
          </div>
          <button className="btn bg-[#2e2e2e] rounded-full mt-6 mb-2 text-white border border-blue-600 hover:bg-[#363636] hover:border hover:border-blue-600">
            Add question
          </button>
        </div>
      </div>
      <div className="mt-8 flex space-x-4 justify-end">
        <button className="btn text-white bg-[#2e2e2e] hover:bg-[#363636]">
          Start interview
        </button>
        <button className="btn text-white bg-[#2e2e2e] hover:bg-[#363636]">
          Stop interview
        </button>
      </div>
    </div>
  );
};

export default Settings;
