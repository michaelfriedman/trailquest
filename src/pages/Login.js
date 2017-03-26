import React, { Component } from 'react';
import axios from 'axios';
import { browserHistory, Link } from 'react-router';
import { Button, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';

function validate(email, password) {
  // true means invalid
  return {
    email: email.length === 0,
    password: password.length < 8,
  };
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.canBeSubmitted = this.canBeSubmitted.bind(this);
    this.getEmailValidationState = this.getEmailValidationState.bind(this);
    this.getPasswordValidationState = this.getPasswordValidationState.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  getEmailValidationState() {
    if (this.state.email.length === 0) return;
    // eslint-disable-next-line no-useless-escape
    if (this.state.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) return 'success';
    else {
      return 'error';
    }
  }

  getPasswordValidationState() {
    if (this.state.password.length === 0) return null;
    if (this.state.password.length >= 8 && this.state.password.length <= 64) {
      return 'success';
    }
    if (this.state.password.length < 8) return 'error';
    if (this.state.password.length > 64) return 'error';
  }

  canBeSubmitted() {
    const errors = validate(this.state.email, this.state.password);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  handleChange({ target }) {
    if (target.name) {
      this.setState({
        [target.name]: target.value,
      });
    }
  }

  handleReset() {
    this.setState({
      email: '',
      password: '',
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.canBeSubmitted()) {
      event.preventDefault();
      return;
    }
    const { email, password } = this.state;
    const user = {
      email,
      password,
    };
    axios.post('/token', user)
      .then((response) => {
        if (response.status === 200) {
          browserHistory.push('/profile');
          this.props.updateLoggedIn(true);
          this.setState({
            email: '',
            password: '',
          });
        }
      })
      .catch((error) => {
        console.error(error);
        // alert('Unknown Email Or Password')
      });
  }

  render() {
    const errors = validate(this.state.email, this.state.password);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-md-offset-7">
            <div className="panel panel-default">
              <div className="panel-heading">
                <span className="glyphicon glyphicon-lock" /> Login</div>
              <div className="panel-body">
                <Form onSubmit={this.handleSubmit} className="form-horizontal" role="form">
                  <FormGroup validationState={this.getEmailValidationState()}>
                    <label htmlFor="inputEmail3" className="col-sm-3 control-label">
                    Email</label>
                    <div className="col-sm-9">
                      <FormControl
                        onChange={this.handleChange}
                        value={this.state.email}
                        type="email"
                        name="email"
                        className={errors.email ? 'col-sm-9 error form-control input-sm chat-input' : 'form-control input-sm chat-input col-sm-9'}
                        id="inputEmail3"
                        placeholder="Email"
                        required
                      />
                      <FormControl.Feedback />
                    </div>
                  </FormGroup>
                  <FormGroup validationState={this.getPasswordValidationState()}>
                    <ControlLabel htmlFor="password" className="col-sm-3 control-label">
                    Password</ControlLabel>
                    <div className="col-sm-9">
                      <FormControl
                        name="password"
                        onChange={this.handleChange}
                        value={this.state.password}
                        type="password"
                        className={errors.password ? 'col-sm-9 error form-control input-sm chat-input' : 'form-control input-sm chat-input col-sm-9'}
                        id="inputPassword3"
                        placeholder="Password"
                        required
                      />
                      <FormControl.Feedback />
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <div className="col-sm-offset-3 col-sm-9">
                      <div className="checkbox">
                        <label>
                          <input type="checkbox" />
                          Remember me
                        </label>
                      </div>
                    </div>
                  </FormGroup>
                  <div className="form-group last">
                    <div className="col-sm-offset-3 col-sm-9">
                      <Button
                        disabled={isDisabled}
                        type="submit"
                        bsStyle="success"
                        className="btn-sm"
                      >
                        Sign in
                      </Button>
                      <Button
                        onClick={this.handleReset}
                        type="reset"
                        className="btn btn-default btn-sm"
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
              <div className="panel-footer">
                Not Registred? <Link to="registration">Register here</Link></div>
            </div>
          </div>
        </div>
        <style jsx>{`
                body {
                  background: url("bg.png") no-repeat center center fixed;
                  -webkit-background-size: cover;
                  -moz-background-size: cover;
                  -o-background-size: cover;
                  background-size: cover;
                }
                .panel-default {
                  opacity: 0.9;
                  margin-top:30px;
                }
                .form-group.last { margin-bottom:0px; }
                `}</style>
      </div>
    );
  }
}

export default Login;
