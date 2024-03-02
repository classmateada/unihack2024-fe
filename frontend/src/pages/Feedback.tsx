import FeedbackSystem from '../components/FeedbackSystem'

export default function Feedback() {
  return (
    <div className="flex flex-col justify-center item-center p-60" style={{height: '70vh'}}>
        <div className = "flex flex-row justify-center bg-[#333333] rounded p-20">
            <FeedbackSystem name={"Relevance"} value = {78} duration = {0.1} feedback = {"Using dynamic class application and Tailwind CSS allows for easy adaptation to different screen sizes, promoting a responsive design approach."} />
            <FeedbackSystem name={"Clarity"} value = {78} duration = {0.1} feedback = {"Using dynamic class application and Tailwind CSS allows for easy adaptation to different screen sizes, promoting a responsive design approach."} />
            <FeedbackSystem name={"Depth"} value = {78} duration = {0.1} feedback = {"Using dynamic class application and Tailwind CSS allows for easy adaptation to different screen sizes, promoting a responsive design approach."} />
        </div>
    </div>
  );
}
