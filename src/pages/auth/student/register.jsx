import { Button, Card, CardBody, Input } from "@heroui/react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const StudentRegister = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentId: "",
    department: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleRegister = () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    alert("Registration Successful");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl">
        <CardBody>
          <h2 className="text-2xl font-bold text-center mb-6">Student Registration</h2>
          {/* Step Indicator */}
          <div className="flex justify-between mb-6">
            <span className={`px-4 py-2 rounded-full ${step === 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>Step 1</span>
            <span className={`px-4 py-2 rounded-full ${step === 2 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>Step 2</span>
            <span className={`px-4 py-2 rounded-full ${step === 3 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>Step 3</span>
          </div>
          {step === 1 && (
            <div className="space-y-4">
              <Input type="text" label="Full Name" name="name" placeholder="Enter your full name" value={formData.name} onChange={handleChange} required />
              <Input type="email" label="Email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
              <Button color="primary" className="w-full mt-4" onPress={nextStep}>Next</Button>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <Input type="text" label="Student ID" name="studentId" placeholder="Enter your Student ID" value={formData.studentId} onChange={handleChange} />
              <Input type="text" label="Department" name="department" placeholder="Enter your department" value={formData.department} onChange={handleChange} />
              <div className="flex justify-between mt-4">
                <Button color="secondary" onPress={prevStep}>Back</Button>
                <Button color="primary" onPress={nextStep}>Next</Button>
                <Button color="default" onPress={() => setStep(3)}>Skip</Button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <Input type="password" label="Password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
              <Input type="password" label="Confirm Password" name="confirmPassword" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} />
              <div className="flex justify-between mt-4">
                <Button color="secondary" onPress={prevStep}>Back</Button>
                <Button color="primary" onPress={handleRegister}>Register</Button>
                <Button color="default" onPress={() => alert("You can complete later!")}>Complete Later</Button>
              </div>
            </div>
          )}
          <div className="text-center mt-4">
            <span>Already registered?</span> <NavLink to="/auth/student/login" className="text-primary">Login</NavLink>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default StudentRegister;