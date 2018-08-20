const axios = require('axios');

var beers = [];
var faves = [];
var numBeers = 0;
var pages =5;

axios
  .get(`https://api.punkapi.com/v2/beers?per_page=80`)
  .then((response) => { pushTwentyFiveBeers(response.data);})
  .catch(err => console.log(err));

// Main API display and search functions
// MANIPULATION OF CURRENT POOL

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

//FAVORITES REQUESTS

const getFaves = (req, res, next) =>
{
  res.status(200).send(faves);
}

const addToFaves = (req, res, next) => 
{
  console.log('req.query = ',req.query)
  const newFave = Number(req.query.newFave);
  console.log('newFave = ', newFave);
  // console.log(beers[reqID-2]);// -2 because the Punk database is seeded at 1
  if(faves.find( x => x["id"] === newFave ))
  {
    //found an entry with an id number identical to the requested id
    //content is rejected
    res.status(409).send(`Internal conflict. Content with id ${req.body.id} already exists`)
  }
  else
  {
    //entry does not already exist in faves. find information from the main array and send it back
    let newFaveIndex = beers.map((i) => i.id).indexOf(newFave);
    faves.push(beers[newFaveIndex]);
    console.log(faves.map(x=>x.name));
    res.status(200).send(faves);
  }
}

const addNoteToFave = (req, res, next) =>
{
  console.log(req.query.note);
  console.log(req.query.id);
  const requestedIndex = Number(req.query.id);
  const {note} = req.query;
  let element = beers.map( (i) =>  i.id).indexOf(requestedIndex);
  console.log(beers[element].name);
  beers[element].note = note;
  // res.status(200).send(faves);
  res.status(200).send(faves);
}

const deleteFromFaves = (req, res, next) =>
{
  console.log("DELIT!");
  const newBeers = faves.filter( (i) => i.id !== Number(req.params.id));
  beers = newBeers;
  res.status(200).send(faves);
}

module.exports = 
{
  getBeers,
  searchAllBeers,
  getFaves,
  addToFaves,
  addNoteToFave,
  deleteFromFaves
};