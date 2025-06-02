import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [isLogedIn, setIsLogedIn] = useState({
    admin: false,
    student: false,
  });
  const [Loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

 useEffect(() => {
  const verifyLogin = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/verify-token`,
        {},
        { withCredentials: true }
      );

      if (res.status === 200) {
        const role = res.data.tokenData?.role;

        setIsAuthenticated(true);

        if (role === "admin") {
          setIsLogedIn({ admin: true, student: false });
        } else if (role === "student") {
          setIsLogedIn({ admin: false, student: true });
        } else {
          setIsLogedIn({ admin: false, student: false });
        }
      }
    } catch (err) {
      console.error("Token verification failed:", err);
      // Optionally, show a toast notification
      // toast.error("Failed to verify login. Please try again.");
      setIsAuthenticated(false);
      setIsLogedIn({ admin: false, student: false });
    } finally {
      setLoading(false);  
    }
  };

  verifyLogin();
}, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLogedIn, setIsLogedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
