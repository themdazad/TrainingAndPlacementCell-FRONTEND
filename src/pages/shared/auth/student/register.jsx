import { Button, Card, CardBody, Input } from "@heroui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const StudentRegister = () => {
  const navigate = useNavigate(); // hook must be inside component
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // Start loading
    setLoading(true);

    // Validate inputs
    if (!name || !email || !phone || !regNo || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      if (password !== confirmPassword) {
        toast.warning("Passwords do not match");
        setLoading(false);
        return;
      }

      // Send login request
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/student/register`,
        {
          name,
          email,
          phone,
          regNo,
          password,
        }
      );

      // Handle successful login
      if (res.data?.success || res.status < 300) {
        toast.success("Registration successfully done.");
        setTimeout(() => {
          navigate("/student/login"); // Redirect to student login page
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
      <ToastContainer />
      <Card className="w-full border-t-4 border-y-blue-500 max-w-md p-6 m-[5%] shadow-lg rounded-2xl">
        <CardBody>
          <h2 className="text-2xl font-bold text-center mb-6">
            Student Registration
          </h2>
          <div className="space-y-4">
            <Input
              type="text"
              label="Name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            <Input
              type="text"
              label="Phone"
              placeholder="Enter your registered phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full"
            />
            <Input
              type="text"
              label="RegistrationNo"
              placeholder="Enter your registration no."
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
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
            <Input
              type="password"
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full"
            />
            <Button
              color="primary"
              className="w-full mt-4"
              isLoading={loading}
              onPress={handleRegister}
            >
              Register
            </Button>
            <div className="text-center mt-2">
              <span className="text-neutral-600">Already have an account?</span>{" "}
              <NavLink to="/auth/student/login" className="text-primary">
                Login
              </NavLink>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default StudentRegister;
