var axios = require('axios');
var cheerio = require('cheerio');
var fs = require('fs');
var vo = require('vo');
var Nightmare = require('nightmare');
var nightmare = Nightmare({
    show: true
})
var urlHolder = [];

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


// *Scraper for creating JSON objects from floridaman.com articles*
// **Because nightmare is promised based it can't be run in a for loop as is, 
//      this is because the promise isn't complete by the time it has to make another promise.
//      To get around this and force the for loop to wait on the promise to finish before continuing the for loop we use VO.
//      VO forces the next Nightmare to hold off (yield) running in the next for loop runthough until we receive the previous promise.
//      Once the entire for loop has finished the function yields ending Nightmare until the last promise has been received.** 
var run = function* () {
    var jsonArr = [];
    var example = []
    for (var i = 0; i < 5; i++) {
        var scraping = yield nightmare.goto(urlHolder[i])
            .wait(2000)
            .evaluate(function () {
                var img = document.querySelectorAll(".g1-frame-inner")
                var p = document.querySelectorAll(".entry-content")
                var obj = {
                    headline: document.querySelector("h1").innerHTML,
                    image: img[0].querySelector("img").getAttribute("data-src"),
                    p1: p[0].querySelector("p").innerText,
                    p2: p[0].querySelector("p:nth-child(2)").innerText,
                    url: pHold[0].querySelector("a").href
                }
                return obj;
            }).then(function (response) {
                // ***This is where we push JSON into an array to prep it for POST (then eventual AJAX calls)***
                jsonArr.push(response)
                example.push(response.headline)
            })
    }
    console.log(example)
    yield nightmare.end()
    return jsonArr;
}



// *Scraper for gathering floridaman.com article urls*
// **Currently only runs for the main page but I will be adding VO functionality to be able to cycle through as many pages as we want.**
nightmare.goto("https://floridaman.com/")
    .wait(3000)
    .evaluate(function () {
        var urls = []
        var arr = document.querySelectorAll('.entry-title')
        for (var i = 0; i < arr.length; i++) {
            urls.push(arr[i].querySelector('a').href);
        }
        return urls;
    }).then(function (response) {
        urlHolder = response
        vo(run)()
    })