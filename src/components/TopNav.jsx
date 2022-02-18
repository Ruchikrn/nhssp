import React, { Component } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import mainLogo from "../logo.png";
import "./TopNav.css";
import ToggleAboutButton from "./ToggleAboutButton";
import ToggleRunHelpTour from "./ToggleRunHelpTour";
import VisibleWhenOnRoute from "./VisibleWhenOnRoute";
import VisibleWhenAuthenticated from "./VisibleWhenAuthenticated";
import LogoutButton from "./LogoutButton";

class TopNav extends Component {
  render() {
    return (
      <header className="header py-3">
        <div className="container">
          <div className="row flex-nowrap justify-content-between align-items-center">
            <div className="col-4 pt-1 header-logo-container">
              <img
                className="img img-responsive header-logo"
                src={mainLogo}
                alt="Logo of Ministry of Health and Population"
              />
            </div>
            <div className="col-4 text-center">
              <Link to="/" className="header-title text-dark">
                स्वास्थ्य क्षेत्रका नवीनतम पहलहरु
              </Link>
            </div>
            <div className="col-4 d-flex justify-content-end align-items-center d-print-none">
              <VisibleWhenOnRoute route="/">
                <ToggleRunHelpTour className="btn btn-sm mr-2 btn-outline-secondary" />
              </VisibleWhenOnRoute>
              <ToggleAboutButton className="btn btn-sm btn-outline-secondary aboutbutton" />
              <VisibleWhenAuthenticated>
                <LogoutButton className="btn btn-sm btn-outline-secondary ml-2" />
              </VisibleWhenAuthenticated>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default TopNav;
