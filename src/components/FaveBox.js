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

    this.removeFromFavesList = this.removeFromFavesList.bind(this);
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
    axios
      .put(`/api/beers?id=${id}&note=${phrase}`)
      .then(res => this.setState({beerList:res.data}) )
      .catch(err => console.log(err));
  }

  removeFromFavesList(id)
  {
    //to delete from the faves list, make a DELETE request, send the requested ID as a feature
    //Finding the real index number happens on the backend
    axios
      .delete(`/api/faves/${id}`)
      .then( (res) => this.setState({beerList: res.data}) )
      .catch(err=> console.log("Error in removeFromFavesList(), App.js: ", err));
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
                placeholder={e.note || " make notes!"} 
                onChange={(x) => this.addNote(e.id, x.target.value)}/>
              {/* <button></button> */}
              <div className="remove-button" onClick={() => this.removeFromFavesList(e.id)}>x</div>
            </div>
          </div>
        )
      }
    ); //map
  }
}

export default FaveBox;