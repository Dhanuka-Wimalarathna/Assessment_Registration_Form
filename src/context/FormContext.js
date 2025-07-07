import React, { createContext, useContext, useReducer } from 'react';
import { FORM_STEPS } from '../utils/constants';

// Initial state
const initialState = {
  currentStep: FORM_STEPS.PERSONAL_INFO,
  formData: {
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  },
  errors: {},
  isSubmitting: false,
  isSubmitted: false
};

// Action types
const ACTION_TYPES = {
  SET_CURRENT_STEP: 'SET_CURRENT_STEP',
  UPDATE_FORM_DATA: 'UPDATE_FORM_DATA',
  SET_ERRORS: 'SET_ERRORS',
  SET_SUBMITTING: 'SET_SUBMITTING',
  SET_SUBMITTED: 'SET_SUBMITTED',
  RESET_FORM: 'RESET_FORM'
};

// Reducer function
const formReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_CURRENT_STEP:
      return {
        ...state,
        currentStep: action.payload
      };
    case ACTION_TYPES.UPDATE_FORM_DATA:
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.payload
        }
      };
    case ACTION_TYPES.SET_ERRORS:
      return {
        ...state,
        errors: action.payload
      };
    case ACTION_TYPES.SET_SUBMITTING:
      return {
        ...state,
        isSubmitting: action.payload
      };
    case ACTION_TYPES.SET_SUBMITTED:
      return {
        ...state,
        isSubmitted: action.payload
      };
    case ACTION_TYPES.RESET_FORM:
      return initialState;
    default:
      return state;
  }
};

// Create context
const FormContext = createContext();

// Context provider component
export const FormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  // Action creators
  const setCurrentStep = (step) => {
    dispatch({ type: ACTION_TYPES.SET_CURRENT_STEP, payload: step });
  };

  const updateFormData = (data) => {
    dispatch({ type: ACTION_TYPES.UPDATE_FORM_DATA, payload: data });
  };

  const setErrors = (errors) => {
    dispatch({ type: ACTION_TYPES.SET_ERRORS, payload: errors });
  };

  const setSubmitting = (isSubmitting) => {
    dispatch({ type: ACTION_TYPES.SET_SUBMITTING, payload: isSubmitting });
  };

  const setSubmitted = (isSubmitted) => {
    dispatch({ type: ACTION_TYPES.SET_SUBMITTED, payload: isSubmitted });
  };

  const resetForm = () => {
    dispatch({ type: ACTION_TYPES.RESET_FORM });
  };

  const value = {
    ...state,
    setCurrentStep,
    updateFormData,
    setErrors,
    setSubmitting,
    setSubmitted,
    resetForm
  };

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
};

// Custom hook to use form context
export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};