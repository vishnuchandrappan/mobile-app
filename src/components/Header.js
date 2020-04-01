import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import "../styles/navbar.scss";
export default function Header() {
  return (
    <Navbar bg="warning" expand="lg" className="flex between">
      <Navbar.Brand>Smart Mart</Navbar.Brand>
      <Navbar.Toggle />
      <div>Make Your Shopping Experience easier</div>
      <Navbar.Collapse>
        {
          // <Navbar.Text>
          //   Signed in as: <Link to="/profile">John Doe</Link>
          // </Navbar.Text>
        }
        <Nav className="mr-auto">
          <Nav.Link>
            <Link to="/">Home</Link>
          </Nav.Link>
          <NavDropdown title="Login / Signup" id="basic-nav-dropdown">
            <NavDropdown.Item>
              <Link to="/login">Login</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/signup">Signup</Link>
            </NavDropdown.Item>
            {
              // <NavDropdown.Divider />
              // <NavDropdown.Item href="#action/3.4">
              //   Separated link
              // </NavDropdown.Item>
            }
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
