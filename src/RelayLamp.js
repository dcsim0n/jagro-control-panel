import React, { Component } from 'react'
import PropTypes from 'prop-types';
import API from './lib/api'

class RelayLamp extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      fetching: false,
      relayNum: this.props.relayNum,
      nodemcuId: this.props.nodemcuId,
      status: 0
    }
  }
  
  componentDidMount(){
    this.refreshInterval = setInterval( () =>{
      this.setState({fetching: true});
      API.getRelayStatus( this.state.nodemcuId, this.state.relayNum )
      .then( data =>{
        const status = data.filter( relay => (relay.nodemcuId === this.state.nodemcuId && relay.relayNum === this.state.relayNum))[0].status
        this.setState({status: status, fetching: false});
      })
    }, 5000)
  }
  render() {
    return (
      <div>
        Relay Status: 
        {this.state.relayNum}
        { /* Remember relay logic is inverted, 1 = off , 0 = on */ }
        <input type="checkbox" name="status" id="status" checked={this.state.status===0 ? true : false } /> 
      </div>
    )
  }
}

RelayLamp.propTypes = {
  nodemcuId: PropTypes.number,
  relayNum: PropTypes.number
}

export default RelayLamp;