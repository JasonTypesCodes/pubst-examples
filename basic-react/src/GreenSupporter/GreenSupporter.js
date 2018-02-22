import React, { Component } from 'react';
import pubst from 'pubst';

import './GreenSupporter.css';

class GreenSupporter extends Component {

  constructor() {
    super();
    this.state = {
      color: ''
    };
    this.unsub = pubst.subscribe('COLOR', val => {
      this.setState({
        color: val
      });
    }, 'NONE');
  }

  componentWillUnmount() {
    this.unsub();
  }

  yayGreen = () => {
    pubst.publish('COLOR', 'green');
  }

  render() {
    const {color} = this.state;
    return (
      <div className="GreenSupporter">
        {
          color === 'NONE' ?
            (
              <span className="green-text">You know what color I like?</span>
            ) :
            (color === 'green' ?
              (
                <span>
                  Yeah! <span className="green-text">GREEN</span> is the <span className="green-text">BEST</span>!!
                </span>
              ) :
              (
                <div>
                  <p>Really? You like <span style={{color}}>{color.toUpperCase()}</span> better than <span className="green-text">GREEN?</span></p>
                  <p>If you change your mind, you could always just click here:</p>
                  <button onClick={this.yayGreen}>You're right... Green is the best color</button>
                </div>
              )
            )
        }
      </div>
    );
  }
}

export default GreenSupporter;
