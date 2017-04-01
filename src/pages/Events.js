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
    };
    this.handleEventDetailsClick = this.handleEventDetailsClick.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
  }

  componentWillMount() {
    console.log(this.props.userId)
    axios.get('/users/id')
      .then(res => {
        const userId = res.data.id;
        this.setState({ userId });
        console.log(this.state.userId)
      })
    axios.get('events')
      .then(res => {
        this.setState({
          data: res.data,
        });
        console.log(this.state.data);
      });
  }

  handleEventDetailsClick({ target }) {
    browserHistory.push(`/events/event/${target.id}`);
  }

  handleRegistration({ target }) {
    let event_id = target.id;
    console.log(this.state.userId, target.id)
    const { userId } = this.state;
    const user_id = userId;
    const attendee = { event_id, user_id };
    axios.post('users_events', attendee)
      .then(res => {
        res.send(res);
      });
  }

  render() {
    return (
      <div className="container">{
        this.state.data.length
        ? this.state.data.map(item =>
          <div key={item.id}>
            <Panel header={<Moment tz="America/Los_Angeles">{item.event_date}</Moment>}>
              <p>Trail: {item.trail_name} </p>
              <p>Event Organizer: {item.first_name} {item.last_name}</p>
              <Image thumbnail className="pull-right" src={item.profile_photo_url} style={{ height: '100px', width: '100px' }} />
              <p>Max Participants: {item.max_participants}</p>
              <p>Organizer Phone: {item.phone}</p>
              <p>Organizer Email: {item.email}</p>
              <p>Distance: {item.distance}</p>
              <p>Highest Point: {item.highest_point}</p>
              <p>Features: {item.features.replace(/{/, '').replace(/}/, '').replace(/"/g, '').replace(/,/g, ', ')}</p>
              <p>Driving Directions: {item.driving_directions}</p>
              <p>Coordinates: {item.latitude}, {item.longitude}</p>
              <p>Trail Description: {item.trail_description}</p>
              <p>Elevation Gain: {item.elevation_gain}</p>
              <p>Region: {item.region}</p>
              <p>Trail Rating: {item.current_rating}</p>
              <div>
                <Button
                  onClick={this.handleEventDetailsClick}
                  id={item.trail_id}
                >
                  Details
                </Button>
                <Button
                  id={item.id}
                  onClick={this.handleRegistration}
                >
                  Register
                </Button>
              </div>
            </Panel>
          </div>,
        )
        : null
      }</div>
    );
  }
}

export default Events;
