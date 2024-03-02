import Person from "../components/Person";
import Settings from "../components/Settings";
import Text from "../components/Text";

export default function Home() {
  return (
    <div>
      <div>
        <Person />
        <div className="grid grid-cols-2">
          <Text />
          <Settings />
        </div>
      </div>
    </div>
  );
}
