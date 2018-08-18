import React, { Component } from 'react';
import logo from './logo.svg';
import GridBox from './components/GridBox'
import FaveBox from './components/FaveBox'
import './App.css';

class App extends Component 
{
  render() 
  {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">IPA|API</h1>
        </header>
        <div class="container">

          <div class="main-feed">
            <GridBox/>
          </div>

          <div class="faves-feed">
            <FaveBox/>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
