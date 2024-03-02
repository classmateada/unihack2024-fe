import Person from "../components/Person";
import Settings from "../components/Settings";
import Text from "../components/Text";

export default function Home() {
  return (
    <div>
      <div>
        <Person />
        <div className="grid grid-cols-2 px-14 ">
          <div className="overflow-y-auto h-80">
            <Text />
          </div>
          <Settings />
        </div>
      </div>
    </div>
  );
}
