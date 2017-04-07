import React, { Component, PropTypes } from 'react';
import { Button, Col, Jumbotron, Row, Glyphicon, Modal, Image, Panel, Collapse, Well, FormGroup, Form, ControlLabel, FormControl } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';
import Moment from 'react-moment';
import Loading from '../features/loading/Loading';
import GoogleMap from '../features/map/GoogleMap';

const cleanupFeatures = features => features.replace(/{/, '').replace(/}/, '').replace(/"/g, '').replace(/,/g, ', ');

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
      openTrail: {},
      openTrailDescription: false,
      openDirections: false,
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
    // eslint-disable-next-line array-callback-return
    this.state.data.map(item => {
      // eslint-disable-next-line no-unused-expressions
      parseInt(item.id) === parseInt(target.id)
      ? this.setState({
        openTrail: item,
      })
      : null;
    });
    axios.get(`/reviews/trail/${target.id}`)
      .then(res => {
        this.setState({
          reviewDetail: res.data,
          reviewIsLoading: false,
          showModal: true
        });
      });
  }

  handleCloseModal() {
    this.setState({ showModal: false, openTrail: {} });
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
                <Modal.Title>{this.state.openTrail.name}</Modal.Title>
                <div>
                  <Image
                    className="pull-right"
                    responsive
                    src={this.state.openTrail.region_image}
                  />
                </div>
                <b>{this.state.openTrail.region}</b>
              </Modal.Header>
              <Modal.Body>
                {
                  this.state.openTrail.thumbnail !== ''
                    ? <div style={{ display: 'flex', justifyContent: 'center', maxWidth: '550px', maxHeight: '300px' }}>
                      <Image rounded responsive src={this.state.openTrail.thumbnail} style={{ border: '1px solid grey', marginBottom: '3%' }} />
                    </div>
                    : null
                }
                <div>
                  {
                    this.state.openTrail.latitude && this.state.openTrail.longitude
                      ? <Panel
                        className="map"
                        header="Map"
                      >
                        <div style={{ height: '300px' }}>
                          <GoogleMap
                            lat={parseFloat(this.state.openTrail.latitude, 10)}
                            lng={parseFloat(this.state.openTrail.longitude, 10)}
                          />
                        </div>

                      </Panel>
                      : null
                  }
                  { this.state.openTrail.distance || this.state.openTrail.elevation_gain ||
                    this.state.openTrail.highest_point
                    || this.state.openTrail.latitude
                    || this.state.openTrail.longitude
                    || parseFloat(this.state.openTrail.current_rating) > 0
                    || this.state.openTrail.features !== ''
                      ? <Panel header="Trail Stats:">
                        <div>
                          {
                            this.state.openTrail.distance
                              && <Col>
                                <strong>Distance: </strong>{this.state.openTrail.distance}
                              </Col>
                          }
                          {
                            this.state.openTrail.elevation_gain
                              && <Col>
                                <strong>Elevation Gain: </strong>{this.state.openTrail.elevation_gain}
                              </Col>
                          }
                          {
                            this.state.openTrail.highest_point
                              && <Col>
                                <strong>Highest Point: </strong>{this.state.openTrail.highest_point}
                              </Col>
                          }
                          {
                            this.state.openTrail.latitude
                              && <Col>
                                <strong>Latitude: </strong>{this.state.openTrail.latitude}
                              </Col>
                          }
                          {
                            this.state.openTrail.longitude
                              && <Col>
                                <strong>Longitude: </strong>{this.state.openTrail.longitude}
                              </Col>
                          }
                          {
                            parseFloat(this.state.openTrail.current_rating) > 0
                              && <Col>
                                <strong>Star Rating: </strong>{this.state.openTrail.current_rating}
                              </Col>
                          }
                          {
                          this.state.openTrail.features !== undefined && this.state.openTrail.features !== '{}'
                            && <Col>
                              <strong>Features: </strong>
                              {cleanupFeatures(this.state.openTrail.features)}
                            </Col>
                        }
                          { this.state.openTrail.trail_description !== ''
                      && <p>
                        <strong>Trail Description: </strong>
                        <div style={{ display: 'inline' }}>
                          <Button
                            bsSize="xsmall"
                            onClick={() => this.setState({
                              openTrailDescription: !this.state.openTrailDescription,
                            })}
                          >
                            Details
                          </Button>
                          <Collapse in={this.state.openTrailDescription}>
                            <div>
                              <Well>
                                {this.state.openTrail.trail_description}
                              </Well>
                            </div>
                          </Collapse>
                        </div>
                      </p>
                  }
                        </div>
                        { this.state.openTrail.driving_directions
                      && <p>
                        <strong>Driving Directions:</strong>
                        <div style={{ display: 'inline' }}>
                          <Button
                            bsSize="xsmall"
                            onClick={() => this.setState({
                              openDirections: !this.state.openDirections,
                            })}
                          >
                            Directions
                          </Button>
                          <Collapse in={this.state.openDirections}>
                            <div>
                              <Well>
                                {this.state.openTrail.driving_directions}
                              </Well>
                            </div>
                          </Collapse>
                        </div>
                      </p>
                  }
                      </Panel>
                      : null
                  }
                  {
                      this.props.isLoggedIn
                        && <div style={{ textAlign: 'center' }}>
                          {
                            this.state.showReviewButton
                              && <Button bsStyle="danger" bsSize="small" style={{ margin: '1%', marginBottom: '3%' }} onClick={() => this.setState({ open: !this.state.open, showReviewButton: !this.state.showReviewButton })}>
                                Review Trail
                              </Button>
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
        <style>{`
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

Home.propTypes = {
  isLoggedIn: PropTypes.bool,
};
