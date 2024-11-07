import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Form, FormGroup, Input, Button, Alert } from 'reactstrap';
import { useAuth } from '../context/AuthContext'; 
import axios from '../config/axios';
import bullLogo from "../images/Group .png";

const VerifyOtp = () => {
  const { email } = useAuth();  // Access email from AuthContext
  const [otp, setOTP] = useState(["", "", "", ""]); // Array to store each OTP digit
  const [message, setMessage] = useState("");

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
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="login-background">
      <Card style={{
        width: "472px",
        height: "560px",
        background: "linear-gradient(0deg, rgba(27, 38, 54, 0.9), rgba(179, 121, 48, 0.9))",
        border: "1px solid #F4BC2E",
        borderRadius: "16px"
      }}>
        <CardBody>
          <CardTitle tag="h3" className="text-center">
            <img src={bullLogo} alt="Bull Logo" style={{ width: "173px", height: "173.5px" }} />
          </CardTitle>

          
           <strong className="text-center" style={{ color: "white", display: "block", textAlign: "center" }}>
             OTP
          </strong>
           <p className="text-center" style={{ color: "black" }}>
             Please Enter a OTP send to:       
             <br/>
        

             <strong style={{ color: "white" }}>{email}</strong>
           </p>
          {message && <Alert color="danger">{message}</Alert>}

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
              style={{ backgroundColor: "#FFD700", borderColor: "#FFD700", color: "black" }}
              block
              onClick={handleOTPVerification}
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

