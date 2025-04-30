import { Button, Card, CardBody, Input, Link } from "@heroui/react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";

const StudentLogin = () => {
  const navigate = useNavigate();
  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Start loading
    setLoading(true);

    // Validate inputs
    if (!regNo || !password) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      // Send login request
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/student/login`,
        { regNo, password },
        {
          withCredentials: true
        }
      );

      // Handle successful login
      if (res.status === 200) {

        // Token automatically save in Cookies by backend
        toast.success("Logged in successfully");
        setTimeout(() => {
          navigate("/dashboard/student"); // Redirect to dashboard
        }, 1000);
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

  return (
    <div className="flex items-center justify-center min-h-[100dvh]">
      <ToastContainer />
      <Card className="w-full max-w-md p-6 m-[5%] shadow-lg rounded-2xl">
        <CardBody>
          <h2 className="text-2xl font-bold text-center mb-6">Student Login</h2>
          <div>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <Input
                type="text"
                label="Registration No"
                placeholder="Enter your registration number"
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
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
                type="submit"
                color="primary"
                className="w-full mt-4"
                isLoading={loading}
              >
                Login
              </Button>
            </form>

            <div className="text-center mt-4">
              <Link href="/auth/student/forgot-password" color="primary">
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
