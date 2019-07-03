import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import LenderRegister from "../LenderRegister/LenderRegister";
class LenderLogin extends Component {
  state = {
    email: "axtyler@aim.com",
    password: "password"
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    console.log(value);
    console.log(name);

    this.setState({
      [name]: value
    });
  };
  render() {
    return (
      <>
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="8">
                <CardGroup>
                  <Card className="p-4">
                    <CardBody>
                      <Form>
                        <h1>Login</h1>
                        <p className="text-muted">Sign In to your account</p>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="text"
                            placeholder="Email"
                            autoComplete="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                          />
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                          />
                        </InputGroup>
                        <Row>
                          <Col xs="6">
                            <Button
                              color="primary"
                              className="px-4"
                              onClick={e => {
                                this.props.login(
                                  e,
                                  this.state.email,
                                  this.state.password
                                );
                              }}
                            >
                              Login
                            </Button>
                          </Col>
                          <Col xs="6" className="text-right">
                            <Button color="link" className="px-0">
                              Forgot password?
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    </CardBody>
                  </Card>
                  <Card
                    className="text-white bg-primary py-5 d-md-down-none"
                    style={{ width: "44%" }}
                  >
                    <CardBody className="text-center">
                      <div>
                        <h2>Sign up</h2>
                        <p>
                          Sign up and search through companies to find the right
                          one for you!
                        </p>

                        <Button
                          color="primary"
                          className="mt-3"
                          active
                          tabIndex={-1}
                          onClick={this.props.registration}
                        >
                          Register Now!
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </CardGroup>
              </Col>
            </Row>
          </Container>
        </div>
        <Route
          path="/lender-register"
          render={() => <LenderRegister register={this.props.register} />}
        />
      </>
    );
  }
}

export default LenderLogin;
