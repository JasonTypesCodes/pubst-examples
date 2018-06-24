import React, { Component } from 'react';
import ColorBoxWrapper from './ColorBox/ColorBoxWrapper'
import ColorSelect from './ColorSelect/ColorSelect'
import GreenSupporter from './GreenSupporter/GreenSupporter';

import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <ColorSelect/>
        <br/>
        <ColorBoxWrapper />
        <br/><br/>
        <GreenSupporter/>
      </div>
    );
  }
}

export default App;
