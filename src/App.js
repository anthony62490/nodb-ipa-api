import React, { Component } from 'react';
import axios from 'axios';

import GridBox from './components/GridBox'
// import MoreInfoBox from './components/MoreInfoBox'//move this into GridBox when it looks good
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
      faveBeers: [],
      userInput: ''
    }

    this.handleInput = this.handleInput.bind(this);
    this.searchButtonEvent = this.searchButtonEvent.bind(this);
    this.addToFavesList = this.addToFavesList.bind(this);
    this.removeFromFavesList = this.removeFromFavesList.bind(this);
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
    axios
      .get('/api/faves')
      .then((res) => this.setState({faveBeers: res.data}))
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
    axios
      .post(`/api/faves?newFave=${id}`)
      .then( (res) => this.setState({faveBeers: res.data}) )
      .catch(err=> console.log("Error in addToFavesList(), App.js: ", err));
  }

  removeFromFavesList(id)
  {
    //to delete from the faves list, make a DELETE request, send the requested ID as a parameter
    //Finding the real index number happens on the backend
    axios
      .delete(`/api/faves/${id}`)
      .then( (res) => 
      {
        console.log(res);
        return this.setState({faveBeers: res.data});
      })
      .catch(err=> console.log("Error in removeFromFavesList(), App.js: ", err));
  }

  requestMoreBeers()
  {
    // calls the server again to request the next page of results
    // the requested beers are persistent on the backend until the server restarts
    axios
      .get('/api/beers/more')
      .then(response => this.setState({currentBeers: response.data}) )
      .catch(err => console.log("Error in requestMoreBeers(), App.js: ", err));
  }

  render() 
  {
    return (
      <div className="App">
        <div className="container">
          <SearchBar handleInputFn={this.handleInput} searchButtonEventFn={this.searchButtonEvent} userInput={this.state.userInput} />
          <div className="main-feed">
            <GridBox addToFavesListFn={this.addToFavesList} beersToDisplay={this.state.currentBeers} />
          </div>
          <div className="main-feed-alt">
            <button onClick={() => this.requestMoreBeers()}>More beer?</button>
          </div>
          <div className="faves-feed">
            <FaveBox beerList={this.state.faveBeers} removeFromFavesList={this.removeFromFavesList} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
