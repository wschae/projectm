import React from 'react';
import { Row } from 'simple-flexbox';
 const Title = (props) => {
  return (
    <Row horizontal='center'>
      <h1>
        <font style={{color:"white"}}>Ethereum </font> 
        <font style={{color:"#996cf6", fontWeight: "bold"}}> Testnet </font>
        <font style={{color:"white"}}>Faucet</font>
      </h1>
    </Row>
  );
}
 export default Title;