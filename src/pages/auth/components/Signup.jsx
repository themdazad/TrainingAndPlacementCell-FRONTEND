import { Button, Input } from "@heroui/react";
import { Image } from "@heroui/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ArrowLeft, CheckCircle, Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import PATHS from "../../../constants/paths";

const Signup = () => {
  const [step, setStep] = useState(1); // 1: Send OTP, 2: Verify OTP, 3: Set Password
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [email, setEmail] = useState("");

  // OTP State
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const navigate = useNavigate();

  // Validation helper
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateRegNo = (registrationNumber) => {
    return registrationNumber.trim().length > 0;
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  // Handle OTP Input Change
  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && e.target.previousSibling) {
        e.target.previousSibling.focus();
      }
    }
  };

  // Step 1: Send OTP to email
  const handleSendOtp = async () => {
    const newErrors = {};

    if (!validateRegNo(registrationNumber)) {
      newErrors.registrationNumber = "Registration No is required";
    }
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/send-otp`,
        { registrationNumber, email }
      );

      toast.success("OTP sent to your email");
      setStep(2);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to send OTP";

      // Show error in Error Alert component
      setErrors({ submit: message });
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      // Simulate network delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 1500));

      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/verify-otp`,
        { registrationNumber, email, otp: otpValue }
      );

      setIsOtpVerified(true);
      toast.success("OTP Verified Successfully!");
      setStep(3); // Move to password creation
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Invalid OTP";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Clear errors when user types correctly
  useEffect(() => {
    if (errors.password) {
      // Clear if valid, or if it was just "required" and user typed something
      if (validatePassword(password)) {
        setErrors((prev) => ({ ...prev, password: "" }));
      } else if (password && errors.password === "Password is required") {
        setErrors((prev) => ({ ...prev, password: "" }));
      }
    }
  }, [password, errors.password]);

  useEffect(() => {
    if (errors.confirmPassword) {
      // Clear if matches, or if it was just "required" and user typed something
      if (confirmPassword && password === confirmPassword) {
        setErrors((prev) => ({ ...prev, confirmPassword: "" }));
      } else if (
        confirmPassword &&
        errors.confirmPassword === "Please confirm your password"
      ) {
        setErrors((prev) => ({ ...prev, confirmPassword: "" }));
      }
    }
  }, [confirmPassword, password, errors.confirmPassword]);

  // Step 3: Register
  const handleSignup = async () => {
    const newErrors = {};

    if (!password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(password)) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/register`,
        { registrationNumber, email, otp: otp.join(""), password }
      );

      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Signup failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (step === 3) {
      setStep(2); // Go back to OTP
      setIsOtpVerified(false);
    } else if (step === 2) {
      setStep(1); // Go back to Email/Reg
      setOtp(new Array(6).fill(""));
    }
    setErrors({});
  };

  return (
    <div className="relative flex w-full flex-col items-center justify-center px-6 lg:w-1/2 bg-white dark:bg-slate-950 overflow-y-auto">
      <div className="w-full max-w-[420px] py-8">
        {/* Header with Back Button */}
        <div className="space-y-2 mb-8">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline mb-4"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          )}
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            {step === 1
              ? "Create account"
              : step === 2
              ? "Verify OTP"
              : "Set password"}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            {step === 1
              ? "Enter your details to get started"
              : step === 2
              ? "Check your email for verification code"
              : "Create a secure password for your account"}
          </p>
        </div>

        {/* Error Alert */}
        {errors.submit && (
          <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.submit}
            </p>
          </div>
        )}
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (step === 1) handleSendOtp();
            else if (step === 2) handleVerifyOtp();
            else handleSignup();
          }}
        >
          {/* Step 1: Registration & Email */}
          {step === 1 && (
            <div className="space-y-6">
              <Input
                type="email"
                label="Email Address"
                variant="underlined"
                placeholder="name@example.com"
                classNames={{
                  label:
                    "text-slate-600 dark:text-slate-400 py-2 text-md font-medium",
                  input: "text-base px-0 dark:text-white",
                }}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.submit) setErrors({});
                }}
                isInvalid={!!errors.email}
                errorMessage={errors.email}
                disabled={loading}
              />
              <Input
                type="text"
                label="Registration Number"
                variant="underlined"
                placeholder="e.g. 22103151000"
                classNames={{
                  label:
                    "text-slate-600 dark:text-slate-400 py-2 text-md font-medium",
                  input: "text-base px-0 dark:text-white",
                }}
                value={registrationNumber}
                onChange={(e) => {
                  setRegistrationNumber(e.target.value);
                  if (errors.submit) setErrors({});
                }}
                isInvalid={!!errors.registrationNumber}
                errorMessage={errors.registrationNumber}
                disabled={loading}
              />
            </div>
          )}

          {/* Step 2: OTP Verification */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Enter the 6-digit code sent to
                </p>
                <p className="font-medium text-slate-900 dark:text-white">
                  {email}
                </p>
              </div>

              <div className="flex items-center justify-center gap-3">
                <div className="flex gap-2">
                  {otp.map((data, index) => (
                    <input
                      className="w-11 h-12 text-center text-lg border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                      type="text"
                      name="otp"
                      maxLength="1"
                      key={index}
                      value={data}
                      onChange={(e) => handleOtpChange(e.target, index)}
                      onKeyDown={(e) => handleOtpKeyDown(e, index)}
                      onFocus={(e) => e.target.select()}
                      disabled={isOtpVerified || loading}
                    />
                  ))}
                </div>

                {!isOtpVerified && (
                  <Button
                    type="button"
                    className="h-12 min-w-0 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={handleVerifyOtp}
                    isLoading={loading}
                    disabled={loading}
                  >
                    Verify
                  </Button>
                )}

                {isOtpVerified && (
                  <div className="text-green-500 animate-in zoom-in duration-300">
                    <CheckCircle size={32} />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Password Creation */}
          {step === 3 && (
            <div className="space-y-6">
              <Input
                type={showPassword ? "text" : "password"}
                label="Password"
                variant="underlined"
                placeholder="Minimum 6 characters"
                classNames={{
                  label:
                    "text-slate-600 dark:text-slate-400 py-2 text-md font-medium",
                  input: "text-base px-0 dark:text-white",
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!!errors.password}
                errorMessage={errors.password}
                disabled={loading}
                endContent={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                }
              />

              <Input
                type={showConfirmPassword ? "text" : "password"}
                label="Confirm Password"
                variant="underlined"
                placeholder="Re-enter your password"
                classNames={{
                  label:
                    "text-slate-600 dark:text-slate-400 py-2 text-md font-medium",
                  input: "text-base px-0 dark:text-white",
                }}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                isInvalid={
                  !!errors.confirmPassword ||
                  (confirmPassword && password !== confirmPassword)
                }
                errorMessage={
                  errors.confirmPassword ||
                  (confirmPassword && password !== confirmPassword
                    ? "Passwords do not match"
                    : "")
                }
                disabled={loading}
                endContent={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    disabled={loading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                }
              />
            </div>
          )}

          {/* Action Button */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold h-12 rounded-lg hover:bg-blue-700 transition-colors"
              isLoading={loading}
              disabled={
                loading ||
                (step === 3 && confirmPassword && password !== confirmPassword)
              }
            >
              {step === 1
                ? "Send OTP"
                : step === 2
                ? "Continue"
                : "Create Account"}
            </Button>
          </div>

          {/* Login Link */}
          <div className="text-center pt-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Already have an account?{" "}
              <Link
                to={PATHS.AUTH.LOGIN}
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Login
              </Link>
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className="pt-16 text-center">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            © 2025 T&P Cell, GEC Siwan
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
