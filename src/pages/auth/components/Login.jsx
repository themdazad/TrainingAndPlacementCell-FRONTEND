import { Button, Card, CardBody, Input } from "@heroui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch(
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

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Invalid credentials");

      // 1. Persist the session data
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.user));

      // 2. Notify other components (like NavBar) of the change
      window.dispatchEvent(new Event("storage"));

      toast.success(`You login as a ${result.data.user.role}.`);
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
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-sm text-gray-600">Sign in to your account</p>
        </div>

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

          <div className="text-right">
            <a href="/forgot-password" size="sm" className="text-xs text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>

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