import React from 'react';
import { Row } from 'simple-flexbox';

const Title = (props) => {
  return (
    <Row horizontal='center'>
      <h1>
        <font style={{color:"white"}}>Smart</font> 
        <font style={{color:"#996cf6", fontWeight: "bold"}}> Bitcoin </font>
        <font style={{color:"white"}}>testnet3 faucet</font> 
      </h1>
    </Row>
  );
}

export default Title;