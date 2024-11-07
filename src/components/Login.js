import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, Form, FormGroup, Input, Button, Alert } from "reactstrap";
import axios from "../config/axios";
import validator from "validator";
import "./Login.css"; // Custom CSS for background image
import { useAuth } from "../context/AuthContext";


export default function Login() {
  const { setEmail } = useAuth();  // Access email and setEmail from AuthContext
  const navigate = useNavigate();
  const [email, setUserEmail] = useState("")
  const [serverErrors, setServerErrors] = useState(null);
  const [clientErrors, setClientErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(null); // State to hold success message


  const runValidations = () => {
    const errors = {};
    if (email.trim().length === 0) {
      errors.email = "Email is required";
    } else if (!validator.isEmail(email)) {
      errors.email = "Invalid email format";
    }
    return errors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const errors = runValidations();

    if (Object.keys(errors).length === 0) {
      setClientErrors({});
      try {
        const formData = { email };
        await axios.post("/users/login", formData);
        setEmail(email)
        // Set success message from backend response
        setSuccessMessage(response.data.message);
        navigate("/verifyOtp");  // Set the email in AuthContext and navigate
      } catch (err) {
        setServerErrors(err.response?.data?.errors || "Login failed. Please try again.");
      }
    } else {
      setClientErrors(errors);
    }
  };

  return (
    <div className="login-background">
      <Card
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          border: "none",
          padding: "20px",
        }}
      >
        <CardBody>
          <CardTitle tag="h3" className="text-center">
            <img
              src="https://images.scalebranding.com/angry-bull-logo-ba646aad-ea04-4187-9a39-f53b670a293d.jpg"
              alt="Angry Bull Icon"
              style={{ width: "100px", marginRight: "10px" }}
            />
            <br />
            BullForce
            <br />
            Wealth Vaults
          </CardTitle>
        
          <strong className="text-center" style={{ color: "white", display: "block", textAlign: "center" }}>
            Login
          </strong>

          <p className="text-center" style={{ color: "white" }}>
            Login with Your Email ID
          </p>
          {serverErrors && <Alert color="danger">{serverErrors}</Alert>}
          {successMessage && <Alert color="success">{successMessage}</Alert>} {/* Success message */}
          <Form onSubmit={handleLogin}>
            <FormGroup>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setUserEmail(e.target.value)}  // Update AuthContext email directly
                placeholder="Enter your email"
              />
              {clientErrors.email && <Alert color="warning">{clientErrors.email}</Alert>}
            </FormGroup>
            <Button
              style={{ backgroundColor: "#FFD700", borderColor: "#FFD700", color: "black" }}
              block
            >
              Log in
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}


