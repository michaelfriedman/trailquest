import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';
import request from 'superagent';
import { Col, Row, FormGroup, FormControl, ControlLabel, Form, Button, validationState } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Dropzone from 'react-dropzone';


const CLOUDINARY_UPLOAD_PRESET = 'torqfs7z';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dk5dqve4y/upload';

function validate(first_name, last_name, email, password, password_confirm) {
  // True means invalid
  return {
    first_name: first_name.length === 0,
    last_name: last_name.length === 0,
    email: email.length === 0,
    password: password.length < 8,
    password_confirm: password !== password_confirm,
  };
}

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirm: '',
      uploadedFileCloudinaryUrl: '',
      everFocusedFirstName: false,
      everFocusedEmail: false,
      everFocusedPassword: false,
      everFocusedPasswordConfirm: false,
      inFocus: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.canBeSubmitted = this.canBeSubmitted.bind(this);
    this.onImageDrop = this.onImageDrop.bind(this);
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0],
    });
    this.handleImageUpload(files[0]);
  }

  getValidationState() {
    if (this.state.first_name.length === 0) return;
    const first_nameLength = this.state.first_name.length;
    const isString = typeof this.state.first_name;
    if (first_nameLength >= 1) return 'success';
    else if (isString !== String) return 'warning';
    else if (this.state.first_name === undefined) return;
  }

  getLastNameValidationState() {
    if (this.state.last_name.length === 0) return;
    if (this.state.last_name.length >= 1) return 'success';
    else if (this.state.first_name === undefined) return;
  }

  getPasswordValidationState() {
    if (this.state.password.length === 0) return '';
    if (this.state.password.length >= 8 && this.state.password.length <= 64) {
      return 'success';
    }
    if (this.state.password.length < 8) return 'error';
    if (this.state.password.length > 64) return 'error';
  }

  getPasswordConfirmValidationState() {
    if (this.state.password.length === 0) return;
    if (this.state.password === this.state.password_confirm) return 'success';
    else {
      return 'error';
    }
  }

  getEmailValidationState() {
    if (this.state.email.length === 0) return;
    if (this.state.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) return 'success';
    else {
      return 'error';
    }
  }

  canBeSubmitted() {
    const errors = validate(
      this.state.first_name,
      this.state.last_name,
      this.state.email, this.state.password,
      this.state.password_confirm,
    );
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.canBeSubmitted()) {
      event.preventDefault();
      return;
    }

    const { first_name, last_name, email, password, uploadedFileCloudinaryUrl } = this.state;
    const user = {
      first_name,
      last_name,
      email,
      password,
      profile_photo_url: uploadedFileCloudinaryUrl,
    };

    axios.post('/users', user)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          browserHistory.push('/profile');
          this.props.updateLoggedIn(true);
        }
      })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    // this.setState({
    //   first_name: '',
    //   last_name: '',
    //   email: '',
    //   password: '',
    //   password_confirm: '',
    // });
  }

  handleImageUpload(file) {
    const upload = request.post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file);

    upload.end((err, response) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url,
        });
      }
    });
  }

  handleChange({ target }) {
    if (target.name) {
      this.setState({
        [target.name]: target.value,
      });
    }
  }

  render() {
    const errors = validate(
      this.state.first_name,
      this.state.last_name,
      this.state.email,
      this.state.password,
      this.state.password_confirm,
    );
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return (
      <div className="container">
        <div className="row main">
          <div className="main-login main-center">
            <h5>Register Account</h5>
            <Form onSubmit={this.handleSubmit}>

              <FormGroup validationState={this.getValidationState()}>
                <ControlLabel htmlFor="first_name" className="cols-sm-2 control-label">
                  First Name
                </ControlLabel>
                <Col s={10}>
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-user fa" aria-hidden="true" />
                    </span>
                    <FormControl type="text" className={errors.first_name ? 'error form-control input-sm' : 'form-control input-sm'} onChange={this.handleChange} value={this.state.first_name} name="first_name" placeholder="Enter your first name" />
                    <FormControl.Feedback />
                  </div>
                </Col>
              </FormGroup>

              <FormGroup validationState={this.getLastNameValidationState()}>
                <ControlLabel
                  htmlFor="last_name"
                  className="cols-sm-2 control-label"
                >
                  Last Name
                </ControlLabel>
                <Col s={10}>
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-user fa" aria-hidden="true" />
                    </span>
                    <FormControl type="text" className={errors.last_name ? 'error form-control input-sm' : 'form-control input-sm'} onChange={this.handleChange} value={this.state.last_name} name="last_name" placeholder="Enter your last name" />
                    <FormControl.Feedback />
                  </div>
                </Col>
              </FormGroup>


              <FormGroup validationState={this.getEmailValidationState()}>
                <ControlLabel htmlFor="email" className="cols-sm-2 control-label">
                  Email
                </ControlLabel>
                <Col s={10}>
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-envelope fa" aria-hidden="true" />
                    </span>
                    <FormControl type="email" className={errors.email ? 'error form-control input-sm' : 'form-control input-sm'} onChange={this.handleChange} value={this.state.email} name="email" placeholder="Enter your email" />
                    <FormControl.Feedback />
                  </div>
                </Col>
              </FormGroup>

              <FormGroup validationState={this.getPasswordValidationState()}>
                <ControlLabel htmlFor="password" className="cols-sm-2 control-label">
                  Password
                </ControlLabel>
                <Col s={10}>
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-lock fa-lg" aria-hidden="true" />
                    </span>
                    <FormControl type="password" className={errors.password ? 'error form-control input-sm' : 'form-control input-sm'} onChange={this.handleChange} value={this.state.password} name="password" placeholder="Enter your password" />
                    <FormControl.Feedback />
                  </div>
                </Col>
              </FormGroup>

              <FormGroup validationState={this.getPasswordConfirmValidationState()}>
                <ControlLabel htmlFor="password_confirm" className="cols-sm-2 control-label">
                  Confirm Password
                </ControlLabel>
                <Col s={10}>
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-lock fa-lg" aria-hidden="true" />
                    </span>
                    <FormControl type="password" className={errors.password_confirm ? 'error form-control input-sm' : 'form-control input-sm'} onChange={this.handleChange} value={this.state.password_confirm} name="password_confirm" placeholder="Confirm your password" />
                    <FormControl.Feedback />
                  </div>
                </Col>
              </FormGroup>
              <div style={{ display: 'flex', justifyContent: 'center' }}>

                <div>
                  <Dropzone
                    multiple={false}
                    accept="image/jpg,image/jpeg,image/png" onDrop={this.onImageDrop.bind(this)}
                  >
                    <p>Drop a profile photo or click to select a photo to upload.</p>
                  </Dropzone>
                  <div>
                    <div className="FileUpload">
                      ...
                    </div>
                    <div>
                      { this.state.uploadedFileCloudinaryUrl === ''
                        ? null
                          : <div>
                            <p>{this.state.uploadedFile.name}</p>
                            <img
                              className="img-thumbnail"
                              style={{ marginBottom: '2%' }} src={this.state.uploadedFileCloudinaryUrl}
                              role="presentation"
                            />
                          </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
              <FormGroup>
                <Button
                  disabled={isDisabled}
                  bsStyle="success"
                  type="submit"
                  className="btn btn-primary btn-lg btn-block login-button"
                >
                  Register
                </Button>
              </FormGroup>

            </Form>
          </div>
        </div>
        <style jx>{`
          #playground-container {
            height: 500px;
            overflow: hidden !important;
            -webkit-overflow-scrolling: touch;
          }

          body {
            background: url(http://res.cloudinary.com/dk5dqve4y/image/upload/q_10/v1489332103/AdobeStock_64992714_bq41qm.jpg) no-repeat center center fixed;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
          }



          .main{
           margin:15px;
          }

          h1.title {
            font-size: 50px;
            font-family: 'Passion One', cursive;
            font-weight: 400;
          }

          hr{
            width: 10%;
            color: #fff;
          }

          .form-group{
            margin-bottom: 15px;
          }

          label{
            margin-bottom: 15px;
          }

          input,
          input::-webkit-input-placeholder {
              font-size: 11px;
              padding-top: 3px;
          }

          .main-login{
            background-color: #fff;
              /* shadows and rounded borders */
              -moz-border-radius: 2px;
              -webkit-border-radius: 2px;
              border-radius: 2px;
              -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
              -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
              box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);

          }
          .form-control {
              height: auto!important;
          padding: 8px 12px !important;
          }
          .input-group {
              -webkit-box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.21)!important;
              -moz-box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.21)!important;
              box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.21)!important;
          }
          #button {
              border: 1px solid #ccc;
              margin-top: 28px;
              padding: 6px 12px;
              color: #666;
              text-shadow: 0 1px #fff;
              cursor: pointer;
              -moz-border-radius: 3px 3px;
              -webkit-border-radius: 3px 3px;
              border-radius: 3px 3px;
              -moz-box-shadow: 0 1px #fff inset, 0 1px #ddd;
              -webkit-box-shadow: 0 1px #fff inset, 0 1px #ddd;
              box-shadow: 0 1px #fff inset, 0 1px #ddd;
              background: #f5f5f5;
              background: -moz-linear-gradient(top, #f5f5f5 0%, #eeeeee 100%);
              background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #f5f5f5), color-stop(100%, #eeeeee));
              background: -webkit-linear-gradient(top, #f5f5f5 0%, #eeeeee 100%);
              background: -o-linear-gradient(top, #f5f5f5 0%, #eeeeee 100%);
              background: -ms-linear-gradient(top, #f5f5f5 0%, #eeeeee 100%);
              background: linear-gradient(top, #f5f5f5 0%, #eeeeee 100%);
              filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f5f5f5', endColorstr='#eeeeee', GradientType=0);
          }

          .main-center{
           margin-top: 30px;
           margin: 0 auto;
           max-width: 400px;
           padding: 10px 40px;
           background: grey;
           color: #FFF;
           text-shadow: none;
           -webkit-box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.31);
           -moz-box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.31);
           box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.31);
          }

          span.input-group-addon i {
              color: #009edf;
              font-size: 17px;
          }

          .login-button{
            margin-top: 5px;
          }

          .login-register{
            font-size: 11px;
            text-align: center;
          }

        `}</style>
      </div>


    );
  }
  }

export default Registration;
