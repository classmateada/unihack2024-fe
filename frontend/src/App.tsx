import "./App.css";
import VoiceToText from "./VoiceToText";
import TextToSpeech from './TextToVoice/TextToVoice'
import FeedbackSystem from './FeedbackSystem'

function App() {
  return (
    <>
      <h1>Vite + React</h1>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
      <VoiceToText/>
      {/* Text input: What the AI should say */}
      <TextToSpeech text={"TypeScript is a popular way to add type definitions to JavaScript codebases. Out of the box, TypeScript supports JSX and you can get full React Web support by adding @types/react and @types/react-dom to your project."}/>
      {/* Change only value:  */}
      <FeedbackSystem name={"Relevance"} value={67} duration={0.1} feedback={"Clarity and Readability: Your code is generally clear and easy to read. Variable and function names are descriptive, making it easier for others (and your future self) to understand what each part of the code does."}/>
    </>
  );
}

export default App;
