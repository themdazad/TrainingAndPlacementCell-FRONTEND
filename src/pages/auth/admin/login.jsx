import { Button, Card, CardBody, Input, Link } from "@heroui/react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    // login process
    try {
      // Replace with your actual API endpoint
      const response = await axios.post(
        "http://localhost:3000/test/admin/login",
        {
          email,
          password,
        }
      );

      if (response.data.success) {
        localStorage.setItem("isAdminLoggedin",response.data.success);
        console.log(localStorage.getItem("isAdminLoggedin"))
        navigate("/dashboard/admin");
        toast.success("Logged in");   
      } else {
        toast.error("Incorrect email or password!");
      }
    } catch (error) {
      // Handle errors
      toast.error(
        `Login Failed: ${error.response?.data?.message || error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <ToastContainer/>
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
              <Link href="/forgot-password" color="primary">
                Forgot Password?
              </Link>
            </div>
            <div className="text-center mt-2">
              <span className="text-gray-600">Not registered?</span>{" "}
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
