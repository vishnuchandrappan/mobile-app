import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <Form className="form-1">
      <Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Shop Name</Form.Label>
          <Form.Control type="text" placeholder="Shop Name" />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Contact</Form.Label>
          <Form.Control type="text" placeholder="+91 9999 0000 00" />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
          <Form.Control type="password" placeholder="Confirm Password" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Working Hours</Form.Label><br/>
          From <Form.Control type="time" placeholder="from" />
          To <Form.Control type="time" placeholder="to" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create New Account
        </Button>
        <hr />
        Already have an account ?
        <Link to="/login" className="btn btn-success">
          Login
        </Link>
      </Form.Group>
    </Form>
  );
}
