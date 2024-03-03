import FeedbackSystem from '../components/FeedbackSystem'
import { BarChart } from 'reaviz';
import { useLocation , useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';


export default function Feedback() {
  const navigate = useNavigate()

  
  // Get parameter from url
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const rating = searchParams.get('rating');
  const [matches, setMatches] = useState([]);

  // Get input from parameters
  useEffect(() => {
    if (rating != null) {
    const re = /\d+\.\s+/g;
    const regex = /(\w+):\s([\d/]+)\s\(([^)]+)\)/g;
    const result = rating.replace(re, ' ');
    const newMatches = [];

    let match;
    while ((match = regex.exec(result)) !== null) {
      const [, criteria, rating, comment] = match;
      newMatches.push({ criteria, rating, comment });
    }

    console.log(newMatches);
    setMatches(newMatches);

    }
    }, [rating]);

    const DataChart = () => (
      <BarChart
        height={300}
        width={800}
        data={matches.map(matches => ({ key: matches.criteria, data: parseInt(matches.rating) * 10 }))}
      />
    );

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
              <FeedbackSystem name={"Relevance"} value = {parseInt(matches[0].rating) * 10} duration = {0.1} feedback = {matches[0].comment} />
              <FeedbackSystem name={"Clarity"} value = {parseInt(matches[1].rating) * 10} duration = {0.1} feedback = {matches[1].comment} />
              <FeedbackSystem name={"Depth"} value = {parseInt(matches[2].rating) * 10} duration = {0.1} feedback = {matches[2].comment} />
              <FeedbackSystem name={"Examples"} value = {parseInt(matches[3].rating) * 10} duration = {0.1} feedback = {matches[3].comment} />
          </div>
          <div className = "flex justify-center">
            <DataChart/>
          </div>
      </div>
    </div>
  );
}
