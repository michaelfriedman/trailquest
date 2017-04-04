import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Button, Image, Panel } from 'react-bootstrap';
import axios from 'axios';
import Moment from 'react-moment';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      openEventsTrailDescription: false,
    };
    this.handleEventDetailsClick = this.handleEventDetailsClick.bind(this);
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
        console.log(this.state.data)

      });
  }

  handleEventDetailsClick({ target }) {
    browserHistory.push(`/events/event/${target.id}`);
  }

  handleRegistration({ target }) {
    const event_id = target.id;
    const { userId } = this.state;
    const user_id = userId;
    const attendee = { event_id, user_id };
    axios.post('users_events', attendee)
      .then(res => {
        this.setState({ events: res.data });
      });
  }

  render() {
    return (
      <div className="container">{
        this.state.data.length
        ? this.state.data.map(item =>

          <div>
            <Panel
              header={<div>
                <strong>{item.trail_name} </strong>
                <div><small><Moment
                  tz="America/Los_Angeles">{item.event_date}</Moment></small></div>
              </div>}
              footer={<div style={{ display: 'flex', justifyContent: 'center' }}><Button
                bsStyle="success"
                bsSize="small"
                id={item.trail_id}
                onClick={this.handleRegistration}>
                Register
              </Button>
              </div>}>
              <Image thumbnail className="pull-right" src={item.profile_photo_url} style={{ height: '100px', width: '100px' }} />
              <p><strong>Event Organizer:</strong> {item.first_name} {item.last_name}</p>
              <p><strong>Max Participants:</strong> {item.max_participants}</p>
              <p>
                <strong>Organizer Phone: </strong>
                ({item.phone.slice(0, 3)}) {item.phone.slice(3, 6)} - {item.phone.slice(6, 10)}
              </p>
              <p><strong>Organizer Email:</strong> {item.email}</p>
              <p><strong>Distance:</strong> {item.distance}</p>
              <p><strong>Highest Point:</strong> {item.highest_point}</p>
              {/* <p>Features: {item.features.replace(/{/, '').replace(/}/, '').replace(/"/g, '').replace(/,/g, ', ')}</p> */}
              <p><strong>Coordinates:</strong> {item.latitude}, {item.longitude}</p>
              <p><strong>Elevation Gain:</strong> {item.elevation_gain}</p>
              <p><strong>Region:</strong> {item.region}</p>
              <p><strong>Trail Rating:</strong> {item.current_rating}</p>
              <p>
                <strong>Driving Directions:</strong>
                <div>{item.driving_directions}</div>
              </p>

              <p><strong>Trail Description: </strong>
                <div>{item.trail_description}</div></p>

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
