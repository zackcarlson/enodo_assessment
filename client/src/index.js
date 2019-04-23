import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import MapContainer from './components/MapContainer';
import Navbar from './components/Navbar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      properties: [],
      min: null,
      max: null
    };
    this.getInitialData = this.getInitialData.bind(this);
  }

  componentDidMount() {
    this.getInitialData();
  }

  getInitialData() {
    axios.get('/initialData')
      .then((response) => {
        this.setState({
          properties: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleFilterData(filters) {
    axios.post('/filterData', filters)
      .then((response) => {
        this.setState({
          properties: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render () {
    return (
      <div>
        <Navbar onApplyFilters={this.handleFilterData.bind(this)}/>
        <MapContainer properties={this.state.properties}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));