import React, { Component } from 'react';
import pubst from 'pubst';

import './ColorBox.css';

class ColorBox extends Component {

  constructor() {
    super();
    this.state = {};
    this.unsub = pubst.subscribe('COLOR', val => {
      this.setState({
        color: val
      });
    }, 'white');
  }

  componentWillUnmount() {
    this.unsub();
  }

  render() {
    const {color} = this.state;
    return (
      <div className="ColorBox" style={{backgroundColor: color}}>
        <h2>Like this?</h2>
      </div>
    );
  }
}

export default ColorBox;
