import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, Form, FormGroup, Input, Button, Alert } from 'reactstrap';
import { useAuth } from '../context/AuthContext'; 
import axios from '../config/axios';
import './Login.css'; 

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
          backgroundColor: "rgba(255, 255, 255, 0.3)",  // Semi-transparent card
          border: "none",  // No border
          padding: "20px",  // Padding for spacing inside the card
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
            OTP
          </strong>
          <p className="text-center" style={{ color: "black" }}>
            Enter the OTP sent to your email: <strong style={{ color: "white" }}>{email}</strong>
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


// import React, { useState, useRef } from 'react';
// import { Card, CardBody, CardTitle, Form, FormGroup, Input, Button, Alert } from 'reactstrap';
// import { useAuth } from '../context/AuthContext';
// import axios from '../config/axios';
// import './Login.css';

// const VerifyOtp = () => {
//   const { email } = useAuth();
//   const [otp, setOTP] = useState(['', '', '', '']);
//   const [message, setMessage] = useState("");
//   const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

//   const handleOTPChange = (value, index) => {
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOTP(newOtp);

//     if (value && index < 3) {
//       // Move to the next input if the current input is filled
//       inputRefs[index + 1].current.focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === 'Backspace' && !otp[index] && index > 0) {
//       // Move to the previous input if backspace is pressed and the current input is empty
//       inputRefs[index - 1].current.focus();
//     }
//   };

//   const handleOTPVerification = async () => {
//     try {
//       const fullOtp = otp.join('');
//       const res = await axios.post('/verifyOtp', { email, otp: fullOtp });
//       setMessage(res.data.message);
//     } catch (error) {
//       setMessage(error.response?.data?.error || 'An error occurred');
//     }
//   };

//   return (
//     <div className="login-background">
//       <Card
//         style={{
//           width: "100%",
//           maxWidth: "400px",
//           backgroundColor: "rgba(255, 255, 255, 0.3)",
//           border: "none",
//           padding: "20px",
//         }}
//       >
//         <CardBody>
//           <CardTitle tag="h3" className="text-center">
//             <img
//               src="https://images.scalebranding.com/angry-bull-logo-ba646aad-ea04-4187-9a39-f53b670a293d.jpg"
//               alt="Angry Bull Icon"
//               style={{ width: "100px", marginRight: "10px" }}
//             />
//             <br />
//             BullForce
//             <br />
//             Wealth Vaults
//           </CardTitle>

//           <strong className="text-center" style={{ color: "white", display: "block", textAlign: "center" }}>
//             OTP
//           </strong>
//           <p className="text-center" style={{ color: "black" }}>
//             Enter the OTP sent to your email: <strong style={{ color: "white" }}>{email}</strong>
//           </p>

//           {message && <Alert color="danger">{message}</Alert>}
//           <Form onSubmit={(e) => { e.preventDefault(); handleOTPVerification(); }}>
//             <FormGroup style={{ display: 'flex', justifyContent: 'space-between' }}>
//               {otp.map((digit, index) => (
//                 <Input
//                   key={index}
//                   type="text"
//                   value={digit}
//                   onChange={(e) => handleOTPChange(e.target.value.slice(-1), index)}
//                   onKeyDown={(e) => handleKeyDown(e, index)}
//                   ref={inputRefs[index]}
//                   maxLength={1}
//                   style={{
//                     width: '20%',
//                     textAlign: 'center',
//                     fontSize: '1.5rem',
//                     padding: '5px',
//                     borderRadius: '5px',
//                   }}
//                 />
//               ))}
//             </FormGroup>
//             <Button
//               style={{ backgroundColor: "#FFD700", borderColor: "#FFD700", color: "black" }}
//               block
//               onClick={handleOTPVerification}
//             >
//               Proceed
//             </Button>
//           </Form>
//         </CardBody>
//       </Card>
//     </div>
//   );
// };

// export default VerifyOtp;
