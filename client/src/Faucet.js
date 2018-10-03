import React, { Component } from 'react';
import { Column, Row } from 'simple-flexbox';

import Balance from './Faucet.Balance';
import Error from './Faucet.Error';
import Output from './Faucet.Output';
import Title from './Faucet.Title';

class Faucet extends Component {
  constructor(props) {
    super(props);
    this.state = {value: '', result:{}, balance:0, address:''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.getBalance()
    .then(res => this.setState({balance:res.balance, address:res.address, minimum:res.minimum, reward:res.reward}))
    .catch(err => console.log(err));
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.getCoins()
    .then(res => this.setState({result:res}))
    .catch(err => console.log(err));

    event.preventDefault();
  }

  getCoins = async () => {
    const response = await fetch('/api/faucet/'+this.state.value);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    
    return body;
  }

  getBalance = async () => {
    const response = await fetch('/api/balance/');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    
    return body;
  }

  render() {
    const hasEnoughFund = this.state.balance > this.state.minimum;
    const gotCoins = this.state.result.address != null && this.state.result.error == null;
    const error = this.state.result.error != null;
    return (
      <div className="App">
          <header className="App-header">
          </header>
          
          <div className="App-intro">
            <Column flexGrow={1}>
              <Title />>
              <br />

              <Balance  
                hasEnoughFund={hasEnoughFund}
                balance={this.state.balance}
                reward={this.state.reward}
                address={this.state.address} />
              <br />

              {hasEnoughFund && !gotCoins &&
              <Row>
                <div>
                  <font style={{color:"white"}}>Enter your</font> 
                  <font style={{color:"#996cf6", fontWeight: "bold"}}> public key </font>
                  <font style={{color:"white"}}>
                    to create a multi signature address.
                  </font>
                </div>
              </Row>
              }

              {hasEnoughFund && !gotCoins &&
              <Row>
                <form onSubmit={this.handleSubmit}>
                  <input 
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                    placeholder="Your public key"
                    size="71"/>
                  <input type="submit" value="Get bitcoins!" />
                </form>
              </Row>
              }
            </Column>

            {gotCoins &&
            <Output
              txid={this.state.result.txid}
              reward={this.state.reward}
              address={this.state.result.address}
              script={this.state.result.script} />
            }

            {
              error &&
              <Error message={this.state.result.error} />
            }
          </div>
      </div>
    );
  }
}

export default Faucet;