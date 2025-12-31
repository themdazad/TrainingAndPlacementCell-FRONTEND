import { Button, Input } from "@heroui/react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setAuthState } from "../../../store/authSlice";
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
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
        { identifier, password }
      );
      const result = response.data;
      toast.success("Welcome back!");
      dispatch(setAuthState({ isAuthenticated: true, user: result.data.user }));
      navigate(PATHS.MAIN.HOME);
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || "Invalid credentials",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#fafafa] dark:bg-slate-950 font-sans">
      {/* LEFT: Aesthetic Image with Logo Overlay */}
      <div className="relative hidden w-1/2 lg:block">
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="space-y-6 text-center px-8">
            <img
              src="/images/logos/collegelogo.png"
              alt="GEC Siwan Logo"
              className="h-40 w-auto mx-auto drop-shadow-2xl"
            />
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Training & Placement Cell
              </h2>
              <p className="text-lg text-white/90 font-medium">
                Government Engineering College Siwan
              </p>
            </div>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
          alt="Campus"
          className="h-full w-full object-cover brightness-[0.6]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 to-slate-900/60"></div>
      </div>

      {/* RIGHT: Minimalistic Form */}
      <div className="relative flex w-full flex-col items-center justify-center px-6 lg:w-1/2 bg-white dark:bg-slate-950">
        <div className="w-full max-w-[380px] space-y-12">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Sign in
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Enter your credentials to continue
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <Input
                type="text"
                label="Email or Registration Number"
                variant="underlined"
                classNames={{
                  label:
                    "text-slate-600 dark:text-slate-400 py-2 text-md font-medium",
                  input: "text-base px-0  dark:text-white",
                }}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                isInvalid={!!errors.identifier}
                disabled={loading}
              />

              <div className="relative">
                <Input
                  type={isPasswordVisible ? "text" : "password"}
                  label="Password"
                  variant="underlined"
                  classNames={{
                    label:
                      "text-slate-600 dark:text-slate-400py-2 text-md font-medium",
                    input: "text-base px-0 dark:text-white",
                  }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!!errors.password}
                  disabled={loading}
                  endContent={
                    <button
                      type="button"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                      disabled={loading}
                    >
                      {isPasswordVisible ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  }
                />
              </div>
            </div>

            {errors.submit && (
              <p className="text-sm text-red-500">{errors.submit}</p>
            )}

            <div className="flex flex-col gap-4 pt-2">
              <Button
                type="submit"
                className="w-full bg-blue-600 text-white dark:bg-blue-600 font-semibold h-12 rounded-lg hover:bg-blue-700 transition-colors"
                isLoading={loading}
                disabled={loading}
              >
                Login
              </Button>
              <div className="flex items-center justify-between px-1">
                <Link
                  to={PATHS.AUTH.SIGNUP}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Create account
                </Link>
                <Link
                  to={PATHS.AUTH.FORGOT_PASSWORD}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
          </form>

          <div className="pt-16 text-center">
            <p className="text-xs text-slate-400 dark:text-slate-500">
              © 2025 T&P Cell, GEC Siwan
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
