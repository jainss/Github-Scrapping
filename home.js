const url = "https://github.com/topics";
const cheerio = require('cheerio');
const request = require('request');
const getrepocontent = require('./repopage');

request(url, cb);
function cb(error, response, html) {
    if (error) {
        console.log(error);
    } else {
        extractlink(html);
    }
}

function extractlink(html) {
    let $ = cheerio.load(html);
    let anchorElem = $('.topic-box.position-relative.hover-grow.height-full.text-center.border.color-border-secondary.rounded.color-bg-primary.p-5>a');
    for (let i = 0; i < anchorElem.length; i++) {
        let halflink = $(anchorElem[i]).attr('href');
        let topic = halflink.split('/');
        let fullLink = url + "/" + topic[2];
        // console.log(fullLink);
        getrepocontent(fullLink, topic[2]);
    }
}
