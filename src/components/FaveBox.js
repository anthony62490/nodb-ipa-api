import React, {Component} from 'react';
import axios from 'axios';
import './FaveBox.css';

class FaveBox extends Component
{
  constructor()
  {
    super();
    this.state =
    {
      beerList: []
    };
  }

  componentDidMount()
  {
    axios
      .get('/api/faves')
      .then((res) => this.setState({beerList: res.data}) )
      .catch(err => console.log(err));
  }

  addNote(id, phrase)
  {
    console.log("POW!");
    axios
      .put(`/api/beers?id=${id}&note=${phrase}`)
      .then(res => this.setState({beerList:res.data}) )
      .catch(err => console.log(err));
  }

  render()
  {
    return this.state.beerList.map((e,i) =>
      {
        return (
          <div className="beer-token-small" key={e.id}>
            {e.name}
            <img className="beer-small" src={e.image_url} alt={e.name}/>
            <div className="fave-interface-container">
              <input 
                className="add-note-field" 
                placeholder={e.note || "make notes!"} 
                onChange={(x) => this.addNote(e.id, x.target.value)}/>
              {/* <button></button> */}
              <div className="remove-button">x</div>
            </div>
          </div>
        )
      }
    ); //map
  }
}

export default FaveBox;