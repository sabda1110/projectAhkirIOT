const express = require('express');
const expressLayout = require('express-ejs-layouts');
const metodeKNN = require('./utils/script');
require('./utils/db');
const Penduduk = require('./model/penduduk');
const { response } = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(expressLayout);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Halaman Awal Bro',
    layout: 'layouts/main-layouts'
  });
});

app.get('/dataTesting', async (req, res) => {
  const jumlahData = await Penduduk.countDocuments();
  const jumlahDataPerhalaman = 10;
  const jumlahHalaman = Math.ceil(jumlahData / jumlahDataPerhalaman);

  const page = req.query.page || 0;
  const penduduk = await Penduduk.find()
    .skip(page * jumlahDataPerhalaman)
    .limit(jumlahDataPerhalaman);
  res.render('dataTesting', {
    title: 'Data Testing',
    layout: 'layouts/main-layouts',
    penduduk,
    jumlahHalaman
  });
});

app.get('/add_penduduk', async (req, res) => {
  res.render('addPenduduk', {
    title: 'Data Testing',
    layout: 'addPenduduk.ejs'
  });
});

app.get('/admin', async (req, res) => {
  const jumlahMasyarakat = await Penduduk.find().count();
  const jumlahMiskin = await Penduduk.find({
    statusMasyarakat: 'miskin'
  }).count();
  const jumlahSedang = await Penduduk.find({
    statusMasyarakat: 'sedang'
  }).count();
  const jumlahKaya = await Penduduk.find({
    statusMasyarakat: 'kaya'
  }).count();
  res.render('admin', {
    layout: 'admin.ejs',
    jumlahMasyarakat,
    jumlahMiskin,
    jumlahKaya,
    jumlahSedang
  });
});

app.get('/login', (req, res) => {
  res.render('login', {
    layout: 'login.ejs'
  });
});

app.post('/dataTesting', async (req, res) => {
  const penduduk = await Penduduk.find();
  const dataHasil = metodeKNN(penduduk, req.body);
  console.log(dataHasil);

  // Penduduk.insertMany(req.body, (err, result) => {
  //   res.redirect('/dataTesting');
  // });
});

app.post('/loginData', (req, res) => {
  const data = req.body;
  if (data['email'] == 'admin@gmail.com' && data['password'] == 'admin') {
    res.redirect('/admin');
  } else {
    res.send('Password Salah');
  }
});

app.listen(port, () => {
  console.log(`Aplikasi E-Goverment | Listen at http://localhost:${port}`);
});
