const Utils = require("./utils");
const csv=require('csvtojson');
const linkstationsCSV='./data/linkstations.csv';
const pointsCSV='./data/points.csv';

/**
 * process
 * async function which reads the csv files, creates a scopes and then processes the scopes.
 */
async function process(){
    const stations = await csv().fromFile(linkstationsCSV);
    const points = await csv().fromFile(pointsCSV);
    const scopes=Utils.createScopes(stations,points);
    Utils.processScopes(scopes);
}

process();