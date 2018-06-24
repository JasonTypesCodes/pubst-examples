import React, { Component } from 'react';

import './ColorBox.css';

class ColorBox extends Component {

  render() {
    const {color} = this.props;
    return (
      <div className="ColorBox" style={{backgroundColor: color}}>
        <h2>Like this?</h2>
      </div>
    );
  }
}

export default ColorBox;
