const axios = require('axios');

var beers = [];
var faves = [
  {
    "id": 0,
    "name": "B4FT",
    "tagline": "Bourbon Barrel Banana Bochet French Toast",
    "description": "A dark, smokey, and sweet bochet fermented with toasted honey and french toast spices. Aged in bourbon barrels.",
    "abv": 10.5,
    "ibu": 5,
    "image_url": "https://www.quickanddirtytips.com/sites/default/files/images/4706/bee.jpg"
  }
];
var numBeers = 0;
var pages =5;

axios
  .get(`https://api.punkapi.com/v2/beers?per_page=80`)
  .then((response) => { pushTwentyFiveBeers(response.data);})
  .catch(err => console.log(err));

const getBeers = (req, res, next) => 
{
  res.status(200).send(beers);
}

const pushTwentyFiveBeers = (responseData) =>
{
  //requires (response.data) to function
  for(let i=0; i<responseData.length; i++)
    {
      let {id, name, tagline, description, image_url, abv, ibu} = responseData[i];
      beers.push( {id, name, tagline, description, image_url, abv, ibu} );
      numBeers++;
      // console.log(`Beer #${numBeers} - ${responseData[i].name} added to list`);
    }
}

const addBeer = (req, res, next) => 
{
  const reqID = Number(req.body.id);
  // console.log(reqID);
  // console.log(beers[reqID-2]);// -2 because the Punk database is seeded at 1
  if(beers.find( x => x["id"] === reqID ))
  {
    //found an entry with an id number identical to the requested id
    //content is rejected
    res.status(409).send(`Internal conflict. Content with id ${req.body.id} already exists`)
  }
  else
  {
    beers.push(req.body);
    res.status(200).send(beers);
  }
}

const editBeer = (req, res, next) =>
{
  const requestedIndex = Number(req.params.id);
  const newNote = req.body; //TODO: Change this to something more useful
  let element = beers.map( (i) =>  i.id).indexOf(requestedIndex);
  console.log(element);
  beers[element].note = newNote.note;
  res.status(200).send(beers);
}

//FAVORITES REQUESTS

const getFaves = (req, res, next) =>
{
  res.status(200).send(faves);
}

const addToFaves = (req, res, next) =>
{
  const reqID = Number(req.body.id);
  if(faves.find( x => x["id"] === reqID ))
  {
    //content is rejected
    res.status(409).send(`Internal conflict. Content with id ${req.body.id} already exists`)
  }
  else
  {
    faves.push(req.body);
    res.status(200).send(faves);
  }
}

//TODO: Change delete to only affect favorites. There's no reason to delete from the main list
const deleteBeer = (req, res, next) =>
{
  console.log("DELIT!");
  const newBeers = beers.filter( (i) => i.id !== Number(req.params.id));
  beers = newBeers;
  res.status(200).send(beers);
}

//MANIPULATION OF CURRENT POOL

const searchAllBeers = (req, res, next) =>
{
  let {terms} = req.query;
  console.log("SEARCHALLBEERS", terms);
  console.log( beers[1].description.includes(terms) );
  let returnValue = beers.filter( e => 
  { 
    return (e.name.includes(terms) ||
    e.tagline.includes(terms) ||
    e.description.includes(terms))
  })
  res.status(200).send(returnValue);
}

module.exports = 
{
  getBeers,
  addBeer,
  editBeer,
  getFaves,
  addToFaves,
  deleteBeer,
  searchAllBeers
};