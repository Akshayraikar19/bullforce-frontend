import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  // Initialize the email state with value from localStorage if it exists
  const [email, setEmail] = useState(localStorage.getItem('email') || '');

  // Use useEffect to update localStorage whenever the email changes
  useEffect(() => {
    if (email) {
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('email'); // Clear email from localStorage if it's set to an empty string
    }
  }, [email]);

  return (
    <AuthContext.Provider value={{ email, setEmail }}>
      {children}
    </AuthContext.Provider>
  );
};