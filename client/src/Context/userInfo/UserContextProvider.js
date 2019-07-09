import React, { Component } from "react";
import { withRouter } from "react-router-dom";
export const UserInfoAppContext = React.createContext();

class UserContextProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "Taylor"
    };
  }

  render() {
    const { children } = this.props;
    return (
      <UserInfoAppContext.Provider
        value={{
          state: { ...this.state }
        }}
      >
        {children}
      </UserInfoAppContext.Provider>
    );
  }
}

export default withRouter(UserContextProvider);
