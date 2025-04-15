import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const PrivateRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);
  const token = localStorage.getItem("Token"); // Make sure this is the JWT token

  useEffect(() => {
    const validateToken = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/verify-token`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 200) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } catch (err) {
        console.error("Token verification failed:", err);
        setIsValid(false);
      }
    };

    validateToken();
  }, [token]);

  if (isValid === null) {
    return <div>Loading...</div>; // Optional loader
  }

  return isValid ? children : <Navigate to="/auth/student/login" />;
};

export default PrivateRoute;
