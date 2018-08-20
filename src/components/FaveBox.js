import React, {Component} from 'react';
import axios from 'axios';
import './FaveBox.css';

const FaveBox = props =>
{

  // componentDidMount()
  // {
  //   axios
  //     .get('/api/faves')
  //     .then((res) => this.setState({beerList: res.data}) )
  //     .catch(err => console.log(err));
  // }

  function addNote(id, phrase)
  {
    axios
      .put(`/api/beers?id=${id}&note=${phrase}`)
      .then(res => props.beerList = res.data)
      .catch(err => console.log(err));
  }

  return props.beerList.map((e,i) =>
    {
      return (
        <div className="beer-token-small" key={e.id}>
          {e.name}
          <img className="beer-small" src={e.image_url} alt={e.name}/>
          <div className="fave-interface-container">
            <input 
              className="add-note-field" 
              placeholder={e.note || " make notes!"} 
              onChange={(x) => addNote(e.id, x.target.value)}/>
            {/* <button></button> */}
            <div className="remove-button" onClick={() => props.removeFromFavesList(e.id)}>x</div>
          </div>
        </div>
      )
    }
  ); //map
}

export default FaveBox;