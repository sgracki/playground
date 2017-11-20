'use strict';

let Scrap = require('./scrap');
let PID = `` // playlist id here
let foo = new Scrap(PID);

foo.vidsFromPlaylist()
.then(
    (results) => {
        // handle
    }
)
.catch(
    (e) => console.error(e)
);