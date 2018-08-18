import React, {Component} from 'react';
import axios from 'axios';
import './GridBox.css';

class GridBox extends Component
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
      .get('/api/beers')
      .then((res) => this.setState({beerList: res.data}) )
      .catch(err => console.log(err));
  }

  render()
  {
    console.log("beerList", this.state.beerList)
    // return <div>.</div>

    return this.state.beerList.map((e,i) =>
      {
        return (
          <div className="beer-token" key={e.id}>
            {console.log(e["image_url"])}
            <img className="beer-large" src={e.image_url} alt=""/>
            <p>
              {e.name}
            </p>
            <div className="add-to-favorites">+</div>
          </div>
        )
      }
    ); //map
  }
}

export default GridBox;