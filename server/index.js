const express = require('express');
const {json} = require('body-parser');
const app = express();
const port = 3001;

const {
  getBeers,
  addBeer,
  editBeer,
  deleteBeer
} = require('./controller')

app.use(json());

app.get('/api/beers', getBeers);

app.post('/api/beers', addBeer);
app.put('/api/beers/:id', editBeer);
app.delete('/api/beers/:id', deleteBeer);

app.listen(port, () => console.log( `Listening for requests on port ${port}` ));