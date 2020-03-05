import React, { Component } from 'react'
import API from './lib/api'

export default class RelayLamp extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      fetching: false,
      relayNumber: this.props.relayNumber,
      nodemcuId: this.props.nodemcuId,
      status: 0
    }
  }
  
  componentDidMount(){
    this.refreshInterval = setInterval( () =>{
      this.setState({fetching: true});
      API.getRelayStatus( this.state.nodemcuId, this.state.relayNumber )
      .then( data =>{
        const status = data.filter( relay => relay.nodemcuId === this.state.nodemcuId && relay.relayNumber === this.state.relayNumber).value
        this.setState({status: data, fetching: false});
      })
    }, 5000)
  }
  render() {
    return (
      <div>
        {this.state.relayNumber}
        <input type="radio" name="status" id="status"/>
      </div>
    )
  }
}
