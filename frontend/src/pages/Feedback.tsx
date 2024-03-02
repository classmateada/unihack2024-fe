import FeedbackSystem from '../components/FeedbackSystem'
import { BarChart } from 'reaviz';

const DataChart = () => (
  <BarChart
    height={300}
    width={800}
    data={[
      { key: "Relevance", data: 45 },
      { key: "Clarity", data: 78 },
      { key: "Depth", data: 22 },
    ]}
  />
);

export default function Feedback() {
  return (
    <div className="flex flex-col justify-center item-center p-60" style={{height: '100vh'}}>
        <div className = "flex flex-row justify-center bg-[#333333] rounded p-20 mb-20">
            <FeedbackSystem name={"Relevance"} value = {45} duration = {0.1} feedback = {"Using dynamic class application and Tailwind CSS allows for easy adaptation to different screen sizes, promoting a responsive design approach."} />
            <FeedbackSystem name={"Clarity"} value = {78} duration = {0.1} feedback = {"Using dynamic class application and Tailwind CSS allows for easy adaptation to different screen sizes, promoting a responsive design approach."} />
            <FeedbackSystem name={"Depth"} value = {22} duration = {0.1} feedback = {"Using dynamic class application and Tailwind CSS allows for easy adaptation to different screen sizes, promoting a responsive design approach."} />
        </div>
        <div className = "flex justify-center">
          <DataChart/>
        </div>
        <div className = "flex justify-center">
        </div>
    </div>
  );
}
