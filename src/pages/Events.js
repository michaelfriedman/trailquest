import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Button, Image, Panel, Collapse, Well, Modal } from 'react-bootstrap';
import axios from 'axios';
import Moment from 'react-moment';
import GoogleMap from '../features/map/GoogleMap';

const cleanupFeatures = features => features.replace(/{/, '').replace(/}/, '').replace(/"/g, '').replace(/,/g, ', ');

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      openDirections: false,
      openEventsTrailDescription: false,
      open: false,
      showModal: false,
      trailDetails: '',
    };
    this.handleRegistration = this.handleRegistration.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    axios.get('/users/id')
      .then(res => {
        const userId = res.data.id;
        this.setState({ userId });
      });
    axios.get('events')
      .then(res => {
        this.setState({
          data: res.data,
        });
      });
  }

  close() {
    this.setState({ showModal: false, trailDetails: '' });
  }

  open({ target }) {
    this.state.data.map(item => {
      if (Number.parseInt(item.id, 10) === Number.parseInt(target.id, 10)) {
        this.setState({ showModal: true, trailDetails: item });
      }
      return () => {};
    });
  }

  handleRegistration({ target }) {
    const event_id = target.id;
    const { userId } = this.state;
    const user_id = userId;
    const attendee = { event_id, user_id };
    axios.post('/users_events', attendee)
      .then(res => {
        this.setState({ events: res.data });
      });
    browserHistory.push('/profile/');
  }

  render() {
    return (
      <div>
        <div>
          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.trailDetails.trail_name} </Modal.Title>
              <div>
                <div><small><Moment
                  format="MM/DD/YYYY"
                  tz="America/Los_Angeles"
                >
                  {this.state.trailDetails.event_date}
                </Moment> <time>{this.state.trailDetails.event_time}</time></small>
                </div>
              </div>
            </Modal.Header>
            <Modal.Body>
              <div className="container">
                <div>
                  {
                      this.state.trailDetails.latitude && this.state.trailDetails.longitude
                        && <Panel
                          className="map"
                          header={this.state.trailDetails.trail_name}
                          style={{ maxWidth: '560px' }}
                        >
                          <div style={{ height: '300px' }}>
                            <GoogleMap
                              lat={parseFloat(this.state.trailDetails.latitude, 10)}
                              lng={parseFloat(this.state.trailDetails.longitude, 10)}
                            />
                          </div>
                        </Panel>
                    }
                  { this.state.trailDetails.first_name && this.state.trailDetails.last_name
                      && <p>
                        <strong>Event Organizer: </strong>
                        {this.state.trailDetails.first_name} {this.state.trailDetails.last_name}
                      </p>
                    }
                  { this.state.trailDetails.profile_photo_url
                      && <div className="pull-right">
                        <Image circle src={this.state.trailDetails.profile_photo_url} style={{ height: '100px', width: '100px', border: '1px solid black' }} />
                        { this.state.trailDetails.first_name && this.state.trailDetails.last_name
                        && <p>
                          {this.state.trailDetails.first_name} {this.state.trailDetails.last_name}
                        </p>
                      }
                      </div>
                  }

                  { this.state.trailDetails.max_participants
                      && <p>
                        <strong>Max Participants: </strong>
                        {this.state.trailDetails.max_participants}
                      </p>
                    }
                  { this.state.trailDetails.phone
                      && <div>
                        <strong>Organizer Phone: </strong>
                        <span>
                          ({this.state.trailDetails.phone.slice(0, 3)}) {this.state.trailDetails.phone.slice(3, 6)} - {this.state.trailDetails.phone.slice(6, 10)}
                        </span>
                      </div>
                  }
                  { this.state.trailDetails.email
                      ? <p><strong>Organizer Email:</strong> {this.state.trailDetails.email}</p>
                      : null
                    }
                  {
                      this.state.trailDetails.current_rating
                      ? <p>
                        <strong>Current Rating: </strong> {this.state.trailDetails.current_rating}
                      </p>
                      : null
                    }
                  {
                      this.state.trailDetails.features
                      ? `Features: ${cleanupFeatures(this.state.trailDetails.features)}`
                      : null
                    }

                  { this.state.trailDetails.distance
                      ? <p><strong>Distance:</strong> {this.state.trailDetails.distance}</p>
                      : null
                    }
                  { this.state.trailDetails.highest_point
                      ? <p><strong>Highest Point: </strong>
                        {this.state.trailDetails.highest_point}</p>
                      : null
                    }

                  { this.state.trailDetails.elevation_gain
                      ? <p><strong>Elevation Gain: </strong>
                        {this.state.trailDetails.elevation_gain}</p>
                      : null
                    }
                  { this.state.trailDetails.region
                      ? <p><strong>Region:</strong> {this.state.trailDetails.region}</p>
                      : null
                    }
                  { this.state.trailDetails.trail_rating
                      ? <p><strong>Trail Rating: </strong>
                        {this.state.trailDetails.current_rating}</p>
                      : null
                    }
                  { this.state.trailDetails.driving_directions
                      && <div>
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
                                {this.state.trailDetails.driving_directions}
                              </Well>
                            </div>
                          </Collapse>
                        </div>
                      </div>
                  }
                  { this.state.trailDetails.trail_description
                      && <div>
                        <strong>Trail Description: </strong>
                        <div style={{ display: 'inline' }}>
                          <Button
                            bsSize="xsmall"
                            onClick={() => this.setState({
                              open: !this.state.open,
                            })}
                          >
                            Details
                          </Button>
                          <Collapse in={this.state.open}>
                            <div>
                              <Well>
                                {this.state.trailDetails.trail_description}
                              </Well>
                            </div>
                          </Collapse>
                        </div>
                      </div>
                  }
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div style={{ display: 'flex', justifyContent: 'center' }}><Button
                bsStyle="success"
                bsSize="small"
                id={this.state.trailDetails.id}
                onClick={this.handleRegistration}
              >
               Register
              </Button>
                <Button bsStyle="danger" onClick={this.close}>Close</Button>
              </div>
            </Modal.Footer>
          </Modal>
        </div>
        <div className="container">{
        this.state.data.length
        ? this.state.data.map(item =>
          <div key={item.id}>
            <Panel
              header={
                <div>
                  <strong>{item.trail_name} </strong>
                  <div><small><Moment
                    format="MM/DD/YYYY"
                    tz="America/Los_Angeles"
                  >
                    {item.event_date}
                  </Moment> <time>{item.event_time}</time></small>
                  </div>
                </div>
              }
              footer={<div style={{ display: 'flex', justifyContent: 'center' }}>{ !this.state.showModal
                    ? <Button id={item.id} onClick={this.open}>Event Details</Button>
                    : null
                  }
              </div>}
            >
              {
                item.latitude && item.longitude
                  ? <div style={{ height: '300px', border: '1px solid grey' }}>
                    <GoogleMap
                      lat={parseFloat(item.latitude, 10)} lng={parseFloat(item.longitude, 10)}
                    />
                  </div>
                  : null
              }
            </Panel>
          </div>,
        )
        : null
      }
          <style>{`
            @import url('https://fonts.googleapis.com/css?family=Raleway');
              body {
                  font-family: 'Raleway', sans-serif;
                }

                .map .panel-body {
                  padding: 0px;
                }
        `}</style>
        </div>
      </div>
    );
  }
}

export default Events;
