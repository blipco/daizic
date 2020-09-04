import React from 'react';
import {Line} from 'react-chartjs-2'
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        startDate: undefined,
        endDate: undefined,
        chartTemps: [],
        dayLabels: []
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
    let responseTemperatures = [];
    let chartTemperatures = [];
    let tempDays = [];
    axios({
      headers: {
        token: 'qqInFZLMhjXIfwxasnxecYhBpuyFTTcY'
      },
      method: 'get',
      responseType: 'json',
      url: `https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&datatypeid=TOBS&locationid=ZIP:91911&startdate=${this.state.startDate}&enddate=${this.state.endDate}&units=standard&limit=31`
    }).then((response) => {      
      responseTemperatures = response.data.results;
      for(let i=0;i<responseTemperatures.length;i++){
        chartTemperatures.push(responseTemperatures[i].value);
      }
      for(let i=0;i<responseTemperatures.length;i++){
        let editedDate = new Date(responseTemperatures[i].date).toString();
        let dateWithoutTime = editedDate.split(' ').slice(0, 4).join(' ');
        tempDays.push(dateWithoutTime);
      }
      this.setState({chartTemps: chartTemperatures});
      this.setState({dayLabels: tempDays});
    }).catch((err) => {
      console.log('ApiData function',err);
    })
  }

  render() {
    return (
      <div>
        <div id='container'>
        <h2 id='title'>
        Temperatures for Chula Vista, CA
        </h2>
        <form id='tempForm'>
          <label className='formChildren' htmlFor='startDate'>Start Date:</label>
          <input title='Please enter a date in the format YYYY-MM-DD' className='formChildren' id='startDate' onChange={this.handleStartDate} value={this.state.startDate} placeholder='YYYY-MM-DD'/>
          <label className='formChildren' htmlFor='endDate'>End Date:</label>
          <input title='Please enter a date in the format YYYY-MM-DD' className='formChildren' id='endDate' onChange={this.handleEndDate} value={this.state.endDate} placeholder='YYYY-MM-DD'/>
          <input className='formChildren' type='button' onClick={this.handleTempData} value='SUBMIT'/>
        </form>
        <div id='chartContainer'>
          <Line
            data={{
              labels: this.state.dayLabels,
              datasets: [{
                label: 'Temperature(F)',
                fill: true,
                lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: this.state.chartTemps
              }]
            }}
            options={{
              title:{
                display:true,
                fontSize: 20,
                color: 'rgba(255, 242, 0, 0.5)'
              },
              legend:{
                display:true,
                position:'right'
              }
            }}
          />
        </div>
        </div>
      </div>
    );
  }
}

export default App;
