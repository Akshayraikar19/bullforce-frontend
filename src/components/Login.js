
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, Form, FormGroup, Input, Button, Alert, Spinner } from "reactstrap";
import axios from "../config/axios";
import validator from "validator";
import "./Login.css"; // Make sure this path is correct
import { useAuth } from "../context/AuthContext";
import bullLogo from "../images/Group .png";

export default function Login() {
  const { setEmail } = useAuth();
  const navigate = useNavigate();
  const [email, setUserEmail] = useState("");
  const [serverErrors, setServerErrors] = useState(null);
  const [clientErrors, setClientErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(null); // State to hold success message
  const [loading, setLoading] = useState(false); // Loading state

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
      setLoading(true); // Start loading when the login button is clicked

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
      } finally {
        setLoading(false); // Stop loading after the request is complete
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
          background: "linear-gradient(rgba(27, 38, 54, 0.9) , rgba(179, 121, 48, 0.9) )", // Applied the gradient
          border: "1px solid #F4BC2E",
          Radius: "16px", // No border
        }}
      >
        <CardBody>
          <CardTitle tag="h3" className="text-center">
            <img
              src={bullLogo} // Use the imported image here
              alt="Angry Bull Icon"
              style={{ width: "173px", height: "173.45px", top: "171px", left: "635px" }}
            />
            <br />
          </CardTitle>

          <br />

          <strong className="text-center" style={{ color: "white", display: "block", textAlign: "center" }}>
            Login
          </strong>
          <br />

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
            <br />
            <Button
              style={{
              backgroundColor: "#DAA520", // Darker gold color for stronger appearance
              borderColor: "#DAA520",
              color: "black",
              fontWeight: "bold", // Make text bold for emphasis
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)", // Adds shadow for depth
             }}
             block
             disabled={loading} // Disable the button while loading
            >
           {loading ? (
           <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
           ) : null}
           {loading ? '' : 'Log In'}
          </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

