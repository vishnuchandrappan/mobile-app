import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
export default function BCard(props) {
  return (
    <Card>
      <Card.Header as="h5">{props.title}</Card.Header>
      <Card.Body>
        <Card.Title>{props.subTitle}</Card.Title>
        <Card.Text>{props.text}</Card.Text>
        <Link to={"/" + props.link}>
          <Button variant="primary">Go</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
