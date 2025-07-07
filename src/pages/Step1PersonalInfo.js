import React from 'react';
import { useForm } from '../context/FormContext';
import { validateStep1 } from '../utils/validation';
import { FORM_STEPS } from '../utils/constants';
import Input from '../components/Input';
import Button from '../components/Button';

const Step1PersonalInfo = () => {
  const { 
    formData, 
    errors, 
    updateFormData, 
    setErrors, 
    setCurrentStep 
  } = useForm();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleNext = () => {
    const validationErrors = validateStep1(formData);
    
    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      setCurrentStep(FORM_STEPS.SECURITY);
    } else {
      setErrors(validationErrors);
    }
  };

  // Check if step 1 is valid
  const isStep1Valid = () => {
    const validationErrors = validateStep1(formData);
    return Object.keys(validationErrors).length === 0;
  };

  return (
    <div className="form-step">
      <h2 className="step-title">Personal Information</h2>
      <p className="step-description">
        Please provide your basic information to get started.
      </p>
      
      <div className="form-fields">
        <Input
          name="fullName"
          label="Full Name"
          value={formData.fullName}
          onChange={handleInputChange}
          placeholder="Enter your full name"
          required
          error={errors.fullName}
        />

        <Input
          type="email"
          name="email"
          label="Email Address"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email address"
          required
          error={errors.email}
        />

        <Input
          type="tel"
          name="phone"
          label="Phone Number"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Enter your phone number (optional)"
          error={errors.phone}
        />
      </div>

      <div className="form-actions">
        <Button
          variant="primary"
          onClick={handleNext}
          disabled={!isStep1Valid()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Step1PersonalInfo;