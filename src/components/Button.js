import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary',
  disabled = false,
  loading = false,
  ...props 
}) => {
  const buttonClasses = `btn btn--${variant} ${disabled ? 'btn--disabled' : ''}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="loading-spinner">
          <svg className="spinner" viewBox="0 0 24 24">
            <circle
              className="spinner-circle"
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;