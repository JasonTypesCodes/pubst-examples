import React, { Component } from 'react';
import {subscriber} from 'react-pubst';

import ColorBox from './ColorBox';

class ColorBoxWrapper extends Component {

  render() {
    const {color} = this.props;
    return (
      <ColorBox color={color} />
    );
  }
}

export default subscriber(ColorBoxWrapper, {
  color: {
    topic: 'COLOR',
    default: 'white'
  }
});
