import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import VisibilitySensor from 'react-visibility-sensor';

function FeedbackSystem({}) {
    const percentage = 66;
    return <div>
        <CircularProgressbar
    value={percentage}
    text={`${percentage}%`}
    styles={buildStyles({
        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
        strokeLinecap: 'butt',

        // Text size
        textSize: '8px',

        // How long animation takes to go from one percentage to another, in seconds
        pathTransitionDuration: 0.5,

        // Colors
        pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
        textColor: '#f88',
        trailColor: '#d6d6d6',
        backgroundColor: '#3e98c7',
    })}
    />
    </div>;


}

export default FeedbackSystem;
