const express = require('express');
const {json} = require('body-parser');
const app = express();
const port = 3001;

const {
  getBeers,
  addBeer,
  editBeer,
  getFaves,
  addToFaves,
  deleteBeer,
  searchAllBeers
} = require('./controller')

app.use(json());

app.get('/api/beers', getBeers);
app.get('/api/beers/search', searchAllBeers);//user-supplied string of terms. This funtion will attempt to find any and all matches
app.post('/api/beers', addBeer);
app.put('/api/beers/:id', editBeer);

app.get('/api/faves', getFaves);
app.post('/api/faves', addToFaves)
app.delete('/api/beers/:id', deleteBeer);

app.listen(port, () => console.log( `Listening for requests on port ${port}` ));