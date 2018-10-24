import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{float: "right", marginRight: "98px"}}> 
            <Link className="navbar-brand" to="/" style={{color: "white"}}>Home</Link>
            <Link className="navbar-brand" to="/team" style={{color: "white"}}>Team</Link>
            <Link className="navbar-brand" to="/faucet" style={{color: "white"}}>Faucet</Link>
        </nav>
    )
  }
}
export default NavBar;