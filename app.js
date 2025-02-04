const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      // console.log('Beers from the database: ', beersFromApi);

      const data = { beersArr: beersFromApi };
      res.render('beers', data);
    })
    .catch(error => console.error(error));
});

app.get('/random-beer', (req, res, next) => {
  punkAPI
    .getRandom()
    .then(beerArr => {
      const [beer] = beerArr;
      res.render('beer', beer);
    })
    .catch(err => console.error(err));
});

app.get('/beers/:id', (req, res, next) => {
  // res.send(req.params.id);

  punkAPI
    .getBeer(req.params.id)
    .then(beerArr => {
      const [beer] = beerArr;
      res.render('beer', beer);
    })
    .catch(err => console.error(err));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
