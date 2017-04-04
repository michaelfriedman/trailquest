import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Button, Image, Panel } from 'react-bootstrap';
import axios from 'axios';
import Moment from 'react-moment';
import GoogleMap from '../features/map/GoogleMap';

const cleanupFeatures = features => features.replace(/{/, '').replace(/}/, '').replace(/"/g, '').replace(/,/g, ', ');

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      openEventsTrailDescription: false,
    };
    this.handleRegistration = this.handleRegistration.bind(this);
  }

  componentWillMount() {
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
      <div className="container">{
        this.state.data.length
        ? this.state.data.map(item =>
          <div>
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
              footer={<div style={{ display: 'flex', justifyContent: 'center' }}><Button
                bsStyle="success"
                bsSize="small"
                id={item.id}
                onClick={this.handleRegistration}
              >
                Register
              </Button>
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
              { item.first_name || item.last_name
                ? <p>
                  <strong>Event Organizer: </strong>
                  {item.first_name} {item.last_name}
                </p>
              : null
              }
              { item.profile_photo_url
                ? <div className="pull-right">
                  <Image circle src={item.profile_photo_url} style={{ height: '100px', width: '100px', border: '1px solid black' }} />
                  { item.first_name || item.last_name
                  ? <p>{item.first_name} {item.last_name}</p>
                  : null
                }
                </div>
              : null
            }
              { item.max_participants
                ? <p>
                  <strong>Max Participants: </strong>
                  {item.max_participants}
                </p>
                  : null
              }
              { item.phone
                ? <p>
                  <strong>Organizer Phone: </strong>
                  ({item.phone.slice(0, 3)}) {item.phone.slice(3, 6)} - {item.phone.slice(6, 10)}
                </p>
              : null
            }
              { item.email
                ? <p><strong>Organizer Email:</strong> {item.email}</p>
                : null
              }
              { item.distance
                ? <p><strong>Distance:</strong> {item.distance}</p>
                : null
              }
              { item.highest_point
                ? <p><strong>Highest Point:</strong> {item.highest_point}</p>
                : null
              }
              { item.features !== '{}'
                ? <p>Features: {cleanupFeatures(item.features)}</p>
                : null
              }
              { item.latitude && item.longitude
                ? <p><strong>Coordinates:</strong> {item.latitude}, {item.longitude}</p>
                : null
              }
              { item.elevation_gain
                ? <p><strong>Elevation Gain:</strong> {item.elevation_gain}</p>
                : null
              }
              { item.region
                ? <p><strong>Region:</strong> {item.region}</p>
                : null
              }
              { item.trail_rating
                ? <p><strong>Trail Rating:</strong> {item.current_rating}</p>
                : null
              }
              { item.driving_directions
                ? <p>
                  <strong>Driving Directions:</strong>
                  <div>{item.driving_directions}</div>
                </p>
              : null
            }
              { item.trail_description
                ? <p>
                  <strong>Trail Description: </strong>
                  <div>{item.trail_description}</div>
                </p>
              : null
            }
            </Panel>
          </div>,
        )
        : null
      }
        <style jsx>{`
        @import url('https://fonts.googleapis.com/css?family=Raleway');
          body {
              font-family: 'Raleway', sans-serif;
            }

        `}</style>
      </div>
    );
  }
}

export default Events;
