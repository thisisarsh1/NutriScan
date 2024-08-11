"use client";

// import React, { createContext, useState, useContext } from 'react';

// // Create context with default values
// const EmailContext = createContext({
//   contextEmail: '',
//   setContextEmail: () => {},
// });
// const NameContext = createContext({
//   contextName: '',
//   setContextName: () => {},
// });
// const PassContext = createContext({
//   contextPass: '',
//   setContextPass: () => {},
// });
// const LoginInfoContext = createContext({
//   contextLogin: '',
//   setcontextLogin: () => {},
// });

// // Create a provider component
// export const MainProvider = ({ children }) => {
//   const [contextEmail, setContextEmail] = useState('');
//   const [contextName, setContextName] = useState('');
//   const [contextPass, setContextPass] = useState('');
//   const [contextLogin, setcontextLogin] = useState('');

//   return (
//     <EmailContext.Provider value={{ contextEmail, setContextEmail }}>
//       <NameContext.Provider value={{ contextName, setContextName }}>
//         <PassContext.Provider value={{ contextPass, setContextPass }}>
//           <LoginInfoContext.Provider value={{ contextLogin, setcontextLogin }}>
//             {children}
//           </LoginInfoContext.Provider>
//         </PassContext.Provider>
//       </NameContext.Provider>
//     </EmailContext.Provider>
//   );
// };

// // Custom hooks for easier context usage
// export const useEmailContext = () => {
//   const context = useContext(EmailContext);
//   if (!context) {
//     throw new Error('useEmailContext must be used within a MainProvider');
//   }
//   return context;
// };

// export const useNameContext = () => {
//   const context = useContext(NameContext);
//   if (!context) {
//     throw new Error('useNameContext must be used within a MainProvider');
//   }
//   return context;
// };

// export const usePassContext = () => {
//   const context = useContext(PassContext);
//   if (!context) {
//     throw new Error('usePassContext must be used within a MainProvider');
//   }
//   return context;
// };

// export const useLoginInfoContext = () => {
//   const context = useContext(LoginInfoContext);
//   if (!context) {
//     throw new Error('useLoginInfoContext must be used within a MainProvider');
//   }
//   return context;
// };
import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext({
  email: '',
  name: '',
  password: '',
  isLoggedIn: false,
  setEmail: () => {},
  setName: () => {},
  setPassword: () => {},
  setIsLoggedIn: () => {},
});

export const UserProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const value = {
    email,
    name,
    password,
    isLoggedIn,
    setEmail,
    setName,
    setPassword,
    setIsLoggedIn,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
