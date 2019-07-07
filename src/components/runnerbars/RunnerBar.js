import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";


export default function RunnerBar() {
  return (
    <Navbar>
    <Navbar.Brand href="/welcome">
      <i className="fas fa-robot fa-2x "> </i>
    </Navbar.Brand>
    <Navbar.Collapse>
      <Button variant="success">
        Run
      </Button>
    </Navbar.Collapse>
  </Navbar>
  )
}
