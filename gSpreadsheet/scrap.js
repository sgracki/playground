var request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');
const SECRETS = require('./secrets').module;

request({
    url: `https://docs.google.com/spreadsheets/d/${SECRETS.sheetId}`
}, (error, response, body) => {
    error ? console.log(error) : handleBody(body);
})

function handleBody(b) {
    var $ = cheerio.load(b);

    getHeaderRow(b)
        .then(
            (headers) => {
                return fillCells(b, headers)
            }
        )
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
    let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', l = 0;
    var table = {};
    var $ = cheerio.load(body);
    return new Promise((resolve, reject) => {
        var headerLength = $('table > tbody > tr').each((i, elem) => {
            for(let j = 0; j < letters.length; j++) {
                table[`${letters[j]}${i+1}`] = $($(elem).find('td').get(j)).html();
            }
        })
        
        resolve(table);
    })
}

function getRow(body, rowNum) {
    return new Promise((resolve, reject) => {

    })
}

function getHeaderRow(body) {
    return new Promise((resolve, reject) => {
        try {
            var $ = cheerio.load(body);
            headers = {};
            var headerLength = $('table > thead > tr > th').each((i, elem) => {
                i > 0 ? headers[`${$(elem).html()}1`] = $($('table > tbody > tr > td').get(i - 1)).text() : '';
            });
            resolve(headers);
        } catch(e) {
            reject(e);
        }
    })
}