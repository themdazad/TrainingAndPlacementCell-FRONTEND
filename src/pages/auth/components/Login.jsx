import { Button, Card, CardBody, Input, Link } from "@heroui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../../hooks/contexts/auth/AuthContext";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { setIsLogedIn } = useContext(AuthContext);

  // Validation helpers
  const validateInput = (input) => {
    return input.trim().length > 0;
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleLogin = async () => {
    const newErrors = {};

    if (!validateInput(registrationNumber)) {
      newErrors.registrationNumber = "Email or registration number is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(password)) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ registrationNumber, password })
      // });
      // if (!response.ok) throw new Error('Invalid credentials');
      // const data = await response.json();
      // localStorage.setItem('token', data.token);
      // setIsLogedIn(true);
      // navigate('/');

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Login called with:", { registrationNumber, password });
      setIsLogedIn(true);
      navigate("/");
    } catch (error) {
      setErrors({ submit: error.message || "Login failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-t-4 border-blue-500 w-full max-w-md shadow-lg rounded-2xl">
        <CardBody className="p-6 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-sm text-gray-600">Sign in to your account</p>
          </div>

          {/* Error Alert */}
          {errors.submit && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{errors.submit}</p>
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
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              isInvalid={!!errors.registrationNumber}
              errorMessage={errors.registrationNumber}
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
              <a href="/auth/forgot-password" className="text-xs text-blue-500 hover:underline">
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
          </form>

        </CardBody>
      </Card>
  );
};

export default Login;
