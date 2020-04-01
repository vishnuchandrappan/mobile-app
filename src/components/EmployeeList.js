import React from "react";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
export default function EmployeeList() {
  return (
    <div className="list">
      <Card>
        <Card.Header as="h5">John Doe</Card.Header>
        <Card.Body>
          <Card.Title>Manager</Card.Title>
          <Card.Text>
            With supporting text below as a natural lead-in to additional
            content.
          </Card.Text>
          <Button variant="primary">Manage</Button>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header as="h5">Jane Doe</Card.Header>
        <Card.Body>
          <Card.Title>Sales Executive</Card.Title>
          <Card.Text>
            With supporting text below as a natural lead-in to additional
            content.
          </Card.Text>
          <Button variant="primary">Manage</Button>
        </Card.Body>
      </Card>
    </div>
  );
}
