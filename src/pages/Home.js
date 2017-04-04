import React, { Component } from 'react';
import { Button, Col, Jumbotron, Row, Glyphicon, Modal, Image, Panel, Collapse, Well, FormGroup, Form, ControlLabel, FormControl } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';
import Moment from 'react-moment';
import Loading from '../features/loading/Loading';
import GoogleMap from '../features/map/GoogleMap';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      reviewDetail: [],
      review_body: '',
      openWell: false,
      showModal: false,
      reviewIsLoading: true,
      showReviewButton: true,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleReviewSubmit = this.handleReviewSubmit.bind(this);
  }

  componentWillMount() {
    const promises = [axios.get('trails/98'), axios.get('trails/627'), axios.get('trails/814'), axios.get('trails/514')];
    const featured = [];
    Promise.all(promises)
      .then(res => {
        res.map(item => featured.push(item.data));
        this.setState({ data: featured });
      });
  }
  handleOpenModal({ target }) {
    this.setState({ showModal: true });
    // eslint-disable-next-line array-callback-return
    this.state.data.map(item => {
      // eslint-disable-next-line no-unused-expressions
      parseInt(item.id) === parseInt(target.id)
      ? this.setState({
        data: item,
      })
      : null;
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

  handleReviewSubmit(event) {
    event.preventDefault();
    const { review_body } = this.state;
    const trail_id = this.state.data.id;
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

  render() {
    return (
      <div>
        <div className="container">

          <div>
            <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>{this.state.data.name}</Modal.Title>
                <div>
                  <Image
                    className="pull-right"
                    responsive
                    src={this.state.data.region_image}
                  />
                </div>
                <b>{this.state.data.region}</b>
              </Modal.Header>
              <Modal.Body>
                {
                  this.state.data.thumbnail !== ''
                    ? <div style={{ display: 'flex', justifyContent: 'center', maxWidth: '550px', maxHeight: '300px' }}>
                      <Image rounded responsive src={this.state.data.thumbnail} style={{ border: '1px solid grey', marginBottom: '3%' }} />
                    </div>
                    : null
                }
                <div>
                  {
                    this.state.data.latitude && this.state.data.longitude
                      ? <Panel
                        className="map"
                        header="Map"
                      >
                        <div style={{ height: '300px' }}>
                          <GoogleMap
                            lat={parseFloat(this.state.data.latitude, 10)}
                            lng={parseFloat(this.state.data.longitude, 10)}
                          />
                        </div>

                      </Panel>
                      : null
                  }
                  { this.state.data.distance || this.state.data.elevation_gain ||
                    this.state.data.highest_point
                    || this.state.data.latitude
                    || this.state.data.longitude
                    || parseFloat(this.state.data.current_rating) > 0
                    || this.state.data.features !== ''
                      ? <Panel header="Trail Stats:">
                        <div>
                          {
                            this.state.data.distance
                              ? <Col>
                                Distance: {this.state.data.distance}
                              </Col>
                            : null
                          }
                          {
                            this.state.data.elevation_gain
                              ? <Col>
                                Elevation Gain: {this.state.data.elevation_gain}
                              </Col>
                            : null
                          }
                          {
                            this.state.data.highest_point
                              ? <Col>
                                Highest Point: {this.state.data.highest_point}
                              </Col>
                            : null
                          }
                          {
                            this.state.data.latitude
                              ? <Col>
                                Latitude: {this.state.data.latitude}
                              </Col>
                            : null
                          }
                          {
                            this.state.data.longitude
                              ? <Col>
                                Longitude: {this.state.data.longitude}
                              </Col>
                            : null
                          }
                          {
                            parseFloat(this.state.data.current_rating) > 0
                              ? <Col>
                                Star Rating: {this.state.data.current_rating}
                              </Col>
                            : null
                          }
                          {
                            this.state.data.features !== ''
                              ? <Col>
                                Features: {this.state.data.features}
                              </Col>
                            : null
                          }
                        </div>
                      </Panel>
                    : null
                  }
                  {
                    this.state.data.trail_description !== ''
                      ? <Panel header="Trail Description:">
                        {this.state.data.trail_description}
                      </Panel>
                      : null
                  }
                  {
                    this.state.data.driving_directions !== ''
                      ? <Panel header="Driving Directions:">
                        {this.state.data.driving_directions}
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
                                      <ControlLabel
                                        className="pull-left"
                                      >
                                        Trail Review:
                                      </ControlLabel>
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

          <Jumbotron style={{ background: 'url(http://res.cloudinary.com/dk5dqve4y/image/upload/c_scale,h_600,w_1200/v1489333844/AdobeStock_97796246-squashed_fembui.jpg)', textAlign: 'center' }}>
            <h1 className="lobster">TrailQuest</h1>
            <p>
              Find your favorite hike and meet new people interested in the same!
            </p>
            <p>
              <LinkContainer to="registration">
                <Button bsStyle="primary" className="btn-large">
                  Register
                </Button>
              </LinkContainer>
            </p>
          </Jumbotron>
          <hr />
          <div className="container">
            <Row style={{ textAlign: 'center' }}>
              <Col sm={4}>
                <Glyphicon className="larger" glyph="tree-conifer" />
                <p className="lobster">
                  Easily find the best trails Washington State has to offer.
                </p>
              </Col>
              <Col sm={4}>
                <Glyphicon className="larger" glyph="leaf" />
                <p className="lobster">
                  Meet new people, register for a group hike or create one yourself!
                </p>
              </Col>
              <Col sm={4}>
                <Glyphicon className="larger" glyph="camera" />
                <p className="lobster">
                  Share your opinion on trails you have hiked with our community.
                </p>
              </Col>
            </Row>
          </div>
          <hr />
          <Row>
            <Col lg={12}>
              <h3>Featured Trails</h3>
            </Col>
          </Row>
          <Row className="text-center">
            <Col md={3} sm={6} className="hero-feature">
              <div className="thumbnail">
                <img src="https://www.wta.org/site_images/hikes/umatum-creek-falls.jpg/@@images/665c99d8-1178-4233-af09-591bb6fd462d.jpeg" alt="" />
                <div className="caption">
                  <h3>Umtanum Creek</h3>
                  <p>Central Washington</p>
                  <p>
                    <Button
                      id="814"
                      onClick={this.handleOpenModal}
                      bsStyle="default"
                    >
                      More Info
                    </Button>
                  </p>
                </div>
              </div>
            </Col>
            <Col md={3} sm={6} className="hero-feature">
              <div className="thumbnail">
                <img src="https://www.wta.org/site_images/hikes/mount-muller.jpg-1/@@images/bf045f72-ae84-4280-ab1f-8eee59e50046.jpeg" alt="" />
                <div className="caption">
                  <h3>Mount Muller</h3>
                  <p>Olympic Peninsula</p>
                  <p>
                    <Button
                      id="514"
                      onClick={this.handleOpenModal}
                      bsStyle="default"
                    >
                      More Info
                    </Button>
                  </p>
                </div>
              </div>
            </Col>
            <Col md={3} sm={6} className="hero-feature">
              <div className="thumbnail">
                <img src="https://www.wta.org/site_images/hikes/lily-point_lezeck-koziol.jpg/@@images/54d4140e-8fbc-490b-b787-ef7350ab188b.jpeg" alt="" />
                <div className="caption">
                  <h3>Lily Point Park</h3>
                  <p>Puget Sound and Islands</p>
                  <p>
                    <Button
                      id="98"
                      onClick={this.handleOpenModal}
                      bsStyle="default"
                    >
                      More Info
                    </Button>
                  </p>
                </div>
              </div>
            </Col>
            <Col md={3} sm={6} className="hero-feature">
              <div className="thumbnail">
                <img src="https://www.wta.org/site_images/hikes/img_5967.jpg/@@images/f804c0bb-09e7-4ba5-9eaf-8307c713e1d9.jpeg" alt="" />
                <div className="caption">
                  <h3>Heather Lake</h3>
                  <p>North Cascades</p>
                  <p>
                    <Button
                      id="627"
                      onClick={this.handleOpenModal}
                      bsStyle="default"
                    >
                      More Info
                    </Button>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
          <footer>
            <Row>
              <Col lg={12}>
                <p>Copyright &copy; TrailQuest 2017 All rights reserved.</p>
              </Col>
            </Row>
          </footer>
        </div>
        <style jsx>{`
          @import url('https://fonts.googleapis.com/css?family=Lobster+Two');
          @import url('https://fonts.googleapis.com/css?family=Raleway');

          body {
                  font-family: 'Raleway', sans-serif;
                }
          .lobster {
            font-family: 'Lobster Two', cursive;
          }
           .larger {
            font-size: 5em;
          }

          .map .panel-body {
            padding: 0px;
          }
        `}</style>
      </div>
    );
  }
}

export default Home;
