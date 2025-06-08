import axios from "axios";
import { toast } from "react-toastify";
import { Button, Card, CardBody, Input } from "@heroui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../hooks/contexts/auth/AuthContext";

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

      console.log(res);
      // 2. Handle successful login
      if (res.status === 200) {
        // Token automatically save in Cookies by backend
        toast.success("Logged in successfully");
        setTimeout(() => {
          navigate("/dashboard/admin"); // Redirect to dashboard
          setIsLogedIn({ admin: true, student: false }); // Update context state
          setLoading(false);
        }, 1000);
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      // Handle errors
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      toast.error(`${errorMessage}`);
    } finally {
      // Stop loading
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="border-t-4 border-y-blue-500 w-full max-w-md p-3 m-[5%] shadow-md rounded-3xl">
        <CardBody>
          <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
          <form className="space-y-4">
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
              <a
                href="#"
                color="primary"
                onClick={() => {
                  window.alert("Contact developer for new password.");
                }}
              >
                Forgot Password?
              </a>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AdminLogin;
