import React, {Component} from 'react';
import './MoreInfoBox.css';

const MoreInfoBox = props =>
{
  //destructure variables from beer object
  const {name, description, abv, ibu} = props.beerInfo;
  //Some of the taglines have a period at the end. Remove that.
  const tagline = props.beerInfo.tagline.replace(/\./, '');
  return(
    <div className="more-info-popup">
      <p className="popup-info-title">{name}</p>
      <p className="popup-info">"{tagline}"</p>
      <p className="popup-info">{description}</p>
      <p className="popup-info">ABV:  {abv}%</p>
      <p className="popup-info">IBUs: {ibu}</p>
    </div>
  );
}

export default MoreInfoBox;