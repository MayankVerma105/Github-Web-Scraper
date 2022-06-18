let url = 'https://github.com/topics';
// const { html } = require("cheerio/lib/api/manipulation");
const request = require("request");
const cheerio = require("cheerio");
const getRepoPageHtml = require("./repoPage");
request(url, cb);
function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else if (response.statusCode == 404) {
        console.log("Page not Found");
    } else {
        // console.log(html)
        getTopicLinks(html);
    }
}
function getTopicLinks(html) {
    let $ = cheerio.load(html);
    let linkElem = $(".no-underline.d-flex.flex-column.flex-justify-center");
    for (let i = 0; i < linkElem.length; i++){
        let href = $(linkElem[i]).attr("href");
        let topic = href.split("/").pop();
        // console.log(href);
        let fullLink = `https://github.com/${href}`;
        getRepoPageHtml(fullLink, topic);
    }
}
