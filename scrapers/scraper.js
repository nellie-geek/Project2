var axios = require('axios');
var cheerio = require('cheerio');
var fs = require('fs');
var Nightmare = require('nightmare');
var nightmare = Nightmare({
    show: true
})
var urlHolder = [];


nightmare.goto("https://www.baynews9.com/fl/tampa/search#%22florida%20man%22/1/score%20desc")
    .wait(3000)
    .evaluate(function () {
        var URLs = []
        var urlArr = document.querySelectorAll('.hit')
        for (var i = 0; i < urlArr.length; i++) {
            URLs.push(urlArr[i].querySelector('a').href);
        }
        return URLs;
    }).end().then(function (response) {
        console.log(response);
        for (var i = 0; i < array.length; i++) {
            urlHolder.push(response[i])
        }
    })

nightmare.goto(urlHolder[0])
    .wait(3000)
    .evaluate(function() {
        
    })
