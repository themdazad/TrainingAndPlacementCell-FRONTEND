import { Button, Card, CardBody, Input, Link } from "@heroui/react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [regNo, setRegNo] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePassword = async () => {
    // Start loading
    setLoading(true);

    // Validate inputs
    if (!regNo || !password) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      // Send login request
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/student/login`,
        { regNo, password },
        {
          withCredentials: true,
        }
      );

      // Handle successful login
      if (res.status === 200) {
        // Token automatically save in Cookies by backend
        toast.success("Logged in successfully");
        setTimeout(() => {
          navigate("/dashboard/student"); // Redirect to dashboard
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
    <div className="flex items-center justify-center">
      <ToastContainer />
      <Card className="border-t-4 border-y-blue-500 w-full max-w-md p-3 m-[5%] shadow-lg rounded-2xl">
        <CardBody>
          <h2 className="text-2xl font-bold text-center mb-6">
            Reset Password
          </h2>
          <div>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                handlePassword();
              }}
            >
              <Input
                type="email"
                label="Email"
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
               <Input
                type="text"
                label="Registration No"
                placeholder=""
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
                className="w-full"
              />
              <Button
                type="submit"
                color="primary"
                className="w-full mt-4"
                isLoading={loading}
              >
                Send OTP
              </Button>
            </form>
            <div className="text-center mt-4">
              <Link href="/auth/student/login" color="primary">
                Login
              </Link>
            </div>
            <div className="text-center mt-2">
              <span className="text-neutral-600">Not registered?</span>{" "}
              <NavLink to="/auth/student/register" className="text-primary">
                Sign Up
              </NavLink>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ForgotPassword;
