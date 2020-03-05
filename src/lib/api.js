/*
*
* API url constants
*
*/
const API_ROOT = "http://pi02:3000/api/v1";

const API = {
  getSchedules: function(){
    return fetch("http://pi02:3000/api/v1/schedules");
  },

  postSchedule: function( newSchedule ){
    return fetch("http://pi02:3000/api/v1/schedules",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify( newSchedule )
    });
  },

  getRelayStatus: function( nodemcuId, relayNumber ){
    return fetch("http://pi02:/api/v1/relaystatus")
    .then ( resp => {
        if( resp.ok ){
          return resp.json();
        }else{
          console.log(resp.statusText);
        }
      }) 
  },

  deleteSchedule: function ( id ){
    return fetch(`${ API_ROOT }/schedules/${ id }`,{ method: 'DELETE' });
  },

  getMeasurement: function( deviceId, sensorId ) {
    return fetch(`http://pi02:3000/api/v1/measurements/${ deviceId }/${ sensorId }`)
  }
  
};


export default API;