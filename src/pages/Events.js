import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Button } from 'react-bootstrap';
import axios from 'axios';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.handleEventDetailsClick = this.handleEventDetailsClick.bind(this);
  }

  componentWillMount() {
    axios.get('events')
      .then(res => {
        this.setState({
          data: res.data,
        });
      });
  }

  handleEventDetailsClick({ target }) {
    browserHistory.push(`/events/event/${target.id}`);
  }

  render() {
    return (
      <div className="container">{
        this.state.data.length
        ? this.state.data.map(item =>
          <div key={item.id}>
            <p>{item.trail_name}</p>
            <p>{item.event_date}</p>
            <div>
              <Button
                onClick={this.handleEventDetailsClick}
                id={item.trail_id}
              >
                Details
              </Button>
            </div>
          </div>,
        )
        : null
      }</div>
    );
  }
}

export default Events;
