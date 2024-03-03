import FeedbackSystem from '../components/FeedbackSystem'
import { BarChart } from 'reaviz';
import { useLocation , useNavigate } from "react-router-dom"
import { useEffect } from 'react';

const DataChart = () => (
  <BarChart
    height={300}
    width={800}
    data={[
      { key: "Relevance", data: 20 },
      { key: "Clarity", data: 60 },
      { key: "Depth", data: 10 },
    ]}
  />
);

export default function Feedback() {
  const navigate = useNavigate()

  
  // Get parameter from url
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const rating = searchParams.get('rating');

  // Get input from parameters
  useEffect(() => {
    if (rating != null) {
  //   console.log({rating});
  //   const sentences = rating.split('.').filter(
  //     (sentence) => {return !(sentence in ["1", "2", "3", "4"])}
  //     );
  //   const re = new RegExp('\w+: ([0-5])/([0-5]) (.*)');
    
  //   console.log("It dies here");
  //   console.log(sentences[0].substring(0, sentences[0].length - 1));
  //   console.log(sentences[1].substring(0, sentences[1].length - 1));


  //   const result = sentences.reduce((prev, sentence) => {
  //       console.log("here: " + sentence)
  //   const r = sentence.match(re);
  //       console.log(r)
  //       return [...prev, [r[1], r[2], r[3]]];
  //   }, []);
  // }

  // const sentence = "1. relevance: 1/5 (The response does not directly address the questions asked)";
  const re = new RegExp('\\d+\\.\\s+([^:]+):\\s+([\\d/]+)\\s+\\((.+)\\)');
  const match = rating.match(re);

  if (match) {
    const [, criteria, rating, comment] = match;
    console.log(criteria); // 'relevance'
    console.log(rating); // '1/5'
    console.log(comment); // 'The response does not directly address the questions asked'
  } else {
    console.log("No match found");
  }

}
  }, [rating]);

  const goToHomePage=()=>{
    navigate("/");
  }
  
  return (
    <div>
      <div className="flex mt-8 mr-8 justify-end">
        <button onClick={() => goToHomePage()} className="btn text-white bg-[#2e2e2e] hover:bg-[#363636]">
                Go Home
        </button>  
      </div>
      <div className="flex flex-col justify-center item-center p-60" style={{height: '100vh'}}>
          <div className = "flex flex-row justify-center bg-[#333333] rounded p-20 mb-20">
              <FeedbackSystem name={"Relevance"} value = {20} duration = {0.1} feedback = {"The response does not directly address the questions asked."} />
              <FeedbackSystem name={"Clarity"} value = {30} duration = {0.1} feedback = {"Using dynamic class application and Tailwind CSS allows for easy adaptation to different screen sizes, promoting a responsive design approach."} />
              <FeedbackSystem name={"Depth"} value = {10} duration = {0.1} feedback = {"Using dynamic class application and Tailwind CSS allows for easy adaptation to different screen sizes, promoting a responsive design approach."} />
          </div>
          <div className = "flex justify-center">
            <DataChart/>
          </div>
      </div>
    </div>
  );
}
