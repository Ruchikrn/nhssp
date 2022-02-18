import React, { Component } from 'react'
import { NavLink as RRNavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import './SecondNav.css'
import VisibleWhenAuthenticated from '../../components/VisibleWhenAuthenticated';
import ToggleAboutButton from '../../components/ToggleAboutButton';

class SecondNav extends Component {
  render() {
    return (

      <Navbar color="primary" expand="md"
        className="SecondNav border-bottom border-secondary text-white">
        <div className="container">

          <Nav navbar>

            <NavItem className="mr-2">
              <NavLink to="/" exact activeClassName="active" tag={RRNavLink}>गृह पृष्ट</NavLink>
            </NavItem>
            <NavItem className="mr-2 practicelistnav">
              <NavLink to="/practices" activeClassName="active" tag={RRNavLink}>पहलहरु</NavLink>

            </NavItem>
            <NavItem className="mr-2 provinciallistnav">
              <NavLink to="/sanghiya" activeClassName="active" tag={RRNavLink}>संघीय तहका पहलहरु</NavLink>
            </NavItem>
            <VisibleWhenAuthenticated reverse={true}>
              <NavItem className="mr-2 newpracticeregistrationlink">
                <NavLink to="/register-new-practice" activeClassName="active" tag={RRNavLink}>नयाँ पहल दर्ता</NavLink>
              </NavItem>
            </VisibleWhenAuthenticated>
            <VisibleWhenAuthenticated>
              <NavItem className="mr-2">
                <NavLink to="/admin" activeClassName="active" tag={RRNavLink}>व्यवस्थापक पृष्ठ</NavLink>
              </NavItem>
            </VisibleWhenAuthenticated>
          </Nav>

        </div>
      </Navbar>

    );
  }
}

export default SecondNav;