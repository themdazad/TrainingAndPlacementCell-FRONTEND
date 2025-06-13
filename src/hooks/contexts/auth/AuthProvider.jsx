import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthProvider = ({ children }) => {
  const [isLogedIn, setIsLogedIn] = useState({
    admin: false,
    student: false,
  });
  const [Loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

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
  
  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.status === 200) {
        setIsLogedIn({ admin: false, student: false }); // Reset state
        toast.error("Logged out successfully");
        navigate("/");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLogedIn, setIsLogedIn, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
