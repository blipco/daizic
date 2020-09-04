import React from 'react';
import {Line} from 'react-chartjs-2'
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        chulaVistaTemp : 0,
        startDate: undefined,
        endDate: undefined,
        chartInfo: {
          labels: ['January', 'February', 'March','April', 'May'],
          datasets: [{
            label: 'Temperature(F)',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [65, 59, 80, 81, 56]
          }]
        }
      }
      this.handleTempData=this.handleTempData.bind(this);
      this.handleStartDate=this.handleStartDate.bind(this);
      this.handleEndDate=this.handleEndDate.bind(this);
  };

  handleStartDate(e) {
    this.setState({startDate: e.target.value});
  }

  handleEndDate(e) {
    this.setState({endDate: e.target.value});
  }

  handleTempData() {
    axios({
      headers: {
        token: 'qqInFZLMhjXIfwxasnxecYhBpuyFTTcY'
      },
      method: 'get',
      responseType: 'json',
      url: `https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&datatypeid=TOBS&locationid=ZIP:91911&startdate=${this.state.startDate}&enddate=${this.state.endDate}&units=standard`
    }).then((response) => {
      this.setState({chulaVistaTemp: response.data.results});
      console.log('data results',response.data.results)
    }).catch((err) => {
      console.log('ApiData function',err);
    })

  }

  render() {
    return (
      <div>
        <h2>
        Temperatures for Chula Vista, CA
        </h2>
        <form id='tempForm'>
          Start Date
          <input onChange={this.handleStartDate} value={this.state.startDate} placeholder='YYYY-MM-DD'/><br/>
          End Date
          <input onChange={this.handleEndDate} value={this.state.endDate} placeholder='YYYY-MM-DD'/><br/>
        </form>
        <button onClick={this.handleTempData}>
          Click Me
        </button>
        <Line
          data={this.state.chartInfo}
          options={{
            title:{
              display:true,
              text:'Daily Temperature for Chula Vista, CA',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    );
  }
}

export default App;
