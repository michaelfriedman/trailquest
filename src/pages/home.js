import React from 'react';
import { Button, Col, Jumbotron, Row } from 'react-bootstrap';

export default () => (
  <div>
    <div className="container">

      <Jumbotron style={{ background: 'url(http://res.cloudinary.com/dk5dqve4y/image/upload/c_scale,h_600,w_1200/v1489333844/AdobeStock_97796246-squashed_fembui.jpg)' }}>
        <h1>TrailQuest</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, ipsam,
          eligendi, in quo sunt possimus non incidunt odit vero aliquid
          similique quaerat nam nobis illo aspernatur vitae fugiat numquam repellat.
        </p>
        <p>
          <Button bsStyle="primary" className="btn-large">
            Call to action!
          </Button>
        </p>
      </Jumbotron>
      <hr />
      <Row>
        <Col lg={12}>
          <h3>Featured Trails</h3>
        </Col>
      </Row>
      <Row className="text-center">
        <Col md={3} sm={6} className="hero-feature">
          <div className="thumbnail">
            <img src="http://lorempixel.com/nature/800/500/" alt="" />
            <div className="caption">
              <h3>Feature Label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
              <p>
                <Button href="#" bsStyle="primary">
                  Buy Now!
                </Button>
                <Button href="#" bsStyle="default">More Info</Button>
              </p>
            </div>
          </div>
        </Col>

        <Col md={3} s={6} className="hero-feature">
          <div className="thumbnail">
            <img src="http://lorempixel.com/nature/800/500/" alt="" />
            <div className="caption">
              <h3>Feature Label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
              <p>
                <Button href="#" bsStyle="primary">Buy Now!</Button>
                <Button href="#" bsStyle="default">More Info</Button>
              </p>
            </div>
          </div>
        </Col>

        <Col md={3} s={6} className="hero-feature">
          <div className="thumbnail">
            <img src="http://lorempixel.com/nature/800/500/" alt="" />
            <div className="caption">
              <h3>Feature Label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
              <p>
                <Button href="#" bsStyle="primary">Buy Now!</Button>
                <Button href="#" bsStyle="default">More Info</Button>
              </p>
            </div>
          </div>
        </Col>

        <Col md={3} s={6} className="hero-feature">
          <div className="thumbnail">
            <img src="http://lorempixel.com/nature/800/500/" alt="" />
            <div className="caption">
              <h3>Feature Label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
              <p>
                <Button bsStyle="primary">Buy Now!</Button>
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
  </div>
);
