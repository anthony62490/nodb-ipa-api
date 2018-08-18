import React from 'react';
import logo from '../pics/mirror-sprite.png';
import axios from 'axios';
import './SearchBar.css';

const SearchBar = () =>
{

    return (
      <div className="search-bar">
        <img src={logo} className="App-logo" alt="logo" />
        <input type="text"/>
        <button>Search for Keywords</button>
      </div>
    )
}

export default SearchBar;