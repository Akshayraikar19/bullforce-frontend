import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, Form, FormGroup, Input, Button, Alert } from "reactstrap";
import axios from "../config/axios";
import validator from "validator";
import "./Login.css"; // Make sure this path is correct
import { useAuth } from "../context/AuthContext";
import bullLogo from "../images/Group .png"

export default function Login() {
  const { setEmail } = useAuth();
  const navigate = useNavigate();
  const [email, setUserEmail] = useState("");
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
        const response = await axios.post("/users/login", formData);
        setEmail(email);
        
        // Set success message from backend response
        setSuccessMessage(response.data.message);

        // Redirect to OTP verification page after 3 seconds
        setTimeout(() => {
          navigate("/verifyOtp");
        }, 3000);
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
    maxWidth: "400px",  // Restrict width on larger screens
    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0.3))",  // Linear gradient
    border: "none",  // No border
    padding: "20px",  // Padding for spacing inside the card
  }}
>
        <CardBody>
          <CardTitle tag="h3" className="text-center">
          <img
              src={bullLogo} // Use the imported image here
              alt="Angry Bull Icon"
              style={{ width: "100px", marginRight: "10px" }}
            />
            <br />
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
                onChange={(e) => setUserEmail(e.target.value)}
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
