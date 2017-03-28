import React, { Component } from 'react';
import { Image, Row, Panel, Col } from 'react-bootstrap';
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
        <div className="container">
          <Col xs={6} md={4}>
            <Image thumbnail src={this.state.profileUrl} />
          </Col>
          <Row>
            <div>
              <div><strong>{this.state.name}</strong></div>
              <div><small>{this.state.email}</small></div>
            </div>
          </Row>
        </div>
        <hr />
        {
          this.state.review_body.length
            ? <Panel header="Reviews">
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
        {
          this.state.eventObjArr.length
            ? <Panel header="Events">
              {this.state.eventObjArr.map(item => <p>{item.trail_name}</p>,
              )}
            </Panel>
            : null
        }
        <style jsx>{`
          body {
            background-color: antiquewhite;
          }
        `}</style>
      </div>
    );
  }
}

export default Profile;
