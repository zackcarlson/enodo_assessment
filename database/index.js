const Promise = require('bluebird');
const XLSX = require('xlsx');
const sqlite3 = require('sqlite3').verbose();

// open the database
const db = new sqlite3.Database('./database/propertyListings.db', 
  sqlite3.OPEN_READWRITE, (err) => {
  if (err) console.error(err.message);
  else console.log('Connected to the database.');
});

const createTable = function() {
  return new Promise((resolve, reject) => resolve(db.run(`DROP TABLE IF EXISTS properties;`)))
    .then(() => {
      return new Promise((resolve, reject) => {
        const sql = `CREATE TABLE IF NOT EXISTS properties (id INTEGER PRIMARY KEY AUTOINCREMENT, address TEXT, latitude REAL, longitude REAL, zip INTEGER, recType TEXT, pin INTEGER, ovacls INTEGER, classDesc TEXT, currentLand INTEGER, currentBuilding INTEGER, currentTotal INTEGER, marketValue INTEGER, priorLand INTEGER, priorBuilding INTEGER, priorTotal INTEGER, ppriorLand INTEGER, ppriorBuilding INTEGER, ppriorTotal INTEGER, ppriorYear INTEGER, town INTEGER, volume INTEGER, loc TEXT, taxCode INTEGER, neighborhood INTEGER, houseNumber INTEGER, direction TEXT, street TEXT, suffix TEXT, apt TEXT, city TEXT, resType TEXT, bldgUse TEXT, aptDesc INTEGER, commUnits INTEGER, exteriorDesc TEXT, fullBath INTEGER, halfBath INTEGER, bsmtDesc TEXT, atticDesc TEXT, ac INTEGER, fireplace INTEGER, garDesc TEXT, age INTEGER, blgSQFT INTEGER, landSQFT INTEGER, bldgSF TEXT, unitsTotal TEXT, multiSale INTEGER, deedType INTEGER, saleDate TEXT, saleAmount INTEGER, appCnt INTEGER, appealA INTEGER, appealAStatus TEXT, appealAReason INTEGER, appealAPropAv INTEGER, appealACurrAv INTEGER, appealAResaleDate TEXT);`;
        db.run(sql, (err) => {
          if (err) {
            console.log('Table not created', err);
            reject(err);
          } else {
            console.log('Table successfully created');
            resolve();
          }
        });
      })
        .then(() => insertRows())
        .catch((err) => console.error(err));
    });
        
};

const processXLSX = function() {
  let workbook = XLSX.readFile('./data.xlsx');
  let sheetNameList = workbook.SheetNames;
  let data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);
  return data;
};

