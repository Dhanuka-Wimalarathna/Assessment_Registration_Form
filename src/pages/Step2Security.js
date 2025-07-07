import React, { useState } from 'react';
import { useForm } from '../context/FormContext';
import { validateStep2 } from '../utils/validation';
import { FORM_STEPS } from '../utils/constants';
import { registrationService } from '../services/registrationService';
import Input from '../components/Input';
import Button from '../components/Button';

const Step2Security = () => {
  const { 
    formData, 
    errors, 
    isSubmitting,
    updateFormData, 
    setErrors, 
    setCurrentStep,
    setSubmitting,
    setSubmitted
  } = useForm();

  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    
    // Clear submit error when user makes changes
    if (submitError) {
      setSubmitError('');
    }
  };

  const handleBack = () => {
    setCurrentStep(FORM_STEPS.PERSONAL_INFO);
  };

  const handleSubmit = async () => {
    const validationErrors = validateStep2(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);
    setSubmitError('');

    try {
      const result = await registrationService.register(formData);
      
      if (result.success) {
        setSubmitSuccess(result.message);
        setSubmitted(true);
      } else {
        setSubmitError(result.error);
      }
    } catch (error) {
      setSubmitError('An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Check if step 2 is valid
  const isStep2Valid = () => {
    const validationErrors = validateStep2(formData);
    return Object.keys(validationErrors).length === 0;
  };

  if (submitSuccess) {
    return (
      <div className="form-step">
        <div className="success-message">
          <svg className="success-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <h2>Registration Successful!</h2>
          <p>{submitSuccess}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="form-step">
      <h2 className="step-title">Security</h2>
      <p className="step-description">
        Create a secure password for your account.
      </p>
      
      <div className="form-fields">
        <Input
          type="password"
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Enter your password"
          required
          error={errors.password}
          showPasswordToggle={true}
        />

        <Input
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm your password"
          required
          error={errors.confirmPassword}
          showPasswordToggle={true}
        />
      </div>

      {submitError && (
        <div className="error-banner">
          <span className="error-icon">⚠️</span>
          {submitError}
        </div>
      )}

      <div className="form-actions">
        <Button
          variant="secondary"
          onClick={handleBack}
          disabled={isSubmitting}
        >
          Back
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!isStep2Valid() || isSubmitting}
          loading={isSubmitting}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Step2Security;