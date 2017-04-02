import React, { Component } from 'react'
import { Jumbotron, Button } from 'react-bootstrap'

class JumbotronComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: this.props.name,
      tagline: '',
      backgroundImage: 'url(http://res.cloudinary.com/dk5dqve4y/image/upload/c_scale,h_600,w_1500/v1488833853/AdobeStock_104997223-squashed_copy_xdhdkz.jpg)'
    }
  }
  render () {
    return (
      <Jumbotron style={{ backgroundImage: this.state.backgroundImage }}>
        <h1 style={{ display: 'flex', justifyContent: 'center' }}>{this.state.title}</h1>
        <div className='container'>
          <p>{this.state.tagline}</p>
          <p><Button bsStyle='primary'>Learn more</Button></p>
        </div>
      </Jumbotron>
    )
  }
}

export default JumbotronComponent
