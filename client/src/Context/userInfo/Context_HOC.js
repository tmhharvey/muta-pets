import React from "react";

import { UserInfoAppContext } from "./UserContextProvider";

export default function withUserInfoContext(Component) {
  return function contextComponent(props) {
    return (
      <UserInfoAppContext.Consumer>
        {context => <Component {...props} context={context} />}
      </UserInfoAppContext.Consumer>
    );
  };
}
