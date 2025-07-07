import React from 'react';
import { useForm } from '../context/FormContext';
import { FORM_STEPS } from '../utils/constants';
import ProgressIndicator from '../components/ProgressIndicator';
import Step1PersonalInfo from './Step1PersonalInfo';
import Step2Security from './Step2Security';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const { currentStep } = useForm();

  const renderCurrentStep = () => {
    switch (currentStep) {
      case FORM_STEPS.PERSONAL_INFO:
        return <Step1PersonalInfo />;
      case FORM_STEPS.SECURITY:
        return <Step2Security />;
      default:
        return <Step1PersonalInfo />;
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <div className="registration-header">
          <h1 className="registration-title">Create Your Account</h1>
          <p className="registration-subtitle">
            Join us today and start your journey
          </p>
        </div>
        
        <ProgressIndicator currentStep={currentStep} />
        
        <div className="registration-content">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;