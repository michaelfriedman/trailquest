import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import { Button, Form, FormControl, Table, Modal, Collapse, Well, Glyphicon, Image, Panel, FormGroup, ControlLabel, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Moment from 'react-moment';
import Loading from '../features/loading/Loading';
import GoogleMap from '../features/map/GoogleMap';
import DatePickerComponent from '../features/datepicker/DatePicker';
import moment from 'moment';



const cleanupFeatures = features => features.replace(/{/, '').replace(/}/, '').replace(/"/g, '').replace(/,/g, ', ');

const isSearched = (searchTerm) => (item) => (
  !searchTerm || item.name.toLowerCase().includes(searchTerm.toLowerCase())
);


export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      data: [],
      showModal: false,
      trailDetail: '',
      reviewDetail: [],
      openWell: false,
      review_body: '',
      isLoading: true,
      reviewIsLoading: true,
      showReviewButton: true,
      showEventButton: true,
      openEventForm: false,
      event_date: moment(),
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.onSearchTermChange = this.onSearchTermChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleReviewSubmit = this.handleReviewSubmit.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleCreateEventSubmit = this.handleCreateEventSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('/trails/region/Puget%20Sound%20and%20Islands')
      .then(res => {
        this.setState({
          data: res.data,
          isLoading: false,
        });
      });
    axios.get('/users/id')
      .then(res => {
        const userId = res.data.id;
        this.setState({ userId });
      });
  }

  onSearchTermChange({ target }) {
    this.setState({ searchTerm: target.value });
  }

  handleReviewSubmit(event) {
    event.preventDefault();
    const { review_body } = this.state;
    const trail_id = this.state.trailDetail.id;
    const user_id = this.state.userId;
    const review = { review_body, trail_id, user_id };

    axios.post('/reviews', review)
      .then(res => {
        if (res.status === 200) {
          axios.get(`/reviews/trail/${this.state.trailDetail.id}`)
            .then(res => {
              this.setState({
                reviewDetail: res.data,
              });
            });
          this.setState({ open: !this.state.open, review_body: '' });
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }

  handleCreateEventSubmit(event) {
    event.preventDefault();
    const trail_id = this.state.trailDetail.id;
    const event_date_str = this.state.event_date._d
    const trail_name = this.state.trailDetail.name;
    const {
       userId
    } = this.state;
    const organizer_id = userId;
    const createEvent = {
      event_date_str, organizer_id, trail_id, trail_name
    };
    console.log(createEvent)

    axios.post('events', createEvent)
      .then(res => {
        console.log(res)
      })
      browserHistory.push('/events')
  }

  handleSelectChange({ target }) {
    axios.get(`/trails/region/${target.value}`)
      .then(res => {
        this.setState({ data: res.data, isLoading: false });
      });
  }

  handleOpenModal({ target }) {
    this.setState({ showModal: true });
    // eslint-disable-next-line array-callback-return
    this.state.data.map((item) => {
      if (parseInt(item.id, 10) === parseInt(target.id, 10)) {
        // this only happens once, not a bug
        this.setState({
          trailDetail: item,
        });
      }
    });

    axios.get(`/reviews/trail/${target.id}`)
      .then(res => {
        this.setState({
          reviewDetail: res.data,
          reviewIsLoading: false,
        });
      });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleChange({ target }) {
    if (target.name) {
      this.setState({
        [target.name]: target.value,
      });
    }
  }

  render() {
    return (
      <div className="container">
        <div>
          <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.trailDetail.name}</Modal.Title>
              <div>
                <Image
                  className="pull-right"
                  responsive
                  src={this.state.trailDetail.region_image}
                />
              </div>
              <b>{this.state.trailDetail.region}</b>
            </Modal.Header>
            <Modal.Body>
              {
                this.state.trailDetail.thumbnail !== ''
                  ? <div style={{ display: 'flex', justifyContent: 'center', maxWidth: '550px', maxHeight: '300px' }}>
                    <Image rounded responsive src={this.state.trailDetail.thumbnail} style={{ border: '1px solid grey', marginBottom: '3%' }} />
                  </div>
                  : null
              }
              <div>
                {
                  this.state.trailDetail.latitude && this.state.trailDetail.longitude
                    ? <Panel
                      className="map"
                      header={this.state.trailDetail.name}
                      >
                      <div style={{ height: '300px' }}>
                        <GoogleMap lat={parseFloat(this.state.trailDetail.latitude, 10)} lng={parseFloat(this.state.trailDetail.longitude, 10)} />
                      </div>

                    </Panel>
                    : null
                }
                { this.state.trailDetail.distance || this.state.trailDetail.elevation_gain ||
                  this.state.trailDetail.highest_point
                  || this.state.trailDetail.latitude
                  || this.state.trailDetail.longitude
                  || parseFloat(this.state.trailDetail.current_rating) > 0
                  || this.state.trailDetail.features !== ''
                    ? <Panel header="Trail Stats:">
                      <div>
                        {
                          this.state.trailDetail.distance
                            ? <Col>
                              <strong>Distance: </strong> {this.state.trailDetail.distance}
                            </Col>
                          : null
                        }
                        {
                          this.state.trailDetail.elevation_gain
                            ? <Col>
                              <strong>Elevation Gain: </strong> {this.state.trailDetail.elevation_gain}
                            </Col>
                          : null
                        }
                        {
                          this.state.trailDetail.highest_point
                            ? <Col>
                              <strong>Highest Point: </strong> {this.state.trailDetail.highest_point}
                            </Col>
                          : null
                        }
                        {
                          this.state.trailDetail.latitude
                            ? <Col>
                              <strong>Latitude: </strong> {this.state.trailDetail.latitude}
                            </Col>
                          : null
                        }
                        {
                          this.state.trailDetail.longitude
                            ? <Col>
                              <strong>Longitude: </strong> {this.state.trailDetail.longitude}
                            </Col>
                          : null
                        }
                        {
                          parseFloat(this.state.trailDetail.current_rating) > 0
                            ? <Col>
                              <strong>Star Rating: </strong> {this.state.trailDetail.current_rating}
                            </Col>
                          : null
                        }
                        {
                          this.state.trailDetail.features !== undefined
                            ? <Col>
                              <strong>Features: </strong> {cleanupFeatures(this.state.trailDetail.features)}
                            </Col>
                          : null
                        }
                      </div>
                    </Panel>
                  : null
                }
                {
                  this.state.trailDetail.trail_description !== ''
                    ? <Panel header="Trail Description:">
                      {this.state.trailDetail.trail_description}
                    </Panel>
                    : null
                }
                {
                  this.state.trailDetail.driving_directions !== ''
                    ? <Panel header="Driving Directions:">
                      {this.state.trailDetail.driving_directions}
                    </Panel>
                    : null
                }
                {
                    this.props.isLoggedIn
                      ? <div style={{ textAlign: 'center' }}>
                        {
                          this.state.showReviewButton
                            ? <Button bsStyle="danger" bsSize="small" style={{ margin: '1%', marginBottom: '3%' }} onClick={() => this.setState({ open: !this.state.open, showReviewButton: !this.state.showReviewButton })}>
                              Review Trail
                            </Button>
                            : null
                        }
                        <Collapse in={this.state.open}>
                          <div>
                            <Well>
                              <Glyphicon
                                className="pull-right pointer"
                                glyph="remove"
                                onClick={() => this.setState({
                                  open: !this.state.open,
                                  showReviewButton: !this.state.showReviewButton,
                                })}
                              />
                              <Row>
                                <Form onSubmit={this.handleReviewSubmit}>
                                  <FormGroup controlId="formControlsTextarea">
                                    <ControlLabel className="pull-left">Trail Review:</ControlLabel>
                                    <FormControl
                                      onChange={this.handleChange}
                                      value={this.state.review_body}
                                      name="review_body"
                                      componentClass="textarea"
                                      placeholder="Write your review."
                                    />
                                  </FormGroup>
                                  <Button
                                    bsSize="small"
                                    type="submit"
                                    className="center-block"
                                    bsStyle="danger"
                                  >
                                    Submit
                                  </Button>
                                </Form>
                              </Row>
                            </Well>
                          </div>
                        </Collapse>
                      </div>
                        : null
                }

                {
                    this.props.isLoggedIn
                      ? <div style={{ textAlign: 'center' }}>
                        {
                          this.state.showEventButton
                            ? <Button bsStyle="danger" bsSize="small" style={{ margin: '1%', marginBottom: '3%' }} onClick={() => this.setState({ openEventForm: !this.state.openEventForm, showEventButton: !this.state.showEventButton })}>
                              Create Event
                            </Button>
                            : null
                        }
                        <Collapse in={this.state.openEventForm}>
                          <div>
                            <Well>
                              <Glyphicon
                                className="pull-right pointer"
                                glyph="remove"
                                onClick={() => this.setState({
                                  openEventForm: !this.state.openEventForm,
                                  showEventButton: !this.state.showEventButton,
                                })}
                              />
                              <Row>
                                <Form onSubmit={this.handleCreateEventSubmit}>
                                  <Row>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>

                                      <DatePickerComponent
                                        selected={this.state.startDate}
                                        onChange={this.handleChange} />
                                    </div>
                                  </Row>
                                  <Button
                                    bsSize="small"
                                    type="submit"
                                      className="center-block"
                                      bsStyle="danger"
                                    >
                                      Create Event
                                    </Button>
                                  </Form>
                              </Row>
                            </Well>
                          </div>
                        </Collapse>
                      </div>
                        : null
                }

                {
                  this.state.reviewDetail.length
                    ? <Panel header="Reviews">
                      { this.state.reviewIsLoading
                        ? <Loading />
                        : this.state.reviewDetail.map(item =>
                          <div>
                            <Col xs={12} md={8}>
                              <p>
                                <em>{item.review_body}</em>
                              </p>
                            </Col>
                            <Col xs={6} md={4}>
                              <date>
                                <Moment tz="America/Los_Angeles">
                                  {item.created_at}
                                </Moment>
                              </date>
                              <p><strong>{item.first_name}</strong></p>
                            </Col>
                          </div>,
                        )}
                    </Panel>
                    : null
                }
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleCloseModal}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>

        <div className="container" style={{ marginTop: '3%' }}>
          <div className="col-md-6 col-md-offset-3">
            <Row>
              <Form onSubmit={this.handeSearchSubmit}>
                <FormGroup controlId="formControlsSelect">
                  <ControlLabel>Select Region</ControlLabel>
                  <FormControl
                    onChange={this.handleSelectChange} componentClass="select" placeholder="select"
                  >
                    <option value="Puget%20Sound%20and%20Islands">Puget Sound and Islands</option>
                    <option value="Central%20Cascades">Central Cascades</option>
                    <option value="Central%20Washington">Central Washington</option>
                    <option value="Eastern%20Washington">Eastern Washington</option>
                    <option value="Issaquah%20Alps">Issaquah Alps</option>
                    <option value="Mount%20Rainier%20Area">Mount Rainier Area</option>
                    <option value="North%20Cascades">North Cascades</option>
                    <option value="Olympic%20Peninsula">Olympic Peninsula</option>
                    <option value="South%20Cascades">South Cascades</option>
                    <option value="Southwest%20Washington">Southwest Washington</option>
                    <option value="Snoqualmie%20Region">Snoqualmie Region</option>
                  </FormControl>
                </FormGroup>
                <FormGroup>
                  <div className="input-group">
                    <FormControl
                      onChange={this.onSearchTermChange}
                      id="1"
                      type="text"
                      name="searchTerm"
                      placeholder="Search..."
                      required
                    />
                    <span className="input-group-btn">
                      <Button bsStyle="success">
                        <Glyphicon glyph="search" />
                      </Button>
                    </span>
                  </div>
                </FormGroup>
              </Form>
            </Row>
          </div>
        </div>
        {
          this.state.isLoading
            ? <Col style={{ display: 'flex', justifyContent: 'center' }}>
              <Loading style={{ textAlign: 'center' }} />
            </Col>
          : <Table striped bordered hover>
            <thead>
              <tr>
                <th>Trail Name</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.data.filter(isSearched(this.state.searchTerm)).map(item =>
                  <tr key={item.id}>
                    <td>{item.name}
                      <span>
                        <Glyphicon
                          id={item.id}
                          onClick={this.handleOpenModal}
                          className="pull-right green pointer"
                          glyph="plus-sign"
                        />
                      </span>
                    </td>
                  </tr>,
                )
              }
            </tbody>
          </Table>
        }
        <style jsx>{`
          @import url('https://fonts.googleapis.com/css?family=Raleway');
          body {
              font-family: 'Raleway', sans-serif;
            }

          .green {
            color: green;
          }


          .pointer {
            cursor: pointer;
          }

          .map .panel-body {
            padding: 0px;
          }
        `}</style>
      </div>
    );
  }
}
