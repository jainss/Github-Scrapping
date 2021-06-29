const cheerio = require('cheerio');
const request = require('request');
const path = require('path');
const fs = require('fs');
const pdfkit = require('pdfkit');

function getissuepage(topic, reponame, url) {
    request(url, cb);
    function cb(error, response, html) {
        if (error) {
            console.log(error);
        }
        else {
            getissues(html, topic, reponame);
        }
    }
}

function getissues(html, topic, reponame) {
    let $ = cheerio.load(html);
    let extractissueslink = $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
    let arr = [];
    for (let i = 0; i < extractissueslink.length; i++) {
        let href = $(extractissueslink[i]).attr('href');
        arr.push(href);
        // console.log(href);
    }
    // console.log(topic, "  ", arr);
    let folderpath = path.join(__dirname, topic);
    if (fs.existsSync(folderpath) == false) {
        fs.mkdirSync(folderpath);
    }
    let filepath = path.join(folderpath, reponame + ".pdf");
    // console.log(filepath);
    let text = JSON.stringify(arr);
    let pdfDoc = new pdfkit;
    pdfDoc.pipe(fs.createWriteStream(filepath));
    pdfDoc.text(text);
    pdfDoc.end()
}

module.exports = getissuepage;