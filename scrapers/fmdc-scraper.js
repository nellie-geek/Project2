var axios = require("axios");
var cheerio = require("cheerio");
var fs = require("fs");
var vo = require("vo");
var Nightmare = require("nightmare");
var nightmare = Nightmare({
    show: true
});


// module.exports = function () {
    var jsonArr = [];
    // *Scraper for gathering floridaman.com article urls*
    // **This scraper can pull 327 URLs to feed into the mail scraper above to make 327 JSON objects. 
    //      just as above VO is used to manage promises**  
    var FMurlGrabber = function* () {
        var urlHolder = [];
        for (let i = 1; i < 12; i++) {
            if (i === 1) {
                var url = "https://floridaman.com/"
            } else {
                var url = "https://floridaman.com/page/" + i
            }
            var scraper = yield nightmare.goto(url)
                .wait(1000)
                .evaluate(function () {
                    var scrapedUrls = []
                    var elArr = document.querySelectorAll(".entry-title")
                    if (i === 1) {
                        for (var i = 0; i < elArr.length; i++) {
                            scrapedUrls.push(elArr[i].querySelector("a").href);
                        }
                    } else {
                        for (var i = 3; i < elArr.length; i++) {
                            scrapedUrls.push(elArr[i].querySelector("a").href);
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
        vo(mainFMScrape)(urlHolder)
    }

    vo(FMurlGrabber)()

    // *Scraper for creating JSON objects from floridaman.com articles*
    // **Because nightmare is promised based it can"t be run in a for loop as is, 
    //      this is because the promise isn"t complete by the time it has to make another promise.
    //      To get around this and force the for loop to wait on the promise to finish before continuing the for loop we use VO.
    //      VO forces the next Nightmare to hold off (yield) running in the next for loop runthough until we receive the previous promise.
    //      Once the entire for loop has finished the function yields ending Nightmare until the last promise has been received.** 
    var mainFMScrape = function* (url) {

        var example = [];
        for (var i = 0; i < url.length; i++) {
            var scraping = yield nightmare.goto(url[i])
                .wait(2000)
                .evaluate(function () {
                    var imgEl = document.querySelectorAll(".g1-frame-inner");
                    var image
                    if (!imgEl[0].querySelector(".lazyloaded")) {
                        image = "";
                    } else {
                        image = imgEl[0].querySelector(".lazyloaded").getAttribute("data-src")
                    }
                    var bodyEl = document.querySelector(".entry-content");
                    var bodyArr = bodyEl.querySelectorAll("p");
                    var body = "";
                    for (var i = 0; i < bodyArr.length; i++) {
                        body += `${bodyArr[i].innerText}\n\n`;
                    }
                    var urlEl;
                    if (!bodyEl.querySelector("a")) {
                        urlEl = "url[i]";
                    } else {
                        urlEl = bodyEl.querySelector("a").href;
                    }
                    var tagsHeaderEl = document.querySelector(".entry-header-01");
                    var tagsElArr = tagsHeaderEl.querySelectorAll(".entry-category");
                    var tagsArr = [];
                    for (var i = 0; i < tagsElArr.length; i++) {
                        tagsArr.push(tagsElArr[i].querySelector("span").innerText);
                    }
                    var obj = {
                        headline: document.querySelector("h1").innerHTML,
                        pub_date: document.querySelector(".entry-date").innerHTML,
                        image_url: image,
                        body: body,
                        url: urlEl,
                        meta_tags: tagsArr,
                        upvote: 0,
                        downvote: 0
                    };
                    return obj;
                }).then(function (response) {
                    // ***This is where we push JSON into an array to prep it for POST (then eventual AJAX calls)***
                    jsonArr.push(response);
                    console.log(response)
                    example.push(response.headline);
                    append(JSON.stringify(response))
                });
        };
        console.log(example);
        yield nightmare.end();
        return jsonArr;
    };



// }

function append(data) {
    fs.appendFile("data/scraper-data.csv", data, "utf8", function (err) {
        if (err) {
          console.log("Some error occured - file either not saved or corrupted file saved.");
        } else{
          console.log("It's saved!");
        }
      });
}