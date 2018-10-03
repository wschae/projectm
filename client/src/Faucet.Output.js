import React from 'react';
import { Column, Row } from 'simple-flexbox';

const Output = (props) => {
  return (
    <Column flexGrow={1}>
    <Row style={{width: 800, maxWidth:800, display:'inline-block', wordBreak: 'break-all', textAlign:'left'}}>
      <font style={{color:"white"}}>We sent </font>
      <font style={{color:"yellow", fontWeight: "bold"}}> {props.reward} </font>
      <font style={{color:"white"}}>bitcoins to  
        <a href={'https://live.blockcypher.com/btc-testnet/address/'+props.address} target='_blank'> {props.address}</a>.
        In order to spend this coins, use the following multisig scripts:
      </font>
    </Row>
  
    <br />

    <Row  style={{backgroundColor: '#424949', width: 800, maxWidth:800, display:'inline-block', wordBreak: 'break-all', textAlign:'left'}}> 
      <font style={{color:"#CCD1D1"}}>
        {props.script}
      </font>
    </Row>

    <br />

    <Row style={{width: 800, maxWidth:800, display:'inline-block', wordBreak: 'break-all', textAlign:'left'}}>
      <font style={{color:"white"}}>
        For example, you can use <a href='https://github.com/wschae/pybitcointools' target='_blank'>pybitcointools</a> to send it to your address: 
      </font>
    </Row>
  
    <br />

    <Row  style={{backgroundColor: 'black', width: 800, maxWidth:800, display:'inline-block', wordBreak: 'break-all', textAlign:'left'}}> 
      <font style={{color:"#CCD1D1"}}>
        >>> inputs = [{"{"} 'output':<a href={'https://live.blockcypher.com/btc-testnet/tx/'+props.txid} target='_blank'>'{props.txid}</a>:0', 'value':100000 {"}"}] <br />
        >>> outputs = [{"{"} 'address': '...', 'value':... {"}"}] <br />
        >>> tx = mktx(inputs, outputs) <br />
        >>> sig = multisign(tx, 0, script, priv) <br />
        >>> tx2 = apply_multisignatures(tx, 0, script, sig) <br />
        >>> testnet_pushtx(tx2) <br />
      </font>
    </Row>

    <br />

    <Row style={{width: 800, maxWidth:800, display:'inline-block', wordBreak: 'break-all', textAlign:'left'}}>
      <font style={{color:"white"}}>
        If you don't spent this coins, they'll be reclaimed in a few days, so others can use them. 
      </font>
    </Row>
  </Column>
  );
}

export default Output;