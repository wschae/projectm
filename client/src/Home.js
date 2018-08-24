import React, { Component } from 'react';
import logo from './pxlogo.png';

class Home extends Component {
  render() {
    return (
      <div className="App">
          <header className="App-header">
          </header>
          
          <div className="App-intro">
            <img src={logo} alt="logo" />
          </div>
      </div>
    )
  }
}
export default Home;