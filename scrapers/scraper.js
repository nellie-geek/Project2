var axios = require('axios');
var cheerio = require('cheerio');
var fs = require('fs');
var vo = require('vo');
var Nightmare = require('nightmare');
var nightmare = Nightmare({
    show: true
});

// *Scraper for creating JSON objects from floridaman.com articles*
// **Because nightmare is promised based it can't be run in a for loop as is, 
//      this is because the promise isn't complete by the time it has to make another promise.
//      To get around this and force the for loop to wait on the promise to finish before continuing the for loop we use VO.
//      VO forces the next Nightmare to hold off (yield) running in the next for loop runthough until we receive the previous promise.
//      Once the entire for loop has finished the function yields ending Nightmare until the last promise has been received.** 
var mainFMScrape = function* (url) {
    var jsonArr = [];
    var example = [];
    for (var i = 0; i < url.length; i++) {
        var scraping = yield nightmare.goto(url[i])
            .wait(1700)
            .evaluate(function () {
                var imgEl = document.querySelectorAll(".g1-frame-inner");
                var image
                if (!imgEl[0].querySelector(".lazyloaded")) {
                    image = '';
                } else {
                    image = imgEl[0].querySelector(".lazyloaded").getAttribute("data-src")
                }
                var p = document.querySelectorAll(".entry-content");
                var p2;
                if (p[0].querySelector("p:nth-child(2)") === null) {
                    p2 = "";
                } else {
                    p2 = p[0].querySelector("p:nth-child(2)").innerText;
                };
                var urlEl;
                if (!p[0].querySelector("a")) {
                    urlEl = "url[i]";
                } else {
                    urlEl = p[0].querySelector("a").href;
                }
                var obj = {
                    headline: document.querySelector("h1").innerHTML,
                    image: image,
                    p1: p[0].querySelector("p").innerText,
                    p2: p2,
                    url: urlEl
                };
                return obj;
            }).then(function (response) {
                // ***This is where we push JSON into an array to prep it for POST (then eventual AJAX calls)***
                jsonArr.push(response);
                example.push(response.headline);
            });
    };
    console.log(example);
    yield nightmare.end();
    return jsonArr;
};

// *Scraper for gathering floridaman.com article urls*
// **This scraper can pull 327 URLs to feed into the mail scraper above to make 327 JSON objects. 
//      just as above VO is used to manage promises**  
var FMurlGrabber = function* () {
    var urlHolder = [];
    for (let i = 1; i < 13; i++) {
        if (i === 1) {
            var url = "https://floridaman.com/"
        } else {
            var url = "https://floridaman.com/page/" + i
        }
        var scraper = yield nightmare.goto(url)
            .wait(1000)
            .evaluate(function () {
                var scrapedUrls = []
                var elArr = document.querySelectorAll('.entry-title')
                if (i === 1) {
                    for (var i = 0; i < elArr.length; i++) {
                        scrapedUrls.push(elArr[i].querySelector('a').href);
                    }
                } else {
                    for (var i = 3; i < elArr.length; i++) {
                        scrapedUrls.push(elArr[i].querySelector('a').href);
                    }
                }
                return scrapedUrls;
            }).then(function (response) {
                for (let i = 0; i < response.length; i++) {
                    urlHolder.push(response[i])
                }
            })
    }
    console.log(urlHolder)
    yield vo(mainFMScrape)(urlHolder)
}

vo(FMurlGrabber)()

// *wfla search scraper PROBABLY NOT USING!!!*
// nightmare.goto("https://www.baynews9.com/fl/tampa/search#%22florida%20man%22/1/score%20desc")
//     .wait(3000)
//     .evaluate(function () {
//         var URLs = []
//         var urlArr = document.querySelectorAll('.hit')
//         for (var i = 0; i < urlArr.length; i++) {
//             URLs.push(urlArr[i].querySelector('a').href);
//         }
//         return URLs;
//     }).end().then(function (response) {
//         console.log(response);
//         for (var i = 0; i < array.length; i++) {
//             urlHolder.push(response[i])
//         }
//     })
// wfla article scraper
// nightmare.goto(urlHolder[0])
//     .wait(3000)
//     .evaluate(function () {})