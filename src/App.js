import React, { Component } from 'react';
import logo from './pics/mirror-sprite.png';
import GridBox from './components/GridBox'
import FaveBox from './components/FaveBox'
import SearchBar from './components/SearchBar'
import './App.css';

class App extends Component 
{
  // constructor()
  // {
  //   super()
  //   this.state =
  //   {
  //     currentBeers: []
  //   }
  // }

  render() 
  {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">IPA|API</h1>
        </header> */}
        <div className="container">
          <SearchBar/>
          <div className="main-feed">
            <GridBox/>
            Right Column: 200px Demo content nothing to read here Welcome to Dynamic Drive CSS Library Demo content nothing to read here Demo content nothing to read here Welcome to Dynamic Drive CSS Library Welcome to Dynamic Drive CSS Library Demo content nothing to read here Demo content nothing to read here Welcome to Dynamic Drive CSS Library Demo content nothing to read here Welcome to Dynamic Drive CSS Library This is just some filler text This is just some filler text Demo content nothing to read here
          </div>

          <div className="faves-feed">
            <FaveBox/>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
