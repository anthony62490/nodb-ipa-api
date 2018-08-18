import React, {Component} from 'react';
import axios from 'axios';

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

    // console.log(this.state.beerList)
    // return <div>.</div>

  {
    return this.state.beerList.map((e,i) =>
      {
        return (
          <div key={e.id}>
            {console.log(e["image_url"])};
            <img src={e.img_url} alt=""/>
            <p>
              {e.name}
            </p>
          </div>
        )
      }
    ); //map
  }
}

export default GridBox;