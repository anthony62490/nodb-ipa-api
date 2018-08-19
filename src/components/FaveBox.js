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

  render()

    // console.log(this.state.beerList)
    // return <div>.</div>

  {
    return this.state.beerList.map((e,i) =>
      {
        return (
          <div className="beer-token-small" key={e.id}>
            {/* {console.log(e["image_url"])} */}
            <img className="beer-small" src={e.image_url} alt=""/>
          </div>
        )
      }
    ); //map
  }
}

export default FaveBox;