import React, { Component } from 'react';
import logo from './logo.svg';
import GridBox from './components/GridBox'
import './App.css';

class App extends Component 
{
  // constructor()
  // {
  //   super()
  //   this.state =
  //   {
  //     currentDisplay: []
  //   }
  // }

  // componentDidMount()
  // {
  //   axios
  //     .get('/api/beers')
  //     .then((response) => this.setState({currentDisplay: response.data}) )
  //     .catch((error) => console.log(error))
  // }

  render() 
  {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">IPA|API</h1>
        </header>
        <GridBox/>
      </div>
    );
  }
}

export default App;
