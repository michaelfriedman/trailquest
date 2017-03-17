import React, { Component } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import axios from 'axios';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      data: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange({ target }) {
    if (target.name) {
      this.setState({
        [target.name]: target.value,
      });
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    const { searchTerm } = this.state;
    axios.get('/trails')
      .then(response => {
        this.setState({
          data: response,
        });
      });
  }
  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormControl onChange={this.handleChange} type="text" name="searchTerm" />
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}

export default Search;
