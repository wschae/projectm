import React, { Component } from 'react';
import './App.css';

class Team extends Component {
  state = {
    response: []
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({response: res}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  render() {
    const items = this.state.response.map((item) => {
      const liststyle = {
        backgroundImage: `url(${item.url})`,
        backgroundSize: '100px',
        height: '100px',
        width: '100px',
        float: 'left',
        display: 'block',
        position: 'relative',
        opacity: '0.6'
      };

      const namestyle = {
        position: 'absolute',
        bottom: '2px',
        right: '10px',
        color: 'white',
        textAlign: 'right',
        fontWeight: 'bold',
        fontSize: '15px',
        textShadow: '2px 2px #000'
      };

      return (
        <li className='hover-image' key={item.url}>
          <div style={liststyle}> 
            <span  style={namestyle} className='hover-image--on'>
                {item.name}
            </span>
          </div>
        </li>
      );
    });

    return (
      <div className="App">
        <header className="App-header">
        </header>

        <div className="App-intro">
          <h1>
              <font style={{color:"white"}}>P(roject)</font> 
              <font style={{color:"#996cf6", fontWeight: "bold"}}> M </font>
              <font style={{color:"white"}}>is built and maintained by these people</font> 
          </h1>

          <br />

          <ul style={{listStyle: 'none'}}>
            {items}
          </ul>
        </div>
      </div>
    );
  }
}

export default Team;
