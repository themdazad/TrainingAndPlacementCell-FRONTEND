import { Button, Card, CardBody, Input, Link } from "@heroui/react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const StudentLogin = () => {
  const navigate = useNavigate();
  const [registrationNo, setRegistrationNo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Start loading
    setLoading(true);

    // Validate inputs
    if (!registrationNo || !password) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      // Send login request
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/student/login`,
        { registrationNo, password }
      );

      // Handle successful login
      if (res.status === 200) {
        toast.success("Logged in successfully");
        localStorage.setItem("Token", res.data.token); // Save token
        navigate("/dashboard/student"); // Redirect to dashboard
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      // Handle errors
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      toast.error(`Login Failed: ${errorMessage}`);
    } finally {
      // Stop loading
      setLoading(false);
    }
  };  

  return(
    <div className="flex items-center justify-center min-h-screen">
      <ToastContainer />
      <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl">
        <CardBody>
          <h2 className="text-2xl font-bold text-center mb-6">Student Login</h2>
          <div className="space-y-4">
            <Input
              type="text"
              label="Registration No"
              placeholder="Enter your registration number"
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
