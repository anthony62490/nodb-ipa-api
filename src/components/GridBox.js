import React, {Component} from 'react';
// import axios from 'axios';
import './GridBox.css';
import MoreInfoBox from './MoreInfoBox';

class GridBox extends Component
{
  constructor(props)
  {
    super(props);
    this.state =
    {
      displayMoreInfo: false,
      id: null
    }

    this.handleMouseIn = this.handleMouseIn.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  handleMouseIn(id)
  {
    this.setState({displayMoreInfo: true, id});
  }

  handleMouseOut()
  {

    this.setState({displayMoreInfo: false, id: null});
  }

  render()
  {
    let moreInfoMaybe;

    return this.props.beersToDisplay.map((e,i) =>
      {
        if(this.state.displayMoreInfo && this.state.id === e.id)
          moreInfoMaybe = <MoreInfoBox beerInfo={e}/>;
        else 
          moreInfoMaybe = null;

        return (
          <div className="beer-token" key={e.id}>
            {/* {console.log(e["image_url"])} */}
            {moreInfoMaybe}
            <img className="beer-large" src={e.image_url} alt=""/>
            <p>{e.name}</p>
            <div className="add-to-favorites" onMouseEnter={() => this.handleMouseIn(e.id)} onMouseLeave={() => this.handleMouseOut()} onClick={() => this.props.addToFavesListFn(e.id)}>+</div>

          </div>
        )
      }
    ); //map
  }
}

export default GridBox;