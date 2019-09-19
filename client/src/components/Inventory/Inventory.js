import React, { Component } from "react";
import "./Inventory.scss";
import { Row, Col, Button } from "reactstrap";

class Inventory extends Component {
  state = {};
  render() {
    var renderInventory = this.props.inventory.map((itemInfo, Index) => {
      return (
        <Col sm="4" key={itemInfo.name + itemInfo.defaultCount + Index}>
          <p className="inventorySection__itemTitle"> {itemInfo.name} </p>
          <div
            className={
              this.state.inventoryItemActive
                ? "inventorySection__inventoryCard inventoryActive"
                : "inventorySection__inventoryCard"
            }
            onClick={() => {
              this.props.inventoryStateHandler(itemInfo, Index);
            }}
          >
            <p className="inventorySection__inventoryCard__itemUses">
              {itemInfo.defaultCount}
            </p>
            <img src={itemInfo.image} />
          </div>
        </Col>
      );
    });

    return (
      <Col sm="3">
        <div className="inventorySection">
          {" "}
          <h2 className="inventorySection__title">Inventory</h2>
          <hr />
          <Row>{renderInventory}</Row>
        </div>
      </Col>
    );
  }
}

export default Inventory;
