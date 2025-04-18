import { useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [isLogedIn, setIsLogedIn] = useState({
    admin: false,
    student: false,
  });
  const [loading, setLoading] = useState(true); // To handle loading state

  useEffect(() => {
    const fetchUserRole = async () => {
      const token = localStorage.getItem("Token");

      if (!token) {
        setIsLogedIn({ admin: false, student: false });
        setLoading(false);
        return;
      }

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/verify-token`,
          {}, // Empty body
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 200 && res.data.role) {
          const role = res.data.role;
          if (role === "admin") {
            setIsLogedIn({ admin: true, student: false });
          } else if (role === "student") {
            setIsLogedIn({ admin: false, student: true });
          }
        } else {
          setIsLogedIn({ admin: false, student: false });
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        setIsLogedIn({ admin: false, student: false });
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);


  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while fetching role
  }

  return (
    <AuthContext.Provider value={ isLogedIn }>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;