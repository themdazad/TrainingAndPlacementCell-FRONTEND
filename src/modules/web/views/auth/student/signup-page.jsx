import axios from "axios";
import { Button, Card, CardBody, Input } from "@heroui/react";
import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../../../../../hooks/contexts/auth/AuthContext";
import { Github, Linkedin } from "lucide-react";

const StudentSignup = () => {
  const { setIsLogedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Send OTP, 2: Verify + Password
  const [regNo, setRegNo] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Step 1: Send OTP to email
  const handleSendOtp = async () => {
    if (!regNo || !email) {
      toast.error("Please fill Registration No and Email");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/student/send-otp`,
        { regNo, email },
        { withCredentials: true }
      );
      toast.success("OTP sent to your email");
      setStep(2);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to send OTP";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP and Complete Signup
  const handleSignup = async () => {
    if (!otp || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/student/signup`,
        { regNo, email, otp, password },
        { withCredentials: true }
      );

      toast.success("Signup successful! Please login.");
      setTimeout(() => {
        navigate("/auth/student/login");
      }, 1000);
    } catch (err) {
      const msg = err.response?.data?.message || "Signup failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-screen-2xl m-auto flex items-center justify-center min-h-[80dvh]">
      <Card className="border-t-4 border-y-blue-500 w-full max-w-md p-3 m-[5%] shadow-md rounded-3xl">
        <CardBody>
          <h2 className="text-2xl font-bold text-center mb-6">
            Student Signup
          </h2>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              step === 1 ? handleSendOtp() : handleSignup();
            }}
          >
            <Input
              type="text"
              label="Registration No"
              placeholder="e.g. 23103151000"
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
              className="w-full"
            />
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />

            {step === 2 && (
              <>
                <Input
                  type="text"
                  label="OTP"
                  placeholder="Enter the OTP sent to your email"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full"
                />
                <Input
                  type="password"
                  label="Password"
                  placeholder="Enter y password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                />
                <Input
                  type="password"
                  label="Confirm Password"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full"
                />
              </>
            )}

            <Button
              type="submit"
              color="primary"
              className="w-full mt-4"
              isLoading={loading}
            >
              {step === 1 ? "Send OTP" : "Sign Up"}
            </Button>
          </form>

          <div className="text-center mt-2">
            <span className="text-neutral-600">Already have an account?</span>{" "}
            <NavLink to="/auth/student/login" className="text-primary">
              Login
            </NavLink>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default StudentSignup;
