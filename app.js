const express = require('express');
const expressLayout = require('express-ejs-layouts');
require('./utils/db');
const Penduduk = require('./model/penduduk');
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

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Halaman About',
    layout: 'layouts/main-layouts'
  });
});

app.get('/dataTesting', async (req, res) => {
  const penduduk = await Penduduk.find();
  res.render('dataTesting', {
    title: 'Data Testing',
    layout: 'layouts/main-layouts',
    penduduk
  });
});

app.get('/dataTesting/:nama', async (req, res) => {
  const page = req.params.nama || 0;
  const jumlahDataPerhalaman = 10;
  const penduduk = await Penduduk.find()
    .skip(page * jumlahDataPerhalaman)
    .limit(jumlahDataPerhalaman);
  res.render('dataTesting', {
    title: 'Data Testing',
    layout: 'layouts/main-layouts',
    penduduk
  });
});

app.get('/add_penduduk', async (req, res) => {
  res.render('addPenduduk', {
    title: 'Data Testing',
    layout: 'addPenduduk.ejs'
  });
});

app.listen(port, () => {
  console.log(`Aplikasi E-Goverment | Listen at http://localhost:${port}`);
});
