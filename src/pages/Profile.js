import React, { Component } from 'react';
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
      list: ''
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
        console.log(this.state);
      });
  }
  render() {
    return (
      <div>
        {this.state.name}
        {this.state.email}
        {this.state.profileUrl}
        {this.state.joinedOn}
      </div>
    );
  }
}

export default Profile;
