const axios = require('axios');

var beers = [];
var faves = [];
var numBeers = 0;

//used to keep track of which page of data needs to be asked for next
var nextPage = 1;

//controls how many data objects are requested at a time. 
//36 is used because it is anti-prime (avoids lonely entries at the page end)
const beersPerPage = 36;

//defining generic "ask database for more data" function
const getMoreBeersFromServer = (req, res, next) => 
{
  axios
  .get(`https://api.punkapi.com/v2/beers?page=${nextPage}&per_page=${beersPerPage}`)
  .then((response) => 
  { 
    pushPageOfBeers(response.data);
    res.status(200).send(beers);
  })
  .catch(err => console.log(err));
  //after calling the database for more results, increment the page counter
  console.log("nextPage", nextPage)
  nextPage++;
}

//Make initial call to the server for a page of data
getMoreBeersFromServer();

/////////////
//FUNCTIONS


// Main API display and search functions
// MANIPULATION OF CURRENT POOL

const getBeers = (req, res, next) => 
{
  res.status(200).send(beers);
}

const pushPageOfBeers = (responseData) =>
{
  //requires (response.data) to function
  //used to streamline the data population task
  // Instead of pushing all of the data to the local server,
  // pPoB() pulls out specific key/values and adds them to a custom object
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
  //the filter converts everything to lowercase before searching
  //returns a match if any word in the name, tagline, or description is found
  let terms = req.query.terms.toLowerCase();
  let returnValue = beers.filter( e => 
  { 
    return (e.name.toLowerCase().includes(terms) ||
    e.tagline.toLowerCase().includes(terms) ||
    e.description.toLowerCase().includes(terms))
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
  // console.log('req.query = ',req.query)
  const newFave = Number(req.query.newFave);
  // console.log('newFave = ', newFave);
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
  console.log("D'ELIT!");
  const newBeers = faves.filter( (i) => i.id !== Number(req.params.id));
  faves = newBeers;
  res.status(200).send(faves);
}

module.exports = 
{
  getBeers,
  searchAllBeers,
  getMoreBeersFromServer,
  getFaves,
  addToFaves,
  addNoteToFave,
  deleteFromFaves
};