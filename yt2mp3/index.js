'use strict';

let Scrap = require('./scrap');
let PID = `` // playlist id here
let scrap = new Scrap(PID);

scrap.vidsFromPlaylist()
.then(
    (results) => {
        // handle
    }
)
.catch(
    (e) => console.error(e)
);