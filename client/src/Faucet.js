import React, { Component } from 'react';
import { Column, Row } from 'simple-flexbox';
import FaucetContract from './contracts/Faucet.json';
import getWeb3 from './getWeb3';
import Balance from './Faucet.Balance';
// import Error from './Faucet.Error';
// import Output from './Faucet.Output';
import Title from './Faucet.Title';
import TruffleContract from 'truffle-contract';

class Faucet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            reward: '0.1',
            message: '',
            address: '',
            web3: null,
            accounts: null,
            contract: null,
            result: {address:null, error:null}
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount = async () => {
      try {
        const web3 = await getWeb3();

        const accounts = await web3.eth.getAccounts();
        var account_balance = await web3.eth.getBalance(accounts[0]);

        const Contract = TruffleContract(FaucetContract);
        Contract.setProvider(web3.currentProvider);
        const instance = await Contract.deployed();
        var balance = await web3.eth.getBalance(instance.address);
        
        this.setState({ web3, accounts, contract: instance, address: instance.address, balance:web3.utils.fromWei(balance,'ether'), 
         account_balance:web3.utils.fromWei(account_balance,'ether')
        });
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(`Failed to load web3, accounts, or contract. Check console for details.`+error);
        console.log(error);
      }
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    onClick = async (event) => {
        event.preventDefault();

        this.setState({message:'Waiting on transaction success...'});

        await this.state.contract.withdraw(this.state.web3.utils.toWei(this.state.reward, 'ether'), {
            from: this.state.accounts[0],
            gas:50000,
        });

        this.setState({message:'Transaction done!'});

        var balance = await this.state.web3.eth.getBalance(this.state.address);
        var account_balance = await this.state.web3.eth.getBalance(this.state.accounts[0]);        
        this.setState({balance:this.state.web3.utils.fromWei(balance,'ether'), 
                       account_balance:this.state.web3.utils.fromWei(account_balance,'ether')});
    }

    render() {
        const hasEnoughFund = this.state.balance > 1;
        const gotCoins = this.state.result.address != null && this.state.result.error == null;
        const error = this.state.result.error != null;
      return (
        <div className="App">
            <header className="App-header">
            </header>
            
            <div className="App-intro">
              <Column flexGrow={1}>
                <Title address={FaucetContract.address} />
                <br />
                 <Balance  
                    hasEnoughFund={hasEnoughFund}
                    balance={this.state.balance}
                    reward={this.state.reward}
                    address={this.state.address} />
                <br />
                 {hasEnoughFund && !gotCoins &&
                <Row style={{width: 800, maxWidth:800, display:'inline-block', wordBreak: 'break-word', textAlign:'left'}}>
                  <div>
                    <font style={{color:"white"}}> Your account </font> 
                    <font style={{color:"#996cf6"}}> 
                        <a href={'https://ropsten.etherscan.io/address/'+this.state.account} target='_blank'> {this.state.accounts}</a>
                    </font>
                    <font style={{color:"white"}}> has </font>
                    <font style={{color:"yellow", fontWeight: "bold"}}> {this.state.account_balance} </font>
                    <font style={{color:"white"}}> ETH. </font>
                    <button onClick={this.onClick}> Request 0.1 ether from faucet</button>
                  </div>
                </Row>
                }
              </Column>
               {/* {gotCoins &&
              <Output
                txid={this.state.result.txid}
                reward={this.state.reward}
                address={this.state.result.address}
                script={this.state.result.script} />
              } */}
               {/* {
                error &&
                <Error message={this.state.result.error} />
              } */}
                <font style={{color:"white"}}>{this.state.message}</font>
            </div>
        </div>
      );
    }
  }

  export default Faucet;