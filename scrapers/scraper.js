var axios = require('axios');
var cheerio = require('cheerio');
var fs = require('fs');
var Nightmare = require('nightmare');
var nightmare = Nightmare({
    show: true
})
var urlHolder = ["https://floridaman.com/threatens-to-destroy-everyone-with-army-of-turtles/", 
    "https://floridaman.com/mayor-smokes-crack-eats-meth-practices-medicine-without-license-fires-on-swat-team/",
    "https://floridaman.com/florida-man-shows-up-to-hospital-naked-says-hes-ready-to-go/"];
    var k = 0;

// wfla search scraper
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

// **Scraper for creating JSON objects from floridaman.com articles
urlHolder.foreach()
        nightmare.goto(url[k])
            .wait(3000)
            .evaluate(function () {
                var imgHold = document.querySelectorAll(".g1-frame-inner")
                var pHold = document.querySelectorAll(".entry-content")
                var obj = {
                    headline: document.querySelector("h1").innerHTML,
                    image: imgHold[0].querySelector("img").getAttribute("data-src"),
                    p1: pHold[0].querySelector("p").innerText,
                    p2: pHold[0].querySelector("p:nth-child(2)").innerText,
                    url: pHold[0].querySelector("a").href
                }
                return obj;
            }).end().then(function (response) {
                console.log(response);
                console.log(url.length)
                if (k < urlHolder.length) {
                    k++
                    console.log(k)
                    restart()
                }
            })

// **Scraper for gathering floridaman.com article urls
// nightmare.goto("https://floridaman.com/")
//     .wait(3000)
//     .evaluate(function () {
//         var urls = []
//         // var urlArr = document.querySelectorAll('.g1-collection-item')
//         var arr = document.querySelectorAll('.entry-title')
//         for (var i = 0; i < arr.length; i++) {

//             urls.push(arr[i].querySelector('a').href);
//         }
//         return urls;

//     }).end().then(function (response) {
//         urlHolder = response
//        mainFMScraper(urlHolder)
//     })


