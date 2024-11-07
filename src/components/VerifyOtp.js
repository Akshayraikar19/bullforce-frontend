import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, Form, FormGroup, Input, Button, Alert } from 'reactstrap';
import { useAuth } from '../context/AuthContext'; 
import axios from '../config/axios';
import './Login.css'; 
import bullLogo from "../images/Group .png"

const VerifyOtp = () => {
  const { email } = useAuth();  // Access email from AuthContext
  const [otp, setOTP] = useState("")  
  const [message, setMessage] = useState("")

//   const [otp, setOTP] = useState(localStorage.getItem('otp') || '');
//   const [message, setMessage] = useState(localStorage.getItem('message') || "")
//   //const [message, setMessage] = useState("")

//   useEffect(() => {
//     // Save otp and message to localStorage whenever they change
//     localStorage.setItem('otp', otp);
//     localStorage.setItem('message', message)
//   }, [otp, message]);

  const handleOTPVerification = async () => {
    try {
      const res = await axios.post('/verifyOtp', { email, otp });
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || 'An error occurred');
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
              src={bullLogo}
              alt="Angry Bull Icon"
              style={{ width: "100px", marginRight: "10px" }}
            />
            <br />
          </CardTitle>
        
          <strong className="text-center" style={{ color: "white", display: "block", textAlign: "center" }}>
            OTP
          </strong>
          <p className="text-center" style={{ color: "black" }}>
            Please Enter a OTP send to: <strong style={{ color: "white" }}>{email}</strong>
          </p>

          {message && <Alert color="danger">{message}</Alert>}
          <Form onSubmit={(e) => { e.preventDefault(); handleOTPVerification(); }}>
            <FormGroup>
              <Input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                placeholder="Enter 4-digit OTP"
                maxLength={4}
              />
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


