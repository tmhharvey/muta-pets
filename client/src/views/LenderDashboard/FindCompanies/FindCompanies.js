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
import "./FindCompanies.scss";
import CompanyInfoCard from "../CompanyInfoCard/CompanyInfoCard";

class FindCompanies extends React.Component {
  state = {
    companiesLookingForFunding: [
      {
        name: "-",
        paymentMethod: "-",
        amountSeeking: "-",
        monthlyRevenue: "",
        annualRevenue: "",
        id: "-"
      }
    ]
  };

  componentDidMount = async () => {
    console.log("find companies handler fired");
    const findCompanies = await fetch(
      process.env.REACT_APP_BACKEND + `lender/findAllCompanies`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    const parsedRes = await findCompanies.json();
    const updatedCompanyState = [];
    var companiesList = parsedRes.data.companiesList;

    companiesList.map(company => {
      const chosenProfile = company.profile;

      const profileParsed = JSON.parse(chosenProfile);
      var companyInfo = {
        profile: profileParsed,
        name: profileParsed.businessInformation.legalOrCorporateName,
        amountSeeking: profileParsed.fundingInformation.amountSeeking,
        monthlyRevenue: profileParsed.fundingInformation.monthlyRevenue,
        annualRevenue: profileParsed.fundingInformation.annualRevenue,
        id: company._id
      };
      updatedCompanyState.push(companyInfo);
      console.log(updatedCompanyState);
    });

    this.setState({
      companiesLookingForFunding: updatedCompanyState
    });

    //
    // const chosenProfile = parsedRes.data.companiesList[0].profile;

    // const profileParsed = JSON.parse(chosenProfile);
    // console.log(profileParsed.fundingInformation);

    // console.log("====");
  };

  moreInfoHandler = (e, company) => {
    e.preventDefault();

    console.log(company);

    this.props.history.push({
      pathname: "/lender-dashboard/company-info/" + company.id,
      state: {
        company
      }
    });
  };
  render() {
    const companiesRendered = this.state.companiesLookingForFunding.map(
      company => {
        return (
          <>
            <tr>
              <td>{company.name}</td>
              <td>{company.paymentMethod}</td>
              <td>{company.amountSeeking}</td>
              <td>
                <Button
                  onClick={e => this.moreInfoHandler(e, company)}
                  color="primary"
                >
                  {" "}
                  More Info{" "}
                </Button>
              </td>
            </tr>
          </>
        );
      }
    );
    return (
      <div>
        <h1>Find Your Next Investment</h1>
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" />
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Payment Method</th>
                      <th>Seeking</th>
                      <th>Additional Info</th>
                    </tr>
                  </thead>
                  <tbody>{companiesRendered}</tbody>
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
        <Route path="/lender-dashboard/company-info" />
      </div>
    );
  }
}

export default FindCompanies;
