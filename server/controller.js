const axios = require('axios');

var beers = [];
var faves = [];
var numBeers = 0;

axios
  .get('https://api.punkapi.com/v2/beers')
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

//TODO: DELETE
const deleteBeer = (req, res, next) =>
{
  console.log("DELIT!");
  const newBeers = beers.filter( (i) => i.id !== Number(req.params.id));
  beers = newBeers;
  res.status(200).send(beers);
}

module.exports = 
{
  getBeers,
  addBeer,
  editBeer,
  deleteBeer
};