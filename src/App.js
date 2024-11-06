import { Routes, Route, Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Login from './components/Login';
import VerifyOtp from './components/VerifyOtp';

function App() {
  return (
    <div>
      {/* Navbar */}
      <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/">
          <img
            src="https://images.scalebranding.com/angry-bull-logo-ba646aad-ea04-4187-9a39-f53b670a293d.jpg"
            alt="Bull Force Logo"
            style={{ width: '50px', height: '50px', marginRight: '20px' }} // Adjust size as needed
          />
          BullForce
          Wealth Vaults
        </NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/"></NavLink>
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

