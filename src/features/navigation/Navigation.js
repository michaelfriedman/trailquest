import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import axios from 'axios';
import { Navbar, MenuItem, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class NavbarComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      userId: 0,
    };
    this.updateUser = this.updateUser.bind(this);
    this.handleSignout = this.handleSignout.bind(this);
    this.updateLoggedIn = this.updateLoggedIn.bind(this);
  }

  componentDidMount() {
    axios.get('/token')
      .then((res) => {
        if (res.data) {
          this.setState({
            isLoggedIn: true,
          });
          // browserHistory.push('/profile');
        }
      });
  }

  updateLoggedIn(newLoggedIn) {
    this.setState({
      isLoggedIn: newLoggedIn,
    });
  }

  updateUser(newUserId) {
    this.setState({
      userId: newUserId,
    });
  }

  handleSignout() {
    axios.delete('token');
    this.setState({
      isLoggedIn: false,
    });
  }

  render() {
    return (
      <div>
        <Navbar inverse fixedTop collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">TrailQuest</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              {
                  this.state.isLoggedIn
                    ? <NavDropdown eventKey={3} title="Menu" id="basic-nav-dropdown">
                      <LinkContainer to={{ pathname: '/profile' }}><MenuItem>Profile</MenuItem></LinkContainer>
                      <MenuItem>Inbox</MenuItem>
                      <MenuItem>Contribute</MenuItem>
                      <MenuItem divider />
                      <MenuItem>Submit Feedback</MenuItem>
                    </NavDropdown>
                  : null
              }
            </Nav>
            <Nav pullRight>
              {
                  this.state.isLoggedIn
                    ? <LinkContainer to={{ pathname: '/' }}><NavItem onClick={this.handleSignout}>Sign Out</NavItem></LinkContainer>
                : <LinkContainer to={{ pathname: '/registration' }}><NavItem>Sign Up</NavItem>
                </LinkContainer>
              }
              {
                  !this.state.isLoggedIn
                    ? <LinkContainer to={{ pathname: '/login' }}><NavItem>Login </NavItem>
                    </LinkContainer>
                  : null
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <style jsx>{`
          body {
            padding-top: 70px;
          }
        `}</style>
        {React.cloneElement(
          this.props.children, {
            userId: this.state.userId,
            updateUser: this.state.updateUser,
            isLoggedIn: this.state.isLoggedIn,
            updateLoggedIn: this.updateLoggedIn,
            result: this.state.result,
          })}
      </div>
    );
  }
}

export default NavbarComponent;
