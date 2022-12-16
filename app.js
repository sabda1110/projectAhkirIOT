const express = require('express');
const expressLayout = require('express-ejs-layouts');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(expressLayout);
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Halaman Awal Bro',
    layout: 'layouts/main-layouts'
  });
});

app.listen(port, () => {
  console.log(`Aplikasi E-Goverment | Listen at http://localhost:${port}`);
});
