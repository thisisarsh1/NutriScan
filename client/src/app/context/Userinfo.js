"use client"
import { createContext, useState, useContext } from 'react';

// Create Email and Name contexts with default values
const EmailContext = createContext({
  contextEmail: '',
  setContextEmail: () => {}, // Default no-op function
});
const NameContext = createContext({
  contextName: '',
  setContextName: () => {}, // Default no-op function
});

// Create a provider component
export const MainProvider = ({ children }) => {
  const [contextEmail, setContextEmail] = useState('');
  const [contextName, setContextName] = useState('');

  return (
    <EmailContext.Provider value={{ contextEmail, setContextEmail }}>
      <NameContext.Provider value={{ contextName, setContextName }}>
        {children}
      </NameContext.Provider>
    </EmailContext.Provider>
  );
};

// Custom hook for easier context usage
export const useEmailContext = () => {
  const context = useContext(EmailContext);
  if (context === undefined) {
    throw new Error('useEmailContext must be used within an EmailProvider');
  }
  return context;
};

export const useNameContext = () => {
  const context = useContext(NameContext);
  if (context === undefined) {
    throw new Error('useNameContext must be used within a NameProvider');
  }
  return context;
};
