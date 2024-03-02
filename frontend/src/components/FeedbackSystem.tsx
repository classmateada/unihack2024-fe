import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface AnimatedProgressBarProps {
    name: string
    value: number;
    duration: number;
}

const AnimatedProgressBar: React.FC<AnimatedProgressBarProps> = ({ name, value, duration, feedback }) => {
  const [progress, setProgress] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let start = 0;
    const end = value;

    const animationDuration = duration * 100;
    const incrementTime = (animationDuration / end) * 200;

    const timer = setInterval(() => {
      start += 1;
      setProgress(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => {
      clearInterval(timer);
    };
  }, [value, duration]);

    const handleToggleTextBox = () => {
        setIsOpen(!isOpen);
    };

  return (
    <div className = "flex flex-col justify-center items-center cursor-pointer ${isOpen ? 'cursor-default' : ''}`"
        style={{ width: '300px', marginTop: isOpen ? '20px' : '0'}}
        onClick={handleToggleTextBox}
        >
        <h1 className="mb-4 text-3xl font-bold text-blue-500 text-center"> {name} </h1>
      <div
        style={{ width: '150px'}}
        ><CircularProgressbar
        value={progress}
        text={`${progress}%`}
        styles={buildStyles({
          pathTransitionDuration: 1,
          pathColor: `rgba(62, 152, 199, ${progress / 100})`,
          textColor: '#f88',
          trailColor: '#d6d6d6',
          backgroundColor: '#3e98c7',
        })}
      />
    </div>
      {isOpen && (
        <div className="mt-4 p-2 border border-gray-300 rounded text-center flex items-center" style={{ width: '300px', height: '200px' }}>
          <p> {feedback}</p>
        </div>
      )}
    </div>
  );
};

export default AnimatedProgressBar;