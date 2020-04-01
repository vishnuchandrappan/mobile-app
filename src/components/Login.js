import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

export default function NewEmployee() {
  return (
    <Form className="form-1">
      <Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
        <hr />
        Don't have an account ? Create a new one{" "}
        <Link to="/signup" className="btn btn-success">
          Signup
        </Link>
      </Form.Group>
    </Form>
  );
}
