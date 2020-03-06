import React, { Component } from 'react'
import RelayLamp from './RelayLamp';

export default class RelaySplash extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
        lamps: [
          {nodemcuId: 4, relayNum: 1 },
          {nodemcuId: 4, relayNum: 2 },
      ]
    }
  }
  
  render() {
    return (
      <div>
        <h1>Relay Status</h1>
        { this.state.lamps.map( lamp => <RelayLamp { ...lamp } key={ lamp.id } /> )}
      </div>
    )
  }
}
