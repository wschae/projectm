import React from 'react';
import { Row } from 'simple-flexbox';
import ReactLoading from 'react-loading';
// import web3 from './web3';

const Balance = (props) => {
    if (props.address === "") {
      // loading
      return (
        <Row horizontal='center'>
          <ReactLoading type='bars' />
        </Row>
      );
    }
     if (!props.hasEnoughFund) {
      return (
        <Row style={{display:'inline-block', wordBreak: 'break-word', textAlign:'left'}}>
        <div>
          <font style={{color:"white"}}>Current faucet balance is </font>
          <font style={{color:"yellow", fontWeight: "bold"}}> {props.balance} </font>
          <font style={{color:"white"}}>
          ETH and it is not enough to make the transaction.
          Please, send spare testnet coins to </font>
          <font style={{color:"yellow", fontWeight: "bold"}}>
          {props.address}.
          </font>
        </div>
      </Row>
      );
    }
    
    return (
      <Row style={{width: 800, maxWidth:800, display:'inline-block', wordBreak: 'break-word', textAlign:'left'}}>
        <div>
          <font style={{color:"white"}}>
          This faucet is managed by 
          <font style={{color:"yellow", fontWeight: "bold"}}> {props.address} </font>.
          Current faucet balance is 
          </font>
          <font style={{color:"yellow", fontWeight: "bold"}}> {props.balance} </font>
          <font style={{color:"white"}}> ETH. You will get </font>
          <font style={{color:"yellow", fontWeight: "bold"}}> {props.reward} </font>
          <font style={{color:"white"}}> ETH.</font>
        </div>
      </Row>
    );
  }
   export default Balance;