import React, { Component } from "react";
import { Link, Route, Redirect, withRouter } from "react-router-dom";

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
import axios from "axios";
import "./Login.scss";

class Login extends Component {
  state = {
    emailOrUserName: "tmhharvey@gmail.com",
    password: "password"
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState(
      {
        [name]: value
      },
      () => {
        console.log(this.state);
      }
    );
  };

  loginHandler = async (e, emailOrUserName, password) => {
    e.preventDefault();
    console.log("logging in...");
    try {
      console.log("we're about to post login to the server");

      const loginResponse = await axios.post(
        process.env.REACT_APP_BACKEND + "auth/login",
        {
          emailOrUserName: emailOrUserName,
          password: password,
          userType: "U"
        }
      );

      console.log(loginResponse);

      // If a successful response...
      if (loginResponse.data.status === 200) {
        console.log("got login data! Response is...");

        this.setState(
          {
            userId: loginResponse.data.userId,
            userType: loginResponse.data.userType,
            sessionData: loginResponse.data.session
          },
          () => {
            this.props.context.successfulLogin(this.state.sessionData);
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
        <div className="app flex-row align-items-center loginSection">
          <Row className="justify-content-center loginSection__card">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1> Adventure Awaits!</h1>
                      <p className="text-muted">
                        Sign in with your Email or Username
                      </p>
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
                          name="emailOrUserName"
                          value={this.state.emailOrUserName}
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
                            className="px-5 py-2"
                            onClick={e => {
                              this.loginHandler(
                                e,
                                this.state.emailOrUserName,
                                this.state.password
                              );
                            }}
                          >
                            Login
                          </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-2">
                            Forgot password?
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card
                  className="text-white py-5 d-md-down-none loginSection--background-primary"
                  style={{ width: "44%" }}
                >
                  <CardBody className="text-center">
                    <div>
                      <h2>New Challenger?</h2>
                      <p>
                        Create your account and secure your very own{" "}
                        <strong className="loginSection--orangeFont">
                          Muta Pet
                        </strong>{" "}
                        and{" "}
                        <strong className="loginSection--orangeFont">
                          5000 FREE{" "}
                        </strong>{" "}
                        Muta Gems!!
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
        </div>
        />
      </>
    );
  }
}

export default withRouter(Login);
