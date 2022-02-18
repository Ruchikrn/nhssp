import React from 'react';
import { Link, NavLink as RRNavLink } from 'react-router-dom'
import { Nav, NavItem, NavLink } from 'reactstrap';

export default class AdminNav extends React.Component {

  render() {
    return (
      <div className={this.props.className}>
        <Nav className="border pt-2 pb-2 pl-2" pills>
          <NavItem>
            <NavLink to="/admin" activeClassName="active" exact tag={RRNavLink}>Dashboard</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/admin/practices" activeClassName="active" tag={RRNavLink}>Practices</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/admin/programs" activeClassName="active" tag={RRNavLink}>Programs</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/admin/moderation" activeClassName="active" tag={RRNavLink}>Moderation</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/admin/federalpractices" activeClassName="active" tag={RRNavLink}>Federal Practices</NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}