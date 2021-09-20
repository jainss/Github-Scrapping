const cheerio = require('cheerio');
const request = require('request');
const getissuepage = require('./issues');

function getrepocontent(url, topic) {
    request(url, cb);
    function cb(error, response, html2) {
        if (error) {
            console.log(error);
        } else if (response.statusCode == 404) {
            console.log("Page Not Found");
        }
        else {
            getissuelink(html2, topic);
        }
    }
}
function getissuelink(html2, topic) {
    let $ = cheerio.load(html2);
    let anchorElem2 = $(".d-flex.flex-auto a[class='text-bold wb-break-word']");
    // console.log(anchorElem2.length);
    for (let i = 0; i < 8; i++) {
        let href = $(anchorElem2[i]).attr('href');
        let breaking = href.split('/');
        let reponame = breaking[1];
        let fullLink = "https://github.com" + href + "/issues";
        // console.log(topic);
        // console.log(reponame);
        // console.log(fullLink);
        getissuepage(topic, reponame, fullLink);
    }
}

module.exports = getrepocontent;
