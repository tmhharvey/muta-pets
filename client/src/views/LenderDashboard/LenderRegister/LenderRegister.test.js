import React from "react";
import ReactDOM from "react-dom";
import LenderRegister from "./LenderRegister";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LenderRegister />, div);
  ReactDOM.unmountComponentAtNode(div);
});
