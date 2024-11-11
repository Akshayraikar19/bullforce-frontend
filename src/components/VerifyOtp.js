

import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Form, FormGroup, Input, Button } from 'reactstrap';
import { useAuth } from '../context/AuthContext';
import axios from '../config/axios';
import bullLogo from "../images/Group .png";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const VerifyOtp = () => {
  const { email } = useAuth();
  const [otp, setOTP] = useState(["", "", "", ""]);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    const newOtp = [...otp];

    if (value.length === 1) {
      newOtp[index] = value;
      setOTP(newOtp);

      if (index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    } else if (value === "") {
      newOtp[index] = "";
      setOTP(newOtp);

      if (index > 0) {
        document.getElementById(`otp-${index - 1}`).focus();
      }
    }
  };

  const handleOTPVerification = async () => {
    const enteredOtp = otp.join("");
    try {
      const res = await axios.post('/verifyOtp', { email, otp: enteredOtp });

      Swal.fire({
        title: 'Success',
        text: res.data.message,
        icon: 'success',
        confirmButtonText: 'Ok'
      });

    } catch (error) {
      console.error("Error response:", error);
      let errorMessage = 'An unknown error occurred. Please try again later.';

      if (error.response) {
        if (error.response.data && error.response.data.error) {
          errorMessage = error.response.data.error;
          if (errorMessage.includes("invalid OTP") || errorMessage.includes("expired OTP")) {
            Swal.fire({
              title: 'Error',
              text: errorMessage,
              icon: 'error',
              confirmButtonText: 'Try Again'
            });
            return;
          }
        } else if (error.response.data && error.response.data.errors) {
          errorMessage = error.response.data.errors.map(err => err.msg).join(", ");
        }
      }
      setServerError(errorMessage);
    }
  };

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className="login-background d-flex justify-content-center align-items-center vh-100">
      <Card style={{
        width: "472px",
        background: "linear-gradient( rgba(27, 38, 54, 0.9), rgba(179, 121, 48, 0.9))",
        border: "1px solid #F4BC2E",
        borderRadius: "16px",
      }}>
        <CardBody>
          <CardTitle tag="h3" className="text-center">
            <img src={bullLogo} alt="Bull Logo" style={{ width: "150px", height: "150px" }} />
          </CardTitle>

          <strong className="text-center d-block" style={{ color: "white" }}>OTP</strong>
          <br />
          <p className="text-center" style={{ color: "black" }}>
            Please Enter the OTP sent to:
            <br /><br />
            <strong style={{ color: "white" }}>
              {email} <FaEdit style={{ color: 'blue', cursor: 'pointer' }} onClick={handleClick} />
            </strong>
          </p>

          {serverError && (
            <p style={{ color: 'yellow', textAlign: 'center', fontWeight: 'bold', marginTop: '15px' }}>
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
                  maxLength={1}
                  style={{
                    width: '60px',
                    height: '60px',
                    textAlign: 'center',
                    fontSize: '24px',
                    borderRadius: '8px',
                    border: '2px solid #F4BC2E',
                  }}
                  placeholder="0"
                />
              ))}
            </FormGroup>

            <Button
              type="submit"
              style={{
                width: '100%',
                height: '60px',
                marginTop: '20px',
                backgroundColor: "#DAA520",
                borderColor: "#DAA520",
                color: "black",
                fontWeight: "bold",
                fontSize: '18px',
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                borderRadius: '8px',
              }}
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
