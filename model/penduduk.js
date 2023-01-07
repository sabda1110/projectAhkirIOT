const mongoose = require('mongoose');

// Membuat Schema
const Penduduk = mongoose.model('Penduduk', {
  penghasilan: {
    type: Number,
    required: true
  },
  aset: {
    type: Number,
    require: true
  },
  pengeluaran: {
    type: Number,
    require: true
  },
  statusMasyarakat: {
    type: String
  },
  kelurahan: {
    type: String,
    require: true
  }
});

module.exports = Penduduk;
