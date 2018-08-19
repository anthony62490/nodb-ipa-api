import React from 'react';
import logo from '../pics/mirror-sprite.png';
// import axios from 'axios';
import './SearchBar.css';

const SearchBar = (props) =>
{

    return (
      <div className="search-bar">
        <img src={logo} className="App-logo" alt="logo" />
        <input type="text" onChange={(x) => props.handleInputFn(x)}/>
        <button onClick={() => props.searchButtonEventFn()}>Search for Keywords</button>
      </div>
    )
}

export default SearchBar;