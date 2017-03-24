import React, { Component } from 'react';
import { Image, Row, Panel, Table } from 'react-bootstrap';
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

          });
      });
  }
  render() {
    return (
      <div className="container">
        <Row>
          <div className="container">
            <Image thumbnail src={this.state.profileUrl} className="pull-right" />
            <Table responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Member Since</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.state.name}</td>
                  <td>{this.state.email}</td>
                  <td>{this.state.joinedOn}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Row>
        <hr />
        <Panel header="Reviews" bsStyle="primary">
          {this.state.review_body.map(item => <p key={item.id}>{item.review_body}</p>)}
        </Panel>
        <Panel header="Events">
          {console.log(this.state.eventObjArr)}
          {this.state.eventObjArr.map(item => {
            <p>{item}</p>
          })}
        </Panel>
      </div>
    );
  }
}

export default Profile;
