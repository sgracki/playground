var request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');
const SECRETS = require('./secrets');

request({
    url: `https://docs.google.com/spreadsheets/d/${SECRETS.sheetId}`
}, (error, response, body) => {
    error ? console.log(error) : handleBody(body);
})

function handleBody(b) {
    fillCells(b)
    .then(
        (data) => {
            fs.writeFile('body.json', JSON.stringify(data));
        }
    )
    .catch(
        (e) => console.error(e)
    )
}

function fillCells(body, headers) {
    let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', l = 0, table = {}, $ = cheerio.load(body);
    return new Promise((resolve, reject) => {
        var headerLength = $('table > tbody > tr').each((i, elem) => {
            for(let j = 0; j < letters.length; j++) {
                table[`${letters[j]}${i+1}`] = $($(elem).find('td').get(j)).html();
            }
        })
        resolve(table);
    })
}