import React, { Component } from 'react'
import Gauge from './Gauge'

export default class SensorSplash extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      fetching: false,
      errors: [],
      measurements: [
        {nodemcuId: 4, sensorNum: 1},
        {nodemcuId: 4, sensorNum: 2},
        {nodemcuId: 4, sensorNum: 3},
        {nodemcuId: 4, sensorNum: 4}
         // array of sensors to draw gauges for 
      ]
    }
  }
  // getLatest() {
  //   fetch( JAGROAPI.getMeasurements )
  //   .then( resp => {
  //     return resp.body.json();
  //   })
  //   .then( data => {
      
  //   })
  // }
  
  render() {
    return (
      <div>
        { this.state.measurements.map( sensor => <Gauge {...sensor }/> )}
      </div>
    )
  }
}
