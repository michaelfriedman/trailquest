import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import { Navbar, MenuItem, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class NavbarComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      userId: 0,
      user: {},
    };
    this.updateUser = this.updateUser.bind(this);
    this.handleSignout = this.handleSignout.bind(this);
    this.updateLoggedIn = this.updateLoggedIn.bind(this);
  }

  componentWillMount() {
    axios.get('/users/id')
      .then(res => {
        this.setState({ user: res.data });
      })
      // eslint-disable-next-line no-console
      .catch(error => console.error(error));
    axios.get('/token')
      .then((res) => {
        if (res.data) {
          this.setState({
            isLoggedIn: true,
          });
        }
      })
      // eslint-disable-next-line no-console
      .catch(error => console.error(error));
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
              <Link className="lobster" to="/">TrailQuest</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              {
                  this.state.isLoggedIn
                    ? <NavDropdown title="Menu" id="basic-nav-dropdown">
                      <LinkContainer to={{ pathname: '/profile' }}><MenuItem>Profile</MenuItem></LinkContainer>
                      <LinkContainer to={{ pathname: '/search' }}><MenuItem>Search</MenuItem></LinkContainer>
                      <LinkContainer to={{ pathname: '/events' }}>
                        <MenuItem>Events</MenuItem>
                      </LinkContainer>
                      <MenuItem divider />
                      <MenuItem>Submit Feedback</MenuItem>
                    </NavDropdown>
                : <LinkContainer to={{ pathname: '/search' }}><NavItem>Search</NavItem></LinkContainer>
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
        <style>{`
          @import url('https://fonts.googleapis.com/css?family=Lobster+Two');
          .lobster {
            font-family: 'Lobster Two', cursive;
          }
          body {
            padding-top: 70px;
          }
        `}</style>
        {React.cloneElement(
          this.props.children, {
            user: this.state.user,
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
