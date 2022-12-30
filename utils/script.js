function metodeKNN(dataTes, dataUji) {
  const dataPenghasilan = [];
  const dataAset = [];
  const dataPengeluaran = [];
  const dataSm = [];
  const dataLearning = [];

  for (const item of dataTes) {
    dataPenghasilan.push(item['penghasilan']);
    dataAset.push(item['aset']);
    dataPengeluaran.push(item['pengeluaran']);
    dataSm.push(item['statusMasyarakat']);
  }

  const x1 = dataUji['penghasilan'];
  const x2 = dataUji['aset'];
  const x3 = dataUji['pengeluaran'];

  for (const item of dataTes) {
    dataLearning.push([
      dataPenghasilan[item],
      dataAset[item],
      dataPengeluaran[item],
      Math.sqrt(
        Math.pow(dataPenghasilan[item] - x1, 2) +
          Math.pow(dataAset[item] - x2, 2) +
          Math.pow(dataPengeluaran[item] - x3, 2)
      ),
      dataSm[item]
    ]);
  }

  const hasilLearning = [...dataLearning];

  hasilLearning.sort(function (a, b) {
    return a[3] - b[3];
  });

  let miskin = 0;
  let sedang = 0;
  let kaya = 0;
  for (let i = 0; i < dataUji['jumlahK']; i++) {
    if (hasilLearning[i][4] == 'miskin') {
      miskin++;
    } else if (hasilLearning[i][4] == 'sedang') {
      sedang++;
    } else if (hasilLearning[i][4] == 'kaya') {
      kaya++;
    }
  }

  let hasil = '';
  let status = Math.floor(Math.random() * 2) + 1;

  if (miskin > sedang && miskin > kaya) {
    hasil = 'miskin';
  } else if (sedang > miskin && sedang > kaya) {
    hasil = 'sedang';
  } else if (kaya > miskin && kaya > sedang) {
    hasil = 'kaya';
  } else if (miskin == sedang) {
    if (status == 1) {
      hasil = 'miskin';
    } else {
      hasil = 'sedang';
    }
  } else if (sedang == kaya) {
    if (status == 1) {
      hasil = 'sedang';
    } else {
      hasil = 'kaya';
    }
  } else {
    if (status == 1) {
      hasil = 'miskin';
    } else {
      hasil = 'kaya';
    }
  }

  const dataHasil = {
    penghasilan: dataUji['penghasilan'],
    aset: dataUji['aset'],
    pengeluaran: dataUji['pengeluaran'],
    hasil: hasil
  };

  return dataHasil;
}

module.exports = metodeKNN;
