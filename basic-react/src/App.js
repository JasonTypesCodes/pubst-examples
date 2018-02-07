import React, { Component } from 'react';
import ColorBox from './ColorBox/ColorBox'
import ColorSelect from './ColorSelect/ColorSelect'
import GreenSupporter from './GreenSupporter/GreenSupporter';

import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <ColorSelect/>
        <br/>
        <ColorBox/>
        <br/><br/>
        <GreenSupporter/>
      </div>
    );
  }
}

export default App;
