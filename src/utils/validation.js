// Validation utility functions
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

export const validatePasswordMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

// Validation for step 1
export const validateStep1 = (formData) => {
  const errors = {};
  
  if (!validateRequired(formData.fullName)) {
    errors.fullName = 'Full name is required';
  }
  
  if (!validateRequired(formData.email)) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  return errors;
};

// Validation for step 2
export const validateStep2 = (formData) => {
  const errors = {};
  
  if (!validateRequired(formData.password)) {
    errors.password = 'Password is required';
  } else if (!validatePassword(formData.password)) {
    errors.password = 'Password must be at least 6 characters long';
  }
  
  if (!validateRequired(formData.confirmPassword)) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (!validatePasswordMatch(formData.password, formData.confirmPassword)) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  return errors;
};