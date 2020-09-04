import React from 'react';
import {Line} from 'react-chartjs-2'
import axios from 'axios';

const state = {
  labels: ['January', 'February', 'March',
           'April', 'May'],
  datasets: [
    {
      label: 'Rainfall',
      fill: false,
      lineTension: 0.5,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56]
    }
  ]
}

class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        chulaVistaTemp : 0
      };
      this.tempData=this.tempData.bind(this);
  };

  tempData() {
    axios({
      headers: {
        token: 'qqInFZLMhjXIfwxasnxecYhBpuyFTTcY'
      },
      method: 'get',
      responseType: 'json',
      url: 'https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&datatypeid=TOBS&locationid=ZIP:91911&startdate=2020-01-01&enddate=2020-01-02&units=standard'
    }).then( (response) => {
      this.setState({chulaVistaTemp: response.data.results});
    }).catch( function(err){
      console.log("ApiData function Error",err);
    })
  }

  render() {
    return (
      <div>
        <h2>
        Temperatures for Chula Vista, CA
        </h2>
        <form style={{borderstyle:"dotted"}}>
          Start Date<input type="date" />
          End Date<input type="date" />
        </form>
      <button onClick={this.tempData}>
        Click Me
      </button>
      <p>
        {console.log("chulaVistaTemp" , this.state.chulaVistaTemp)}
      </p>  
      </div>
    );
  }
}

export default App;
