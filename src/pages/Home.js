import React from 'react';
import { Button, Col, Jumbotron, Row, Carousel } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default () => (
  <div>
    <div className="container">
      <Jumbotron style={{ background: 'url(http://res.cloudinary.com/dk5dqve4y/image/upload/c_scale,h_600,w_1200/v1489333844/AdobeStock_97796246-squashed_fembui.jpg)' }}>
        <h1 className="lobster">TrailQuest</h1>
        <p>
          Find your favorite hike and meet new people interested in the same!
        </p>
        <p>
          <LinkContainer to="registration">
            <Button bsStyle="primary" className="btn-large">
              Register
            </Button>
          </LinkContainer>
        </p>
      </Jumbotron>


      <hr />
      <Row>
        <Col lg={12}>
          <h3>Featured Trails</h3>
        </Col>
      </Row>
      <Row className="text-center">
        <Col md={3} s={6} className="hero-feature">
          <div className="thumbnail">
            <img src="https://www.wta.org/site_images/hikes/umatum-creek-falls.jpg/@@images/665c99d8-1178-4233-af09-591bb6fd462d.jpeg" alt="" />
            <div className="caption">
              <h3>Umtanum Creek</h3>
              <p>Central Washington</p>
              <p>
                <Button href="#" bsStyle="default">More Info</Button>
              </p>
            </div>
          </div>
        </Col>
        <Col md={3} s={6} className="hero-feature">
          <div className="thumbnail">
            <img src="https://www.wta.org/site_images/hikes/mount-muller.jpg-1/@@images/bf045f72-ae84-4280-ab1f-8eee59e50046.jpeg" alt="" />
            <div className="caption">
              <h3>Mount Muller</h3>
              <p>Olympic Peninsula</p>
              <p>
                <Button href="#" bsStyle="default">More Info</Button>
              </p>
            </div>
          </div>
        </Col>
        <Col md={3} s={6} className="hero-feature">
          <div className="thumbnail">
            <img src="https://www.wta.org/site_images/hikes/lily-point_lezeck-koziol.jpg/@@images/54d4140e-8fbc-490b-b787-ef7350ab188b.jpeg" alt="" />
            <div className="caption">
              <h3>Lily Point Park</h3>
              <p>Puget Sound and Islands</p>
              <p>
                <Button href="#" bsStyle="default">More Info</Button>
              </p>
            </div>
          </div>
        </Col>
        <Col md={3} s={6} className="hero-feature">
          <div className="thumbnail">
            <img src="https://www.wta.org/site_images/hikes/img_5967.jpg/@@images/f804c0bb-09e7-4ba5-9eaf-8307c713e1d9.jpeg" alt="" />
            <div className="caption">
              <h3>Heather Lake</h3>
              <p>North Cascades</p>
              <p>
                <Button href="#" bsStyle="default">More Info</Button>
              </p>
            </div>
          </div>
        </Col>
      </Row>
      <hr />
      <footer>
        <Row>
          <Col lg={12} className="col-lg-12">
            <p>Copyright &copy; TrailQuest 2017 All rights reserved.</p>
          </Col>
        </Row>
      </footer>
    </div>
    <style jsx>{`
      @import url('https://fonts.googleapis.com/css?family=Lobster+Two');
      .lobster {
        font-family: 'Lobster Two', cursive;
      }
    `}</style>
  </div>
);
