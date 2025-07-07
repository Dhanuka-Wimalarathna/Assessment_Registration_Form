import React from 'react';
import { FORM_STEPS, STEP_LABELS } from '../utils/constants';
import './ProgressIndicator.css';

const ProgressIndicator = ({ currentStep }) => {
  const steps = Object.values(FORM_STEPS);
  const totalSteps = steps.length;
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="progress-indicator">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="step-labels">
        {steps.map((step) => (
          <div 
            key={step}
            className={`step-label ${currentStep >= step ? 'step-label--active' : ''}`}
          >
            <div className="step-number">
              {currentStep > step ? (
                <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                step
              )}
            </div>
            <span className="step-text">{STEP_LABELS[step]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;