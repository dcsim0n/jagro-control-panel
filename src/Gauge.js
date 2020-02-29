import React from 'react'
import API from './lib/api';

export default class Gauge extends React.Component {
  constructor(props) {
    super(props)
    this.props = props;
    this.state = {
      fetching: false,
      measurement: {} 
    };
    this.refreshInterval = null;
  }
  setFetchStatus( status ){
    this.setState({fetching: status });
  }
  fetchMeasurement(){
    this.setFetchStatus( true );
    API.getMeasurement( this.props.nodemcuId, this.props.sensorNum )
    .then( resp => {
      return resp.json();
    })
    .then ( data =>{
      console.assert(data.length > 0, "Warning, received 0 lenght data set")
      const lastIdx = data.length - 1;
      this.setState({
        measurement: data[lastIdx]
      },() => this.setFetchStatus( false ))
    })
    .catch( error => console.log(error) )
    
  }
  componentDidMount(){
    if(!this.fetching ){
      this.refreshInterval = setInterval(() => {
        this.fetchMeasurement(); 
      }, 5000); 
    }
  }

  componentWillUnmount(){
    this.refreshInterval.stop();
  }
  render() {
    return (
      <div>
        <label htmlFor= { "gaugeId" + this.props.sensorNum } >Node: { this.props.nodemcuId } Sensor Number: { this.props.sensorNum }</label>   
        <input name= { "gaugeId" + this.state.measurement.uniqueId } className="Guage" type="text" value= { this.state.measurement.value || '' } readOnly={ true }/>
      </div>
    );
  }
}
