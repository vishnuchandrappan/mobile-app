import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/navbar.scss";
function Header({ isLoggedIn, user, onLogout }) {
  return (
    <Navbar bg="danger" expand="lg" className="flex between text-light">
      <Navbar.Brand className="text-light ls-3">XPREDOCON</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        {isLoggedIn ? (
          <Navbar.Text>
            Signed in as: <Link to="/profile">{user.name}</Link>
          </Navbar.Text>
        ) : (
          ""
        )}
        <Nav className="mr-auto">
          <Nav.Link>
            <Link to="/">Home</Link>
          </Nav.Link>
          {isLoggedIn ? (
            <button
              className="btn btn-danger"
              onClick={() => {
                onLogout();
              }}
            >
              Logout
            </button>
          ) : (
            <NavDropdown title="Login / Signup" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Link to="/login">Login</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/signup">Signup</Link>
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.login.isLoggedIn,
    user: state.profile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLogout: () => dispatch({ type: "LOGOUT_REQUEST" }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
