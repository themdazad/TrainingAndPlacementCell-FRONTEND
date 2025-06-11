import { Button, Card, CardBody, Input, Link } from "@heroui/react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate
import {  toast } from "react-toastify";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../../../hooks/contexts/auth/AuthContext";

const AdminLogin = () => {
  const { setIsLogedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    // Validate inputs
        if (!email || !password) {
          toast.error("Please fill in all fields");
          setLoading(false);
          return;
        }

  
    try {
      // 1. Send login request
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/admin/login`,
        { email, password },
        {
          withCredentials: true,
        }
      );

      // 2. Handle successful login
      if (res.status === 200) {
        // Token automatically save in Cookies by backend
        toast.success("Logged in successfully");
        setIsLogedIn({ admin: true, student: false }); // Update context state
        setTimeout(() => {
          navigate("/dashboard/admin"); // Redirect to dashboard
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
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl">
        <CardBody>
          <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
          <div className="space-y-4">
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              <Link href="#" color="primary">
                Forgot Password?
              </Link>
            </div>
            <div className="text-center mt-2">
              <span className="text-neutral-600">Not registered?</span>{" "}
              <NavLink to="/auth/admin/register" className="text-primary">
                Sign Up
              </NavLink>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default AdminLogin;
