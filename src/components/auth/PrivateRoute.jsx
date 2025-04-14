import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const PrivateRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);
  const studentToken = localStorage.getItem("isStudentLoggedin");

  useEffect(() => {
    if (studentToken) {
      setIsValid(true);
    } else {
      setIsValid(null);
    }
  }, [studentToken]);

  return isValid ? children : <Navigate to="/auth/student/login" />;
};

export default PrivateRoute;
