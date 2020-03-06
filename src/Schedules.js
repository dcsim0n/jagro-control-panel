import React, { Component } from 'react'
import API from './lib/api';

export default class Schedules extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      fetching: false,
      errors: [],
      scheduleStr: "",
      topic: "",
      message: "",    
      active: true,
      schedules: []
    }
  }
  
  handleNewSchedule( event ){
    event.preventDefault();
    //Submit form results
    const formData = {
      scheduleStr: this.state.scheduleStr,
      topic : this.state.topic,
      message: this.state.message,
      active: this.state.active
    }

    console.log("Subbmiting form data...", formData);
    this.setFetching( true );
    API.postSchedule( formData )
    .then( resp => {
      if( resp.ok ){
        this.getSchedules();
        //still fetching... no need to setFetching(false) here
      }else{
        console.log(resp.statusText);
        this.setFetching(false);
      }
    })
    .catch( error => {
      this.setFetching( false );
      console.log( error );
    })
    
  }

  setFetching( status ){
    this.setState({ fetching: status });
  }

  getSchedules( ){
    this.setFetching( true );
    API.getSchedules()
    .then( resp => {
      return resp.json();
    })
    .then ( data => {
      console.assert(data.length > 0, "Warning: received zero length response");
      this.setState({
        schedules: data
      }, ( ) => this.setFetching( false ));
    })
    .catch( error =>{
      console.log( error );
    })
  }

  deleteSchedule ( id ){
    console.log('id', id);
    API.deleteSchedule( id )
    .then( resp => {
      if( resp.ok ){
        this.getSchedules();
      }else{
        this.setFetching( false );
        console.log(resp);
        console.log("Error deleting schedule: ", id);
      }
    })
    .catch( error =>{
      this.setFetching( false );
      console.log(error);
    })

  }
  componentDidMount( ){
    if(!this.state.fetching){
      this.getSchedules();
    }
  }
  renderSchedules() {
    return this.state.schedules.map( sched => {
      return (
        <tr>
          <td>"{sched.scheduleStr}"</td>
          <td>{sched.topic}</td>
          <td>{sched.message}</td>
          <td>Active: {sched.active ? "Yes" : "No"}</td>
          <td><button id={sched.id} onClick={ ( e ) => this.deleteSchedule(e.target.id)}>Delete Schedule</button></td>
        </tr>
        
      )
    })
  }
  render() {
    return (
      <div>
        <h1>Command Schedules</h1>
        <form onSubmit={ ( e ) => this.handleNewSchedule( e ) }>
          <label htmlFor="scheduleStr">Schedule String</label>
          <input type="text" name="scheduleStr" id="scheduleStr" onChange={ ( e ) => this.setState({ scheduleStr: e.target.value }) }/>
          <label htmlFor="topic">Topic String</label>
          <input type="text" name="topic" id="topic" onChange={ ( e ) => this.setState({ topic: e.target.value }) }/>
          <label htmlFor="message">Message String</label>
          <input type="text" name="message" id="message" onChange={ ( e ) => this.setState({ message: e.target.value }) }/>

          <button type="submit">Create New Schedule</button>
        </form>
        <div>
          <table>
            <tbody>
              { this.renderSchedules() }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
