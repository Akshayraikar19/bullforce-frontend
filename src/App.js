// import { Routes, Route, Link } from 'react-router-dom';
// import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
// import Login from './components/Login';
// import VerifyOtp from './components/VerifyOtp';
// import bullLogo from "./images/Group 42228.png"

// function App() {
//   return (
//     <div>
//       {/* Navbar */}
//       <Navbar color="dark" dark expand="md">
//       <NavbarBrand href="/">
//       <img
//            src={bullLogo}
//               alt="Bull Force Logo"
//            style={{ width: '50px', height: '50px', margin: '20px', marginLeft: '30px' }} // Adjust margin-left to move logo right
//        />
//       </NavbarBrand>
//         <Nav className="ml-auto" navbar>
//           <NavItem>
//             <NavLink tag={Link} to="/"></NavLink>
//           </NavItem>
//         </Nav>
//       </Navbar>

//       {/* Routes */}
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/verifyOtp" element={<VerifyOtp />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;

import { Routes, Route, Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Login from './components/Login';
import VerifyOtp from './components/VerifyOtp';
import bullLogo from "./images/Group 42228.png"

function App() {
  return (
    <div>
      {/* Navbar */}
      <Navbar color="dark" dark expand="md" style={{ padding: '5px 20px' }}> {/* Reduce padding */}
        <NavbarBrand href="/" style={{ fontSize: '22px', fontWeight: 'bold' }}> {/* Increase font size and make text bold */}
          <img
            src={bullLogo}
            alt="Bull Force Logo"
            style={{ width: '50px', height: '50px', margin: '10px', marginLeft: '30px' }} // Adjust logo size and margin
          />
        </NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/"></NavLink> {/* Add text to NavLink */}
          </NavItem>
        </Nav>
      </Navbar>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/verifyOtp" element={<VerifyOtp />} />
      </Routes>
    </div>
  );
}

export default App;
