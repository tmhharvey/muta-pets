import React, { Component } from "react";
import "./App.scss";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
  Jumbotron,
  Button
} from "reactstrap";
import { BrowserRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <h1>Your MERN Template with SaSS is working!</h1>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
