import React, { useState } from 'react';
import './Input.css';

const Input = ({ 
  type = 'text', 
  name, 
  value, 
  onChange, 
  placeholder, 
  label, 
  required = false, 
  error,
  showPasswordToggle = false,
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const isPasswordField = type === 'password' || showPasswordToggle;
  const inputType = isPasswordField ? (showPassword ? 'text' : 'password') : type;
  const inputClasses = `input ${error ? 'input--error' : ''} ${isPasswordField ? 'input--with-icon' : ''}`;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="input-group">
      {label && (
        <label htmlFor={name} className="input-label">
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      <div className="input-wrapper">
        <input
          type={inputType}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={inputClasses}
          {...props}
        />
        {isPasswordField && (
          <button
            type="button"
            className="password-toggle"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <span className="material-icons">
              {showPassword ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        )}
      </div>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default Input;