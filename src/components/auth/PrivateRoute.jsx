import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const PrivateRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(true); // To prevent premature redirect

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/verify-token`,
          {},
          {
            withCredentials: true,
          }
        );
        setIsValid(res.status === 200);
      } catch (err) {
        setIsValid(false);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  if (loading) return null; // Or show a spinner

  return (isValid ? children : <Navigate to="/" />)
};

export default PrivateRoute;
