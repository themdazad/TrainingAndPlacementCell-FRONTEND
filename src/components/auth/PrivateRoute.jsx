import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const PrivateRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);
  const token = localStorage.getItem("Token");

  useEffect(() => {
    const verifyToken = async () => {
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

    if (token) {
      verifyToken();
    } else {
      setIsValid(false);
    }
  }, [token]);

  if (isValid === null) {
    return <div>Loading...</div>; // Show a loading indicator while verifying
  }

  return isValid ? children : <Navigate to="/auth/student/login" />;
};

export default PrivateRoute;
