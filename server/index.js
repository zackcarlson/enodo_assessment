const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { createTable, selectInitData, selectFilteredData } = require('../database/index');

createTable();
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/filterData', function (req, res) {
  selectFilteredData(req, res);
});

app.get('/initialData', function (req, res) {
  selectInitData(res);
});

let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

