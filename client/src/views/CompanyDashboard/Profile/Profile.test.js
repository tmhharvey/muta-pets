import React from "react";
import ReactDOM from "react-dom";
import ValidationForms from "./ValidationForms";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Profile />, div);
  ReactDOM.unmountComponentAtNode(div);
});
