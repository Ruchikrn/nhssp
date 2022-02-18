import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Container, Row, Col } from "reactstrap";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import TopNav from "./components/TopNav";
import NewPracticeRegistration from "./components/NewPracticeRegistration";
import Footer from "./components/Footer";
import AboutModal from "./components/AboutModal";
import PrivateRoute from "./components/PrivateRoute";
import SubmittedPage from "./components/SubmittedPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SearchPracticePage from "./pages/search/SearchPracticePage";
import LoginPage from "./pages/login/LoginPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import PracticeDetailPage from "./pages/practice/PracticeDetailPage";
import HomePage from "./pages/home/HomePage";
import SecondNav from "./pages/home/SecondNav";
import FederalPractices from "./pages/federalpractices/FederalPractices";

class App extends Component {
  render() {
    return (
      <>
        <Helmet>
          <title>स्वास्थ्य क्षेत्रका सकारात्मक पहलहरु</title>
        </Helmet>
        <TopNav />
        <SecondNav />
        <Container
          className="main-container"
          style={{ backgroundColor: "white" }}
        >
          <Row>
            <Col className="mt-4">
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/practices" component={SearchPracticePage} />
                <Route exact path="/sanghiya" component={FederalPractices} />
                <Route
                  exact
                  path="/register-new-practice/"
                  component={NewPracticeRegistration}
                />
                <Route exact path="/submitted/" component={SubmittedPage} />
                <Route
                  exact
                  path="/practices/:id"
                  name="practice-detail"
                  component={PracticeDetailPage}
                />
                <PrivateRoute path="/admin" component={AdminDashboard} />
              </Switch>
            </Col>
          </Row>
        </Container>
        <Footer />
        <AboutModal />
        <ToastContainer
          position="bottom-center"
          autoClose={1000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          draggable
        />
      </>
    );
  }
}

export default withRouter(App);
