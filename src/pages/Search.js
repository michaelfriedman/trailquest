import React, { Component } from 'react';
import { ButtonToolbar, ButtonGroup, Button, Form, FormControl, Table, Modal, Image } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import Text from 'react-format-text';
import ReactModal from 'react-modal';
import axios from 'axios';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      data: [],
      showModal: false,
      trailDetail: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sortStars = this.sortStars.bind(this);
    this.sortName = this.sortName.bind(this);
    this.sortHighestPoint = this.sortHighestPoint.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { searchTerm } = this.state;
  }

  sortName() {
    const updatedList = this.state.data.sort();
    this.setState({ data: updatedList });
  }

  sortStars() {
    const updatedList = this.state.data.sort((a, b) =>
    parseFloat(b.current_rating) - parseFloat(a.current_rating));
    this.setState({ data: updatedList });
  }

  sortHighestPoint() {
    const updatedList = this.state.data.sort((a, b) =>
    parseFloat(b.highest_point) - parseFloat(a.highest_point));
    this.setState({ data: updatedList });
  }

  componentDidMount() {
    axios.get('/trails')
      .then(response => {
        this.setState({
          data: response.data,
        });
        console.log(this.state.data);
      });
  }

  handleOpenModal({ target }) {
    this.setState({ showModal: true });
    this.state.data.map(item => {
      item.id == target.id
      ? this.setState({
        trailDetail: item,
      })
      : null;
    });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleChange({ target }) {
    if (target.name) {
      this.setState({
        [target.name]: target.value,
      });
    }
  }

  render() {
    return (
      <div className="container">
        <div>
          <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.trailDetail.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>{this.state.trailDetail.region}</h4>
              <Image responsive src={this.state.trailDetail.region_image} />
              <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

              <Image responsive src={this.state.trailDetail.thumbnail} />
              <div>
                Trail Description:
                <Text>{this.state.trailDetail.trail_description}</Text>
                Driving Directions:
                <p>{this.state.trailDetail.driving_directions}</p>
                Latitude:
                <p>{this.state.trailDetail.latitude}</p>
                Longitude:
                <p>{this.state.trailDetail.longitude}</p>
                Elevation Gain:
                <p>{this.state.trailDetail.elevation_gain}</p>
                Highest Point:
                <p>{this.state.trailDetail.highest_point}</p>
                Fetures:
                <p>{this.state.trailDetail.features}</p>
                Distance:
                <p>{this.state.trailDetail.distance}</p>
                Star Rating:
                <p>{this.state.trailDetail.current_rating}</p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleCloseModal}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
        {/* <div>
          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="Trail Detail Modal"
            onRequestClose={this.handleCloseModal}
          >
            <div>
              <h2>{this.state.trailDetail.name}</h2>
              <h4>{this.state.trailDetail.region}</h4>
              <p><Image thumbnail src={this.state.trailDetail.region_image} /></p>
              <Image responsive src={this.state.trailDetail.thumbnail} />
              <div>
                Trail Description:
                <p>{this.state.trailDetail.trail_description}</p>
                Driving Directions:
                <p>{this.state.trailDetail.driving_directions}</p>
                Latitude:
                <p>{this.state.trailDetail.latitude}</p>
                Longitude:
                <p>{this.state.trailDetail.longitude}</p>
                Elevation Gain:
                <p>{this.state.trailDetail.elevation_gain}</p>
                Highest Point:
                <p>{this.state.trailDetail.highest_point}</p>
                Fetures:
                <p>{this.state.trailDetail.features}</p>
                Distance:
                <p>{this.state.trailDetail.distance}</p>
                Star Rating:
                <p>{this.state.trailDetail.current_rating}</p>

              </div>
            </div>
            <div>

            </div>
            <Button onClick={this.handleCloseModal}><Glyphicon glyph="remove" /> Close</Button>
          </ReactModal>
        </div> */}
        <Form onSubmit={this.handleSubmit}>
          <FormControl onChange={this.handleChange} type="text" name="searchTerm" />
          <Button type="submit">Submit</Button>
          <ButtonToolbar>
            <ButtonGroup>
              <Button>Left</Button>
              <Button>Middle</Button>
              <Button>Right</Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Form>
        <Table striped bordered responsive condensed hover>
          <thead>
            <tr>
              <th>Thumbnail</th>
              <th><Button bsStyle="default" onClick={this.sortName}>Trail Name</Button></th>
              <th>Distance</th>
              <th>Region</th>
              <th>Elevation Gain</th>
              <th>
                <Button
                  bsStyle="default"
                  onClick={this.sortHighestPoint}
                >
                  Highest Point
                </Button>
              </th>
              <th><Button onClick={this.sortStars} bsStyle="default">Star Rating</Button></th>
              <th>Features</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.data.map(item =>
                <tr id={item.id} key={item.id}>
                  <td>{ item.thumbnail === '' ? null : <Image thumbnail responsive alt="hike thumbnail" src={item.thumbnail} />}</td>
                  <td>{item.name}</td>
                  <td>{item.distance}</td>
                  <td>{item.region}
                    <div>
                      <img
                        alt="region thumbnail"
                        src={item.region_image}
                      />
                    </div>
                  </td>
                  <td>{item.elevation_gain === '' ? 'No Data' : `${item.elevation_gain} ft.`}</td>
                  <td>{item.highest_point === '' ? 'No Data' : `${item.highest_point} ft.`}</td>
                  <td>{parseFloat(item.current_rating) === 0 ? 'No Data' : parseFloat(item.current_rating)}</td>
                  <td>{item.features.replace(/{/, '').replace(/}/, '').replace(/"/g, '').replace(/,/g, ', ')}</td>
                  <td><Button id={item.id} onClick={this.handleOpenModal}>Open</Button></td>
                </tr>)
            }
            <tr>
              <td>3</td>
              <td colSpan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Search;
