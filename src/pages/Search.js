import React, { Component } from 'react';
import { Button, Form, FormControl, Table, Modal, Collapse, Well, Glyphicon, Image, Panel, FormGroup, ControlLabel, Row, Col } from 'react-bootstrap';
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
    this.onSearchTermChange = this.onSearchTermChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleReviewSubmit = this.handleReviewSubmit.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.sortStars = this.sortStars.bind(this);
    this.sortName = this.sortName.bind(this);
    this.sortHighestPoint = this.sortHighestPoint.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    axios.get('/trails/region/Puget%20Sound%20and%20Islands')
      .then(res => {
        this.setState({
          data: res.data,
          isLoading: false,
        });
        console.log(res);
      });
    axios.get('/users/id')
      .then(res => {
        const userId = res.data.id;
        this.setState({ userId });
      });
  }

  onSearchTermChange({ target }) {
    this.setState({ searchTerm: target.value });
  }

  handleChange({ target }) {
    if (target.name) {
      this.setState({
        [target.name]: target.value,
      });
    }
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleReviewSubmit(event) {
    event.preventDefault();
    const { review_body } = this.state;
    const trail_id = this.state.trailDetail.id;
    const user_id = this.state.userId;
    const review = { review_body, trail_id, user_id };

    axios.post('/reviews', review)
      .then(res => {
        if (res.status === 200) {
          axios.get(`/reviews/trail/${this.state.trailDetail.id}`)
            .then(res => {
              this.setState({
                reviewDetail: res.data,
              });
            });
          this.setState({ open: !this.state.open, review_body: '' });
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }

  handleSelectChange({ target }) {
    console.log(`/trails/region/${target.value}`);
    axios.get(`/trails/region/${target.value}`)
      .then(res => {
        this.setState({
          data: res.data,
          isLoading: false,
        });
        console.log(res);
      });
  }

  handleOpenModal({ target }) {
    this.setState({ showModal: true });
    // eslint-disable-next-line array-callback-return
    this.state.data.map(item => {
      // eslint-disable-next-line radix, no-unused-expressions
      parseInt(item.id) === parseInt(target.id)
      ? this.setState({
        trailDetail: item,
      })
      : null;
    });
    axios.get(`/reviews/trail/${target.id}`)
      .then(res => {
        this.setState({
          reviewDetail: res.data,
          reviewIsLoading: false,
        });
      });
  }

  // handleSubmit(event) {
  //   event.preventDefault();
  //   const { searchTerm } = this.state;
  // }

  sortHighestPoint() {
    const updatedList = this.state.data.sort((a, b) =>
    parseFloat(b.highest_point) - parseFloat(a.highest_point));
    this.setState({ data: updatedList });
  }

  sortStars() {
    const updatedList = this.state.data.sort((a, b) =>
    parseFloat(b.current_rating) - parseFloat(a.current_rating));
    this.setState({ data: updatedList });
  }

  sortName() {
    const updatedList = this.state.data.sort();
    this.setState({ data: updatedList });
  }

  // handleSearchSubmit() {
  //   const { searchTerm } = this.state;
  //   const newList = this.state.data.filter(item => item.name.toLowerCase() === this.state.searchTerm.toLowerCase());
  //   this.setState({ data: newList })
  // }

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
              {
                this.state.trailDetail.thumbnail !== ''
                  ? <Image responsive src={this.state.trailDetail.thumbnail} />
                  : null
              }

              {
                  this.props.isLoggedIn
                    ? <div style={{ textAlign: 'center' }}>
                      <Button style={{ margin: '1%' }} onClick={() => this.setState({ open: !this.state.open })}>
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
                {
                  this.state.trailDetail.trail_description !== ''
                    ? <Panel header="Trail Description:">
                      {this.state.trailDetail.trail_description}
                    </Panel>
                    : null
                }
                {
                  this.state.trailDetail.driving_directions !== ''
                    ? <Panel header="Driving Directions:">
                      {this.state.trailDetail.driving_directions}
                    </Panel>
                    : null
                }
                {
                  this.state.reviewDetail.length
                    ? <Panel header="Reviews" style={{ textAlign: 'center' }}>
                      { this.state.reviewIsLoading
                        ? <Loading />
                        : this.state.reviewDetail.map(item => <p key={item.id}>{item.review_body}</p>)}
                    </Panel>
                    : null
                }


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

        <div className="container" style={{ marginTop: '3%' }}>
          <div className="col-md-6 col-md-offset-3">
            <Row>
              <Form onSubmit={this.handeSearchSubmit}>
                <FormGroup controlId="formControlsSelect">
                  <ControlLabel>Select Region</ControlLabel>
                  <FormControl inline
                    onChange={this.handleSelectChange.bind(this)} componentClass="select" placeholder="select">
                    <option value="Puget%20Sound%20and%20Islands">Puget Sound and Islands</option>
                    <option value="Central%20Cascades">Central Cascades</option>
                    <option value="North%20Cascades">North Cascades</option>
                    <option value="South%20Cascades">South Cascades</option>
                    <option value="Issaquah%20Alps">Issaquah Alps</option>
                    <option value="Southwest%20Washington">Southwest Washington</option>
                    <option value="Snoqualmie%20Region">Snoqualmie Region</option>
                    <option value="Eastern%20Washington">Eastern Washington</option>
                    <option value="Olympic%20Peninsula">Olympic Peninsula</option>
                    <option value="Mount%20Rainier%20Area">Mount Rainier Area</option>
                    <option value="Central%20Washington">Central Washington</option>
                  </FormControl>
                </FormGroup>
                <FormGroup>
                  <div className="input-group">
                    <FormControl
                      inline
                      onChange={this.handleChange} id="1"
                      className="form-control"
                      type="text"
                      name="searchTerm"
                      value={this.state.searchTerm}
                      placeholder="Search..."
                      required
                    />
                    <span className="input-group-btn">
                      <Button bsStyle="success" type="submit">
                        <Glyphicon glyph="search" />
                      </Button>
                    </span>
                  </div>
                </FormGroup>
              </Form>
            </Row>
          </div>
        </div>
        {
          this.state.isLoading ? <Col style={{ display: 'flex', justifyContent: 'center' }}><Loading style={{ textAlign: 'center' }} /></Col>
          : <Table striped bordered hover>
            <thead>
              <tr>
                <th>Trail Name</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.data.map(item =>
                  <tr key={item.id}>
                    <td>{item.name}<span><Glyphicon id={item.id} onClick={this.handleOpenModal} className="pull-right green" glyph="plus-sign" /></span></td>
                  </tr>
                )
              }
            </tbody>
          </Table>
          // : <Table striped bordered responsive condensed hover>
          //   <thead>
          //     <tr>
          //       <th><Button bsStyle="default" onClick={this.sortName}>Trail Name</Button></th>
          //       <th>Distance</th>
          //       <th>Elevation Gain</th>
          //       <th>
          //         <Button
          //           bsStyle="default"
          //           onClick={this.sortHighestPoint}
          //         >
          //           Highest Point
          //         </Button>
          //       </th>
          //       <th><Button onClick={this.sortStars} bsStyle="default">Star Rating</Button></th>
          //       <th>Features</th>
          //       <th />
          //     </tr>
          //   </thead>
          //   <tbody>
          //     {
          //       this.state.data.map(item =>
          //         <tr id={item.id} key={item.id}>
          //           <td>{item.name}<Button id={item.id} onClick={this.handleOpenModal}>Open</Button></td>
          //           <td>{item.distance}</td>
          //           <td>{item.elevation_gain === '' ? 'No Data' : `${item.elevation_gain} ft.`}</td>
          //           <td>{item.highest_point === '' ? 'No Data' : `${item.highest_point} ft.`}</td>
          //           <td>{parseFloat(item.current_rating) === 0 ? 'No Data' : parseFloat(item.current_rating)}</td>
          //           <td>{item.features.replace(/{/, '').replace(/}/, '').replace(/"/g, '').replace(/,/g, ', ')}</td>
          //           <td></td>
          //         </tr>)
          //     }
          //   </tbody>
          // </Table>
        }
        <style jsx>{`
          .green {
            color: green;
          }
        `}</style>
      </div>
    );
  }
}
