import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
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
import "./Register.scss";
import { withRouter } from "react-router-dom";

class Register extends Component {
  state = {
    userName: "Larothion",
    email: "tmhharvey@gmail.com",
    password: "password",
    passwordValidate: "password"
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  registerHandler = async (e, email, password, userName) => {
    e.preventDefault();
    console.log("we're about to post Register to the server");

    try {
      const registerResponse = await axios.post(
        process.env.REACT_APP_BACKEND + "auth/register",
        {
          email: email,
          password: password,
          userName: userName
        }
      );

      // If a successful response...

      if (registerResponse.data.status === 200) {
        console.log("Sucessful register! Status is...");
        console.log(registerResponse.data.status);

        // set state
        const newUserType = registerResponse.data.userType;
        // console.log("The new User Type is...");
        // console.log(JSON.parse(newUserType));
        this.setState(
          {
            userId: registerResponse.data.userId,
            userType: newUserType
          },
          () => {
            this.props.context.successfulLogin();
          }
        );
      } else {
        console.log("Failed to register!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div className="app flex-row align-items-center registerSection">
        <Row className="justify-content-center registerSection__card">
          <Col md="9" lg="7" xl="6">
            <Card className="mx-4">
              <CardBody className="p-4">
                <Form>
                  <h1>Adventure and Prizes Await...</h1>
                  <p className="text-muted">
                    Create your account and secure your very own{" "}
                    <strong className="registerSection--orangeFont">
                      Muta Pet
                    </strong>{" "}
                    and{" "}
                    <strong className="registerSection--greenFont">
                      5000 FREE{" "}
                    </strong>{" "}
                    Muta Gems!!
                  </p>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText />
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder="Username"
                      autoComplete="username"
                      name="userName"
                      value={this.state.userName}
                      onChange={this.handleInputChange}
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>@</InputGroupText>
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
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      name="password"
                      value={this.state.password}
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
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      name="passwordValidate"
                      value={this.state.passwordValidate}
                      onChange={this.handleInputChange}
                    />
                  </InputGroup>
                  {this.state.password === this.state.passwordValidate ? (
                    <Button
                      color="success"
                      block
                      onClick={e => {
                        this.registerHandler(
                          e,
                          this.state.email,
                          this.state.password,
                          this.state.userName
                        );
                      }}
                    >
                      Create Account
                    </Button>
                  ) : (
                    <p className="text-danger">Passwords Don't Match!</p>
                  )}
                </Form>
              </CardBody>
              <CardFooter className="p-4 text-center">
                {/* <img src={logo} alt="logo" /> */}
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(Register);
