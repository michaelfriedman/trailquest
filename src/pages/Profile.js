import React, { Component } from 'react';
import { Image, Row, Panel, Col, Well } from 'react-bootstrap';
import axios from 'axios';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      profileUrl: '',
      joinedOn: '',
      email: '',
      userId: '',
      list: '',
      review_body: [],
      events: [],
      organized_events: [],
      eventObjArr: [],
    };
  }
  componentDidMount() {
    axios.get('/users/id')
      .then(res => {
        const name = `${res.data.first_name} ${res.data.last_name}`;
        const email = res.data.email;
        const profileUrl = res.data.profile_photo_url;
        const joinedOn = res.data.created_at.slice(0, 10);
        const userId = res.data.id;
        this.setState({ name, profileUrl, joinedOn, email, userId });
        axios.get(`/reviews/user/${this.state.userId}`)
          .then(res => {
            this.setState({
              review_body: res.data,
            });
          });
        axios.get(`/users_events/user/${this.state.userId}`)
          .then(res => {
            const events = [];
            // eslint-disable-next-line array-callback-return
            res.data.map(item => {
              events.push(item.event_id);
            });
            this.setState({ events });
            const promises = this.state.events.map(item =>
              axios.get(`/events/event/${item}`));
            Promise.all(promises).then(res => {
              const eventObjArr = res.map(item => item.data[0]);
              this.setState({
                eventObjArr,
              });
            });
          });
      });
  }

  render() {
    return (

      <div className="container">
        <Well style={{ backgroundImage: 'url(http://res.cloudinary.com/dk5dqve4y/image/upload/c_scale,h_293,q_50,w_1140/v1490900758/AdobeStock_116743095_oi24wz.jpg)'}}>
          <center>
            <a href="#aboutModal" data-toggle="modal" data-target="#myModal"><Image thumbnail responsive rounded src={this.state.profileUrl} width="150" height="150" /></a>
            <h3 style={{ color: 'white' }}>{this.state.name}</h3>
          </center>
        </Well>
        {
            this.state.review_body.length
              ? <Panel header="My Trail Reviews">
                {this.state.review_body.map(item =>
                  <div key={item.id}>
                    <blockquote>
                      <Col>
                        <p>
                          {item.review_body}
                        </p>
                        <p><date><small>{item.created_at.slice(0, 10)}</small></date></p>
                      </Col>
                      <Col>
                        <p><small><strong>{item.name}</strong></small></p>
                      </Col>
                    </blockquote>
                  </div>)}
              </Panel>
            : null
        }

      </div>
    );
  }
}

export default Profile;
