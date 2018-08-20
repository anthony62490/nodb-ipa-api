const express = require('express');
const {json} = require('body-parser');
const app = express();
const port = 3001;

const {
  getBeers,
  searchAllBeers,
  getMoreBeersFromServer,
  getFaves,
  addToFaves,
  addNoteToFave,
  deleteFromFaves
} = require('./controller')

app.use(json());

//requests for searching and populating the backend info
app.get('/api/beers', getBeers);
app.get('/api/beers/more', getMoreBeersFromServer);
app.get('/api/beers/search', searchAllBeers);//user-supplied string of terms. This funtion will attempt to find any and all matches
//app.post('/api/beers', addBeer); //probably won't use this

//requests for editing the Favorites list and notes
app.get('/api/faves', getFaves);
app.post('/api/faves', addToFaves);
app.put('/api/beers', addNoteToFave);
app.delete('/api/faves/:id', deleteFromFaves);

app.listen(port, () => console.log( `Listening for requests on port ${port}` ));