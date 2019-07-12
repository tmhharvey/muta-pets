import React, { Component } from "react";
import "./Modal.scss";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  render() {
    return (
      <>
        <Backdrop show={this.props.show} topStyle={"0%"} leftStyle={"-20%"} />
        <div
          className="Modal"
          style={{
            transform: this.props.show
              ? "translate(-50%, -50%)"
              : "translateY(-250vh)",
            opacity: this.props.show ? "1" : "0",
            backgroundImage: `url(${this.props.chosenImage})`
          }}
        >
          <div className="Modal__gradient"> {this.props.children}</div>

          {/* <p className="Modal__close">X</p> */}
        </div>
      </>
    );
  }
}
export default Modal;
