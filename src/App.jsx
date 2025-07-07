import React from 'react';
import { FormProvider } from './context/FormContext';
import RegistrationForm from './pages/RegistrationForm';
import './App.css';

function App() {
  return (
    <FormProvider>
      <div className="App">
        <RegistrationForm />
      </div>
    </FormProvider>
  );
}

export default App;