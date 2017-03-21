import React, { Component } from 'react';
import { ButtonToolbar, ButtonGroup, Button, Form, FormControl, Table, Modal, Collapse, Well, Image, Panel, FormGroup, ControlLabel, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Loading from '../features/loading/Loading';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      data: [],
      showModal: false,
      trailDetail: '',
      reviewDetail: [],
      openWell: false,
      review_body: '',
      isLoading: true,
      reviewIsLoading: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleReviewSubmit = this.handleReviewSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sortStars = this.sortStars.bind(this);
    this.sortName = this.sortName.bind(this);
    this.sortHighestPoint = this.sortHighestPoint.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    axios.get('/trails')
      .then(response => {
        this.setState({
          data: response.data,
          isLoading: false,
        });
      });
    axios.get('/users/id')
      .then(res => {
        const userId = res.data.id;
        this.setState({ userId });
      });
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

  handleSubmit(event) {
    event.preventDefault();
    const { searchTerm } = this.state;
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
    axios.get(`/reviews/trail/${target.id}`)
      .then(res => {
        this.setState({
          reviewDetail: res.data
        })
        console.log(this.state.reviewDetail)
      })

  }

  handleReviewSubmit(event) {
    event.preventDefault();
    const { review_body } = this.state;
    const trail_id = this.state.trailDetail.id;
    const user_id = this.state.userId;
    const review = { review_body, trail_id, user_id };
    console.log(review)

    axios.post('/reviews', review)
      .then(res => {
          if (res.status === 200) {
            this.setState({ open: !this.state.open, review_body: '' })
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error);
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
              <div>
                <Image
                  className="pull-right"
                  responsive
                  src={this.state.trailDetail.region_image}
                />
              </div>
              <b>{this.state.trailDetail.region}</b>
            </Modal.Header>
            <Modal.Body>
              <Image responsive src={this.state.trailDetail.thumbnail} />
              {
                  this.props.isLoggedIn
                    ? <div>
                      <Button onClick={() => this.setState({ open: !this.state.open })}>
                        Review Trail
                      </Button>
                      <Collapse in={this.state.open}>
                        <div>
                          <Well>
                            <Row>
                              <Form onSubmit={this.handleReviewSubmit}>
                                <FormGroup controlId="formControlsTextarea">
                                  <ControlLabel>Trail Review:</ControlLabel>
                                  <FormControl
                                    onChange={this.handleChange}
                                    value={this.state.review_body}
                                    name="review_body"
                                    componentClass="textarea"
                                    placeholder="Write your review."
                                  />
                                </FormGroup>
                                <Button
                                  type="submit"
                                  className="center-block"
                                  bsStyle="success"
                                >
                                  Submit
                                </Button>
                              </Form>
                            </Row>
                          </Well>
                        </div>
                      </Collapse>
                    </div>
                  : null
              }
              <div>
                <Panel header="Trail Stats:">
                  <Table striped bordered condensed hover responsive>
                    <thead>
                      <tr>
                        <th>Distance</th>
                        <th>ElevationGain</th>
                        <th>Highest Point</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Star Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{this.state.trailDetail.distance}</td>
                        <td>{this.state.trailDetail.elevation_gain}</td>
                        <td>{this.state.trailDetail.highest_point}</td>
                        <td>{this.state.trailDetail.latitude}</td>
                        <td>{this.state.trailDetail.longitude}</td>
                        <td>{this.state.trailDetail.current_rating}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Panel>
                <Panel header="Trail Description:">
                  {this.state.trailDetail.trail_description}
                </Panel>
                <Panel header="Driving Directions:">
                  {this.state.trailDetail.driving_directions}
                </Panel>
                <Panel header="Reviews:">
                  { this.state.reviewIsLoading
                    ? <Loading />
                    : this.state.reviewDetail.map(item => <p>{item.review_body}</p>)}
                  }

                </Panel>
              </div>
              <div>
                Fetures:
                <p>{this.state.trailDetail.features}</p>

              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleCloseModal}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
        <Form onSubmit={this.handleSubmit}>
          <FormControl onChange={this.handleChange} type="text" name="searchTerm" />
          <Button type="submit">Submit</Button>
        </Form>

        {
          this.state.isLoading ? <Col style={{display: 'flex', justifyContent: 'center'}}><Loading style={{textAlign: 'center'}} /> </Col>
          : <Table striped bordered responsive condensed hover>
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
                <th />
              </tr>
            </thead>
            <tbody>
              {
                this.state.data.map(item =>
                  <tr id={item.id} key={item.id}>
                    <td>{ item.thumbnail === '' ? null : <Image thumbnail alt="hike thumbnail" src={item.thumbnail} />}</td>
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
            </tbody>
          </Table>
        }
      </div>
    );
  }
}
