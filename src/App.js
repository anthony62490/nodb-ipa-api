import React, { Component } from 'react';
import axios from 'axios';

import GridBox from './components/GridBox'
import FaveBox from './components/FaveBox'
import SearchBar from './components/SearchBar';

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
    this.searchButtonEvent = this.searchButtonEvent.bind(this);
    this.addToFavesList = this.addToFavesList.bind(this);
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
      .get(`/api/beers/search?terms=${this.state.userInput}`) //send userInput as a query
      .then( (res) => this.setState({currentBeers:res.data}) )
      .catch(err=> console.log("Error in searchButtonEvent(), App.js: ", err));

    this.setState({userInput:''});
  }

  addToFavesList(id)
  {
    //to add an item to the favorites list, get the singular item and send it through a PUT request
    //Alter the main backend-hosted list so that the page can be refreshed and not lose the data
    let newFavoriteIndex = this.state.currentBeers.map((x) => x.id ).indexOf(id);
    console.log('NEW FAVORITE: ', id);
    axios.post(`/api/faves?newFave=${id}`)
  }

  //Deleting from the favorites list is handled by the FaveBox
  //since it doesn't require access to the full list

  render() 
  {
    return (
      <div className="App">
        <div className="container">
          <SearchBar handleInputFn={this.handleInput} searchButtonEventFn={this.searchButtonEvent} userInput={this.state.userInput} />
          <div className="main-feed">
            <GridBox beersToDisplay={this.state.currentBeers} addToFavesListFn={this.addToFavesList} />
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
