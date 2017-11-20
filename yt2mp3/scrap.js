'use strict';

var request = require('request');
var SECRETS = require('./secrets');

module.exports = class Scrap {
    constructor(pid) {
        this.pid = pid;
    }

    vidsFromPlaylist() {
        return new Promise((resolve, reject) => {
            var output = [];
            request({
                url: `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${this.pid}&key=${SECRETS.key}`,
                json: true
            }, (error, response, body) => {
                if(error || !body.items) return reject(error);

                body.items.forEach((item, i) => {
                    output.push({
                        title: item.snippet.title,
                        id: item.snippet.resourceId.videoId,
                        dLink: `http://2conv.com/pl/downloads/mp3/yt_${item.snippet.resourceId.videoId}`
                    });
    
                    i == body.items.length - 1 ? resolve(output) : '';
                })
            });
        })
    }
}