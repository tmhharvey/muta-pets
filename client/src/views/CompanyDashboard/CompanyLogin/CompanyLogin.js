import React, { Component } from "react";
import { Link, Route, Redirect } from "react-router-dom";
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
import CompanyRegister from "../CompanyRegister/CompanyRegister";
class CompanyLogin extends Component {
  state = {
    email: "tmhharvey@gmail.com",
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

  loginHandler = async (e, email, password) => {
    e.preventDefault();

    try {
      console.log("we're about to post login to the server");

      const loginResponse = await fetch(
        process.env.REACT_APP_BACKEND + `company-auth/login`,
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            userType: "C"
          }),
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      const parsedRes = await loginResponse.json();
      console.log("We are halfway through the process...");
      console.log(parsedRes.status);

      // If a successful response...

      if (parsedRes.status === 200) {
        console.log("got login data! Response is...");
        console.log(parsedRes.data);

        // clean incoming data

        this.setState(
          {
            userId: parsedRes.data.userId,
            userType: parsedRes.data.userType
          },
          () => {
            this.props.context.successfulLogin("Company");
          }
        );
      } else {
        console.log("failed to get login data!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  registerRedirect = e => {
    e.preventDefault();

    this.props.history.push("/register");
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
                              color="success"
                              className="px-4"
                              onClick={e => {
                                this.loginHandler(
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
                    className="text-white bg-success py-5 d-md-down-none"
                    style={{ width: "44%" }}
                  >
                    <CardBody className="text-center">
                      <div>
                        <h2>Sign up</h2>
                        <p>
                          Sign up to create your profile and submit your
                          application for Seed Financial's Funding Program!
                        </p>

                        <Button
                          color="success"
                          className="mt-3"
                          active
                          tabIndex={-1}
                          onClick={e => {
                            this.registerRedirect(e);
                          }}
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
        />
      </>
    );
  }
}

export default CompanyLogin;
