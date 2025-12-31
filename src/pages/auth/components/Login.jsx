import { Button, Card, CardBody, Input } from "@heroui/react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import axios from "axios";
import {setAuthState}  from "../../../store/authSlice";
import PATHS from "../../../constants/paths";

const Login = () => {
  const dispatch = useDispatch();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const navigate = useNavigate();
  const handleLogin = async () => {
    setLoading(true);
    try {
      // api call: /api/auth/login
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
        { identifier, password }
      );
      const result = response.data;
      toast.success("Login successful!");
      // Update redux state
      dispatch(
        setAuthState(
          {
            isAuthenticated: true,
            user : result.data.user,
          }
        )
      );
      
      navigate("/");
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Login failed. Please try again.";
      setErrors({ submit: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="max-w-screen-2xl m-auto min-h-[80dvh] grid items-center">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <h2 className="text-center text-blue-500 font-semibold mb-4">
              Welcome to GEC Siwan Placement Portal
            </h2>

            <Card className="border-t-4 border-blue-500 w-full max-w-md shadow-lg rounded-2xl">
      <CardBody className="p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-sm text-gray-600">Sign in to your account</p>
        </div>

        {/* Error Alert */}
        {errors.submit && (
          <div className="p-3 bg-red-50/5 border border-red-500/50 rounded-lg">
            <p className="text-sm text-red-500">{errors.submit}</p>
          </div>
        )}

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          {/* Email/Registration Input */}
          <Input
            type="text"
            label="Email or Registration Number"
            placeholder="Enter your email or reg no."
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            isInvalid={!!errors.identifier}
            errorMessage={errors.identifier}
            className="w-full"
            disabled={loading}
          />

          {/* Password Input with Toggle */}
          <div className="relative">
            <Input
              type={isPasswordVisible ? "text" : "password"}
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!errors.password}
              errorMessage={errors.password}
              className="w-full"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="absolute right-3 top-7 text-gray-600 hover:text-gray-900 transition"
              disabled={loading}
            >
              {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <a
              href={PATHS.AUTH.FORGOT_PASSWORD}
              className="text-xs text-blue-500 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            color="primary"
            className="w-full font-semibold mt-6"
            isLoading={loading}
            disabled={loading}
          >
            Login
          </Button>

          {/* Sign up link */}
          <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-4">
            Don&apos;t have an account?{" "}
            <Link to={PATHS.AUTH.SIGNUP} className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </CardBody>
    </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
