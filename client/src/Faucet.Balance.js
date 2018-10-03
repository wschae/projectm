import React from 'react';
import { Row } from 'simple-flexbox';

const Balance = (props) => {
  if (!props.hasEnoughFund) {
    return (
      <Row style={{width: 800, maxWidth:800, display:'inline-block', wordBreak: 'break-word', textAlign:'left'}}>
      <div>                
        <font style={{color:"white"}}>Current faucet balance is </font>
        <font style={{color:"yellow", fontWeight: "bold"}}> {props.balance} </font>
        <font style={{color:"white"}}>
        BTC and it is not enough to make the transaction.
        Please, come back later or send spare testnet coins to
        </font>
        <font style={{color:"yellow", fontWeight: "bold"}}> {props.address}</font>
        <font style={{color:"white"}}>.</font>
      </div>
    </Row>
    );
  }

  return (
    <Row style={{width: 800, maxWidth:800, display:'inline-block', wordBreak: 'break-word', textAlign:'left'}}>
      <div>
        <font style={{color:"white"}}>
          Current faucet balance is 
        </font>
        <font style={{color:"yellow", fontWeight: "bold"}}> {props.balance} </font>
        <font style={{color:"white"}}> BTC. You will get </font>
        <font style={{color:"yellow", fontWeight: "bold"}}> {props.reward} </font>
        <font style={{color:"white"}}>
          BTC. If you don't spend this coins, they'll be reclaimed in a few days, so others can use them.
        </font>
      </div>
    </Row>
  );
}

export default Balance;