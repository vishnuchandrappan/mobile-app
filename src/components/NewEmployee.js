import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Login() {
  return (
    <Form className="form-1">
      <div>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Name" />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username / Email</Form.Label>
          <Form.Control type="email" placeholder="Username" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Contact</Form.Label>
          <Form.Control type="text" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>DOB</Form.Label>
          <Form.Control type="date" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Employee
        </Button>
      </div>
    </Form>
  );
}
