import { Routes, Route, Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Login from './components/Login';
import VerifyOtp from './components/VerifyOtp';
import bullLogo from "./images/Group 42228.png";

function App() {
  return (
    <div>
      {/* Navbar */}
      <Navbar color="dark" dark expand="md" style={{ padding: '5px 20px', height: "68px" }}>
        {/* Render NavbarBrand only on /verifyOtp route */}
        <Routes>
          <Route
            path="/verifyOtp"
            element={
              <NavbarBrand href="/" style={{ fontSize: '22px', fontWeight: 'bold' }}>
                <img
                  src={bullLogo}
                  alt="Bull Force Logo"
                  style={{ width: '146.82px', height: '45px', top: "12px", left: "62px" }} // Adjust logo size and margin
                />
              </NavbarBrand>
            }
          />
        </Routes>

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

