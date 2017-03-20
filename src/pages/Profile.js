import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
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
    };
  }
  componentDidMount() {
    axios.get('/users/id')
      .then(res => {
        console.log('user/id', res)
        const name = `${res.data.first_name} ${res.data.last_name}`;
        const email = res.data.email;
        const profileUrl = res.data.profile_photo_url;
        const joinedOn = res.data.created_at.slice(0, 10);
        const userId = res.data.id;
        this.setState({ name, profileUrl, joinedOn, email, userId });
        axios.get(`/reviews/user/${this.state.userId}`)
          .then(res => {
            console.log(res);
            this.setState({
              review_body: res.data
            });
            console.log(this.state.review_body, 'rb')
          });
      });
  }
  render() {
    return (
      <div className="container">
        <Image responsive src={this.state.profileUrl} />
        <h3>{this.state.name}</h3>
        <p>Email: {this.state.email}</p>
        <p>Member Since: {this.state.joinedOn}</p>

        <hr />

        <h4>Reviews</h4>
        {this.state.review_body.map(item => <p>{item.review_body}</p>)}
      </div>
        );
        }
}

export default Profile;
