import { Button, Card, CardBody, Input, Link } from "@heroui/react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const StudentLogin = () => {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    // Simulate login process
    setTimeout(() => {
      alert("Login Successful");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl">
        <CardBody>
          <h2 className="text-2xl font-bold text-center  mb-6">Student Login</h2>
          <div className="space-y-4">
            <Input
              type="text"
              label="Student ID"
              placeholder="Enter your Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
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
              onClick={handleLogin}
            >
              Login
            </Button>
            <div className="text-center mt-4">
              <Link href="/forgot-password" color="primary">Forgot Password?</Link>
            </div>
            <div className="text-center mt-2">
              <span className="text-gray-600">Not registered?</span> <NavLink to="/auth/student/register" className="text-primary">Sign Up</NavLink>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default StudentLogin;