import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import NavItem from "react-bootstrap/NavItem";
import Navbar from "react-bootstrap/Navbar";
import NavBrand from "react-bootstrap/NavbarBrand";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default class RunnerBar extends Component {
  render() {
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
    );
  }
}
