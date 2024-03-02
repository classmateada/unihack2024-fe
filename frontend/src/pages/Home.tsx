import Person from "../components/Person";
import Settings from "../components/Settings";
import Text from "../components/Text";
import React, { useState } from "react";

export default function Home() {
  const [selectedOption, setSelectedOption] = useState<string>("");

  return (
    <div>
      <div>
        <Person />
        <div className="grid grid-cols-2 px-14 ">
          <div className="overflow-y-auto h-80">
            <Text selectedOption={selectedOption} />
          </div>
          <Settings setSelectedOption={setSelectedOption} />
        </div>
      </div>
    </div>
  );
}
