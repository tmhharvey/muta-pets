import React, { Component } from "react";
import { withRouter } from "react-router-dom";
export const AuthAppContext = React.createContext();

const SESSIONTIMEOUT = 3600000; //1 hour

class AuthContextProvider extends Component {
  constructor(props) {
    super(props);
    let authenticated;

    if (localStorage.getItem("authenticated")) {
      authenticated = localStorage.getItem("authenticated");
    }

    this.state = {
      authenticated
    };

    this.lastActiveTime = new Date().getTime();

    window.onclick = () => {
      this.lastActiveTime = new Date().getTime();
    };
    window.onkeypress = () => {
      this.lastActiveTime = new Date().getTime();
    };
    window.onmousemove = () => {
      this.lastActiveTime = new Date().getTime();
    };
    window.onscroll = () => {
      this.lastActiveTime = new Date().getTime();
    };

    window.setInterval(this.checkSessionTime, 1000);
  }

  checkSessionTime = () => {
    const { authenticated } = this.state;
    const {
      history: { push }
    } = this.props;
    const remTime = Math.floor(new Date().getTime() - this.lastActiveTime);
    if (remTime > SESSIONTIMEOUT && authenticated) {
      this.setState({ timedOut: true, authenticated: false }, () => {
        sessionStorage.removeItem("authenticated");
        push("/");
      });
    }
  };

  logoutHandler = () => {
    this.setState(
      {
        registration: false,
        userId: "",
        userType: ""
      },
      () => {
        localStorage.removeItem("authenticated");
        this.setState({
          authenticated: false
        });
        this.props.history.push("/");
      }
    );
  };

  successfulLogin = sessionData => {
    localStorage.setItem("authenticated", true);
    const homePathName = "/home";
    console.log('SESSIO DATA PASSED ON SUCCESSFUL LOGIN');
    console.log(sessionData)

    this.setState(
      {
        authenticated: true,
        session: sessionData
      },
      () => {
        console.log('CONTEXT SESSION DATA');
        console.log(this.state.session);
        this.props.history.push(homePathName);
      }
    );
  };

  render() {
    const { children } = this.props;
    return (
      <AuthAppContext.Provider
        value={{
          state: { ...this.state },
          logoutHandler: () => {
            this.logoutHandler();
          },
          successfulLogin: userName => {
            this.successfulLogin(userName);
          }
        }}
      >
        {children}
      </AuthAppContext.Provider>
    );
  }
}

export default withRouter(AuthContextProvider);
