import { Button, Card, CardBody, Input } from "@heroui/react";
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
    <main>
      <div className="max-w-screen-2xl m-auto min-h-[80dvh] grid items-center">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <h2 className="text-center text-blue-500 font-semibold mb-4">
              Welcome to GEC Siwan Placement Portal
            </h2>

            <Card className="border-t-4 border-blue-500 w-full max-w-md shadow-lg rounded-2xl">
              <CardBody className="p-6 space-y-6">
                {/* Back Button & Header */}
                <div className="flex items-center justify-between">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600 transition"
                    >
                      <ArrowLeft size={16} />
                      Back
                    </button>
                  )}
                  <h2 className="text-2xl font-bold text-center flex-1">
                    {step === 1
                      ? "Sign Up"
                      : step === 2
                      ? "Verify OTP"
                      : "Set Password"}
                  </h2>
                  {step > 1 && <div className="w-12" />}
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
                    if (step === 1) handleSendOtp();
                    else if (step === 2)
                      handleVerifyOtp(); // Optional: Enter key on OTP
                    else handleSignup();
                  }}
                >
                  {/* Step 1: Registration & Email */}
                  <div className={`space-y-4 ${step > 1 ? "opacity-75" : ""}`}>
                    <Input
                      type="email"
                      label="Email Address"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.submit) {
                          setErrors({});
                        }
                      }}
                      className="w-full"
                      disabled={loading || step > 1}
                    />
                    <Input
                      type="text"
                      label="Registration Number"
                      placeholder=" e.g. 22103151000"
                      value={registrationNumber}
                      onChange={(e) => {
                        setRegistrationNumber(e.target.value);
                        if (errors.submit) {
                          setErrors({});
                        }
                      }}
                      className="w-full"
                      disabled={loading || step > 1}
                    />
                    {step === 1 && (
                      <Button
                        type="submit"
                        color="primary"
                        className="w-full mt-4 font-semibold"
                        isLoading={loading}
                        disabled={loading}
                      >
                        Send OTP
                      </Button>
                    )}
                  </div>

                  {/* Step 2: OTP Verification */}
                  {step >= 2 && (
                    <div
                      className={`space-y-4 ${
                        step === 3 ? "opacity-50 pointer-events-none" : ""
                      }`}
                    >
                      <div className="text-center">
                        <p className="text-sm text-gray-600">
                          Enter the 6-digit code sent to
                        </p>
                        <p className="font-medium text-gray-800">{email}</p>
                      </div>

                      <div className="flex items-center justify-center gap-3">
                        <div className="flex gap-2">
                          {otp.map((data, index) => {
                            return (
                              <input
                                className="w-10 h-12 text-center text-xl border rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all bg-transparent"
                                type="text"
                                name="otp"
                                maxLength="1"
                                key={index}
                                value={data}
                                onChange={(e) =>
                                  handleOtpChange(e.target, index)
                                }
                                onKeyDown={(e) => handleOtpKeyDown(e, index)}
                                onFocus={(e) => e.target.select()}
                                disabled={isOtpVerified || loading}
                              />
                            );
                          })}
                        </div>

                        {!isOtpVerified && (
                          <Button
                            type="button"
                            color="primary"
                            className="h-12 min-w-0 px-4 font-medium"
                            onClick={handleVerifyOtp}
                            isLoading={loading}
                            disabled={loading}
                          >
                            Verify
                          </Button>
                        )}

                        {isOtpVerified && (
                          <div className="text-green-500 animate-in zoom-in duration-300">
                            <CheckCircle size={28} />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Password Creation */}
                  {step === 3 && (
                    <div className="space-y-4 pt-4 border-t border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          label="Password"
                          placeholder="Minimum 6 characters"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          isInvalid={!!errors.password}
                          errorMessage={errors.password}
                          className="w-full"
                          disabled={loading}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                          tabIndex="-1"
                        ></button>
                      </div>

                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          label="Confirm Password"
                          placeholder="Re-enter your password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          isInvalid={
                            !!errors.confirmPassword ||
                            (confirmPassword && password !== confirmPassword)
                          }
                          errorMessage={errors.confirmPassword}
                          className="w-full"
                          disabled={loading}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                          tabIndex="-1"
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>

                      {confirmPassword && password !== confirmPassword && (
                        <p className="text-xs text-red-500 font-medium ml-1">
                          Passwords do not match
                        </p>
                      )}

                      <Button
                        type="submit"
                        color="success"
                        className="w-full mt-6 font-semibold text-white"
                        isLoading={loading}
                        disabled={
                          loading ||
                          (confirmPassword && password !== confirmPassword)
                        }
                      >
                        Complete Sign Up
                      </Button>

                      {/* Login link */}
                      <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-4">
                        Already have an account?{" "}
                        <Link
                          to={PATHS.AUTH.LOGIN}
                          className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                        >
                          Login
                        </Link>
                      </p>
                    </div>
                  )}
                  {/* login link */}
                  <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-4">
                    Already have an account? {" "}
                    <Link
                      to={PATHS.AUTH.LOGIN}
                      className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                    >
                      Login
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

export default Signup;
