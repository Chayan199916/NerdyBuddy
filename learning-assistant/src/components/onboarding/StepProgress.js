import React from 'react';
// import './StepProgress.css';  // Assume CSS for styling

const StepProgress = ({ step }) => {
    return (
        <div className="progress-bar">
            <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1</div>
            <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2</div>
            <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>3</div>
        </div>
    );
};

export default StepProgress;
