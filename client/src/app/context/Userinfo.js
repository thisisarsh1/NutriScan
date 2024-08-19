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

// Define the shape of the context value
const UserContext = createContext({
  contextemail: '',
  contextname: '',
  contextpassword: '',
  contextisLoggedIn: false,
  contextnutri: '',
  contextimg: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  

  contextsetEmail: () => {},
  contextsetName: () => {},
  contextsetPassword: () => {},
  contextsetIsLoggedIn: () => {},
  contextsetnutri: () => {},
  contextsetimg: () => {},
});

export const UserProvider = ({ children }) => {
  const [contextemail, contextsetEmail] = useState('');
  const [contextname, contextsetName] = useState('');
  const [contextpassword, contextsetPassword] = useState('');
  const [contextisLoggedIn, contextsetIsLoggedIn] = useState(false);
  const [contextnutri, contextsetnutri] = useState('');
  const [contextimg, contextsetimg] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');

  const value = {
    contextemail,
    contextname,
    contextpassword,
    contextisLoggedIn,
    contextnutri,
    contextimg,
    contextsetEmail,
    contextsetName,
    contextsetPassword,
    contextsetIsLoggedIn,
    contextsetnutri,
    contextsetimg
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
