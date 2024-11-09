
import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Form, FormGroup, Input, Button } from 'reactstrap';
import { useAuth } from '../context/AuthContext'; 
import axios from '../config/axios';
import bullLogo from "../images/Group .png";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';  // Import SweetAlert2 for alerts

const VerifyOtp = () => {
  const { email } = useAuth();  // Access email from AuthContext
  const [otp, setOTP] = useState(["", "", "", ""]); // Array to store each OTP digit
  const [serverError, setServerError] = useState("");  // State to store server error message
  const navigate = useNavigate();

  // Handle each digit input and manage focus movement
  const handleInputChange = (e, index) => {
    const value = e.target.value;
    const newOtp = [...otp];

    if (value.length === 1) {  // Ensure only a single digit is entered
      newOtp[index] = value;
      setOTP(newOtp);

      // Automatically move to the next input if not the last field
      if (index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    } else if (value === "") { // If field is cleared, reset and focus on previous
      newOtp[index] = "";
      setOTP(newOtp);

      // Move focus back to the previous field if backspacing
      if (index > 0) {
        document.getElementById(`otp-${index - 1}`).focus();
      }
    }
  };

  // Function to handle OTP verification by combining entered digits
  const handleOTPVerification = async () => {
    const enteredOtp = otp.join(""); // Combine OTP array into a single string
    try {
      const res = await axios.post('/verifyOtp', { email, otp: enteredOtp });
  
      // Display SweetAlert on success
      Swal.fire({
        title: 'Success',
        text: res.data.message,
        icon: 'success',
        confirmButtonText: 'Ok'
      });
  
    } catch (error) {
  
      // Default error message
      let errorMessage = 'An unknown error occurred. Please try again later.';
  
      if (error.response) {
       
        if (error.response.data && error.response.data.error) {
          errorMessage = error.response.data.error; // This should be from the backend error response
          
          // Handle specific OTP-related errors to show in SweetAlert
          if (errorMessage.includes("invalid OTP") || errorMessage.includes("expired OTP")) {
            Swal.fire({
              title: 'Error',
              text: errorMessage,
              icon: 'error',
              confirmButtonText: 'Try Again'
            });
            return;  // Exit the function after showing the SweetAlert
          }
        } else if (error.response.data && error.response.data.errors) {
        
          errorMessage = error.response.data.errors.map(err => err.msg).join(", ");
        }
      }

      setServerError(errorMessage);
    }
  };

  const handleClick = () => {
    navigate('/'); // Navigate to homepage on email edit click
  };

  return (
    <div className="login-background">
      <Card style={{
        width: "472px",
        height: "560px",
        background: "linear-gradient( rgba(27, 38, 54, 0.9), rgba(179, 121, 48, 0.9))",
        border: "1px solid #F4BC2E",
        borderRadius: "16px"
      }}>
        <CardBody>
          <CardTitle tag="h3" className="text-center">
            <img src={bullLogo} alt="Bull Logo" style={{ width: "173px", height: "173.45px", top: "171px", left: "635px" }} />
          </CardTitle>

          <strong className="text-center" style={{ color: "white", display: "block", textAlign: "center" }}>
            OTP
          </strong>
          <br />
          <p className="text-center" style={{ color: "black" }}>
            Please Enter a OTP sent to:
            <br />
            <br />
            <strong style={{ color: "white" }}>
              {email} <FaEdit style={{ color: 'blue' }} onClick={handleClick} />
            </strong>
          </p>

        
          {serverError && (
            <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold', marginTop: '15px' }}>
              {serverError}
            </p>
          )}

          <Form onSubmit={(e) => { e.preventDefault(); handleOTPVerification(); }}>
            <FormGroup style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleInputChange(e, index)}
                  maxLength={1} // Only allow one character per field
                  style={{ width: '50px', textAlign: 'center', fontSize: '24px' }}
                  placeholder="0"
                />
              ))}
            </FormGroup>
            <Button
              style={{
                backgroundColor: "#DAA520", // Darker gold color for stronger appearance
                borderColor: "#DAA520",
                color: "black",
                fontWeight: "bold", // Make text bold for emphasis
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)" // Adds shadow for depth
              }}
              block
            >
              Proceed
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default VerifyOtp;

