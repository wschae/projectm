import React from 'react';
import { Row } from 'simple-flexbox';

const Error = (props) => {
  return (
    <Row>
      <div>
        <font style={{color:"red", fontWeight: "bold"}}>Something went wrong</font> 
        <font style={{color:"white"}}> ({props.message}) </font>
        <font style={{color:"red"}}>Please, try later!</font> 
      </div>
    </Row>
  );
}

export default Error;