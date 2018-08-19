import React, { Component } from 'react';
import axios from 'axios';

import GridBox from './components/GridBox'
import FaveBox from './components/FaveBox'
import SearchBar from './components/SearchBar';

// import logo from './pics/mirror-sprite.png';
import './App.css';

class App extends Component 
{
  constructor()
  {
    super()
    this.state =
    {
      currentBeers: [],
      userInput: ''
    }

    this.handleInput = this.handleInput.bind(this);
    this.searchButtonEvent = this.searchButtonEvent(this);
  }

  componentDidMount()
  {
    axios
      .get('/api/beers')
      .then( (res) => 
      {
        this.setState({currentBeers: res.data})
        // console.log(res.data)
      })
      .catch(err=> console.log("Error in componentDidMount(), App.js: ", err));
  }


  handleInput(str)
  {
    this.setState({userInput: str.target.value});
  }

  searchButtonEvent()
  {
    //user has entered a search term and pressed the button
    //If the current state is altered as-is, then each subsequent search would limit the pool further
    //Request a new list from the local API and supply a search term
    axios
      .get(`/api/beers?terms=${this.state.userInput}`) //send userInput as a query
      .then( (res) => this.setState({currentBeers:res.data}) )
      .catch(err=> console.log("Error in searchButtonEvent(), App.js: ", err));

    this.setState({userInput:''});
  }

  render() 
  {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">IPA|API</h1>
        </header> */}
        <div className="container">
          <SearchBar handleInputFn={this.handleInput} searchButtonEventFn={this.searchButtonEvent} />
          <div className="main-feed">
            <GridBox beersToDisplay={this.state.currentBeers} />
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
