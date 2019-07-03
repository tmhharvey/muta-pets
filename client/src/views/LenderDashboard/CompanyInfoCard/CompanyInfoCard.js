import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Col,
  CustomInput,
  Form,
  FormFeedback,
  FormGroup,
  Label,
  Input,
  Row,
  Badge,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table
} from "reactstrap";
import { Formik } from "formik";
import { Link, Route } from "react-router-dom";
import * as Yup from "yup";
import "./CompanyInfoCard.scss";

class CompanyInfoCard extends React.Component {
  profileInfoHandler = (e, company) => {
    e.preventDefault();

    console.log("company data here...");
    console.log(company);

    this.props.history.push({
      pathname: "/lender-dashboard/company-info-advanced/" + company.id,
      state: {
        company
      }
    });
  };
  render() {
    const {
      annualRevenue,
      monthlyRevenue,
      amountSeeking,
      name,
      id,
      profile
    } = this.props.location.state.company;

    return (
      <div>
        <Row>
          <Col xs="12" lg="6">
            <Card className="card-accent-primary">
              <CardHeader>Company Details</CardHeader>
              <CardBody className="py-4 px-4">
                <Row className="text-left">
                  <Col xs="12" lg="12">
                    {" "}
                    <h4 className="mb-2 text-center">{name}</h4>
                    <hr />
                  </Col>
                  <Col xs="12" lg="12">
                    {" "}
                    <p className="mb-2">
                      <strong>Annual Revenue:</strong> {annualRevenue}
                    </p>
                    <hr />
                    <p className="mb-2">
                      <strong>Avg Monthly Revenue:</strong> {monthlyRevenue}
                    </p>
                    <hr />
                    <p className="mb-2">
                      <strong>Amount Seeking:</strong> <i>{amountSeeking}</i>
                    </p>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col xs="12" lg={{ size: 4, offset: 4 }}>
                    <Button
                      onClick={e =>
                        this.profileInfoHandler(
                          e,
                          this.props.location.state.company
                        )
                      }
                      color="primary"
                    >
                      {" "}
                      More Information{" "}
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" lg="6">
            <Card className="card-accent-primary">
              <CardHeader>Create Offer</CardHeader>
              <CardBody className="py-4 px-4">
                <Row className="text-left">
                  <Col xs="12" lg="12">
                    {" "}
                    <p className="mb-2">
                      <strong>Payment Length:</strong> 6 Months
                    </p>
                    <hr />
                    <p className="mb-2">
                      <strong>Billing Cycle:</strong> Monthly
                    </p>
                    <hr />
                    <p className="mb-2">
                      <strong>Payment Per Cycle:</strong> $30,833
                    </p>
                    <hr />
                    <p className="mb-2">
                      <strong>Interest Per Cycle:</strong> <i>3.8%</i>
                    </p>
                    <hr />
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col xs="12" lg={{ size: 6, offset: 3 }}>
                    <Link to="">
                      <Button color="success btn-large btn-block">
                        Submit Offer
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" />
                Bank Transactions
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Type</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Rent Payment</td>
                      <td>Withdrawal</td>
                      <td>$2200</td>
                    </tr>
                    <tr>
                      <td>Bi-weekly Sales</td>
                      <td>Deposit</td>
                      <td>$3150</td>
                    </tr>

                    <tr>
                      <td>Rent Payment</td>
                      <td>Withdrawal</td>
                      <td>$2200</td>
                    </tr>
                    <tr>
                      <td>Bi-weekly Sales</td>
                      <td>Deposit</td>
                      <td>$3150</td>
                    </tr>
                    <tr>
                      <td>Online Sales</td>
                      <td>Deposit</td>
                      <td>$1300</td>
                    </tr>
                    <tr>
                      <td>Rent Payment</td>
                      <td>Withdrawal</td>
                      <td>$2200</td>
                    </tr>
                    <tr>
                      <td>Online Sales</td>
                      <td>Deposit</td>
                      <td>$1300</td>
                    </tr>
                  </tbody>
                </Table>
                <Pagination>
                  <PaginationItem disabled>
                    <PaginationLink previous tag="button">
                      Prev
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">4</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink next tag="button">
                      Next
                    </PaginationLink>
                  </PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CompanyInfoCard;