const insertRows = function() {
  return new Promise((resolve, reject) => {
    const rows = processXLSX();
    db.serialize(function() {
      for (let row of rows) {
        let address = row['Full Address'];
        let latitude = row['Latitude'];
        let longitude = row['Longitude'];
        let zip = row['Zip'];
        let recType = row['REC_TYPE'];
        let pin = row['PIN'];
        let ovacls = row['OVACLS'];
        let classDesc = row['CLASS_DESCRIPTION'];
        let currentLand = row['CURRENT_LAND'];
        let currentBuilding = row['CURRENT_BUILDING'];
        let currentTotal = row['CURRENT_TOTAL'];
        let marketValue = row['ESTIMATED_MARKET_VALUE'];
        let priorLand = row['PRIOR_LAND'];
        let priorBuilding = row['PRIOR_BUILDING'];
        let priorTotal = row['PRIOR_TOTAL'];
        let ppriorLand = row['PPRIOR_LAND'];
        let ppriorBuilding = row['PPRIOR_BUILDING'];
        let ppriorTotal = row['PPRIOR_TOTAL'];
        let ppriorYear = row['PPRIOR_YEAR'];
        let town = row['TOWN'];
        let volume = row['VOLUME'];
        let loc = row['LOC'];
        let taxCode = row['TAX_CODE'];
        let neighborhood = row['NEIGHBORHOOD'];
        let houseNumber = row['HOUSENO'];
        let direction = row['DIR'];
        let street = row['STREET'];
        let suffix = row['SUFFIX'];
        let apt = row['APT'];
        let city = row['CITY'];
        let resType = row['RES_TYPE'];
        let bldgUse = row['BLDG_USE'];
        let aptDesc = row['APT_DESC'];
        let commUnits = row['COMM_UNITS'];
        let exteriorDesc = row['EXT_DESC'];
        let fullBath = row['FULL_BATH'];
        let halfBath = row['HALF_BATH'];
        let bsmtDesc = row['BSMT_DESC'];
        let atticDesc = row['ATTIC_DESC'];
        let ac = row['AC'];
        let fireplace = row['FIREPLACE'];
        let garDesc = row['GAR_DESC'];
        let age = row['AGE'];
        let blgSQFT = row['BUILDING_SQ_FT'];
        let landSQFT = row['LAND_SQ_FT'];
        let bldgSF = row['BLDG_SF'];
        let unitsTotal = row['UNITS_TOT'];
        let multiSale = row['MULTI_SALE'];
        let deedType = row['DEED_TYPE'];
        let saleDate = row['SALE_DATE'];
        let saleAmount = row['SALE_AMOUNT'];
        let appCnt = row['APPCNT'];
        let appealA = row['APPEAL_A'];
        let appealAStatus = row['APPEAL_A_STATUS'];
        let appealAReason = row['APPEAL_A_REASON'];
        let appealAPropAv = row['APPEAL_A_PROPAV'];
        let appealACurrAv = row['APPEAL_A_CURRAV'];
        let appealAResaleDate = row['APPEAL_A_RESLTDATE'];

        resolve(db.run(`INSERT INTO properties (address, latitude, longitude, zip, recType, pin, ovacls, classDesc, currentLand, currentBuilding, currentTotal, marketValue, priorLand, priorBuilding, priorTotal, ppriorLand, ppriorBuilding, ppriorTotal, ppriorYear, town, volume, loc, taxCode, neighborhood, houseNumber, direction, street, suffix, apt, city, resType, bldgUse, aptDesc, commUnits, exteriorDesc, fullBath, halfBath, bsmtDesc, atticDesc, ac, fireplace, garDesc, age, blgSQFT, landSQFT, bldgSF, unitsTotal, multiSale, deedType, saleDate, saleAmount, appCnt, appealA, appealAStatus, appealAReason, appealAPropAv, appealACurrAv, appealAResaleDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            address, latitude, longitude, zip, recType, pin, ovacls, classDesc, currentLand,
            currentBuilding, currentTotal, marketValue, priorLand, priorBuilding, priorTotal,
            ppriorLand, ppriorBuilding, ppriorTotal, ppriorYear, town, volume, loc, taxCode,
            neighborhood, houseNumber, direction, street, suffix, apt, city, resType, bldgUse,
            aptDesc, commUnits, exteriorDesc, fullBath, halfBath, bsmtDesc, atticDesc, ac,
            fireplace, garDesc, age, blgSQFT, landSQFT, bldgSF, unitsTotal, multiSale, deedType,
            saleDate, saleAmount, appCnt, appealA, appealAStatus, appealAReason, appealAPropAv,
            appealACurrAv, appealAResaleDate
          ]));
      }
      console.log('Rows inserted into table');
    });
  });
};

const selectInitData = function(res) {
  return new Promise((resolve, reject) => {
    var result = [];
    db.serialize(function() {
      db.all(`SELECT address, latitude, longitude, marketValue FROM properties;`, function(err, rows) {
        rows.forEach(function(row) {
          result.push({
            'address': row.address, 
            'latitude': row.latitude,
            'longitude': row.longitude,
            'marketValue': row.marketValue
          });
        });
        resolve(result);
      });
    });
  })
  .then((data) => {
    res.json(data);
  });
};

const selectFilteredData = function(req, res) {
  let { min, max, oneStory } = req.body;
  console.log(oneStory);
  if (oneStory) oneStory = 'One Story';
  else oneStory = '';

  min = min || '0';
  max = max || '3300000';
  return new Promise((resolve, reject) => {
    var result = [];
    db.serialize(function() {
      db.all(`SELECT address, latitude, longitude, marketValue FROM properties WHERE marketValue BETWEEN ${Number(min)} AND ${Number(max)};`, function(err, rows) {
        rows.forEach(function(row) {
          result.push({
            'address': row.address, 
            'latitude': row.latitude,
            'longitude': row.longitude,
            'marketValue': row.marketValue
          });
        });
        resolve(result);
      });
    });
  })
  .then((data) => {
    res.json(data);
  });
};

module.exports = {
  createTable,
  processXLSX,
  insertRows, 
  selectInitData,
  selectFilteredData
};