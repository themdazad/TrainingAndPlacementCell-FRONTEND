import { Button, Card, CardBody, Input, Link } from "@heroui/react";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const StudentLogin = () => {
  const navigate = useNavigate();
  const [registrationNo, setRegistrationNo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
  
    if (!registrationNo || !password) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/student/login`,
        {
          registrationNo,
          password,
        }
      );
  
      if (response.status === 200 && response.data.token) {
        toast.success("Logged in");
        // Save token and optional info
        localStorage.setItem("Token", response.data.token);
  
        navigate("/dashboard/student");
      } else {
        toast.error("Invalid credentials!");
      }
    } catch (error) {
      toast.error(
        `Login Failed: ${
          error.response?.data?.message || error.message || "An error occurred"
        }`
      );
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen">
      <ToastContainer />
      <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl">
        <CardBody>
          <h2 className="text-2xl font-bold text-center mb-6">Student Login</h2>
          <div className="space-y-4">
            <Input
              type="registrationNo"
              label="Registration No"
              placeholder="Enter your registration No"
              value={registrationNo}
              onChange={(e) => setRegistrationNo(e.target.value)}
              className="w-full"
            />
            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
            <Button
              color="primary"
              className="w-full mt-4"
              isLoading={loading}
              onPress={handleLogin}
            >
              Login
            </Button>
            <div className="text-center mt-4">
              <Link href="/forgot-password" color="primary">
                Forgot Password?
              </Link>
            </div>
            <div className="text-center mt-2">
              <span className="text-gray-600">Not registered?</span>{" "}
              <NavLink to="/auth/student/register" className="text-primary">
                Sign Up
              </NavLink>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default StudentLogin;
