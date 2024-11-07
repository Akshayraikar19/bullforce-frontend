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
         width: "472px",
         height: "560px",
         Top: "128px",
         Left: "485px",
         background: "linear-gradient(0deg, rgba(27, 38, 54, 0.9) 40.71%, rgba(179, 121, 48, 0.9) )", // Applied the gradient
         border: "1px solid #F4BC2E",
         Radius: "16px" // No border
        
  }}
>
        <CardBody>
          <CardTitle tag="h3" className="text-center">
          <img
              src={bullLogo} 
              alt="Angry Bull Icon"
              style={{ width: "173px",height: "173.5px", Top: "171px", Left:"635px" }}
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

