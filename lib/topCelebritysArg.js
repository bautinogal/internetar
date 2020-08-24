const puppeteer = require('puppeteer');

const getTopCelebritys = () => {
    return new Promise((resolve, reject) => {
        var page;
        var browser;
        puppeteer.launch({ headless: true })
            .then((b) => {
                browser = b;
                return browser.newPage()
            })
            .then((p) => {
                page = p;
                return page.goto('https://www.socialbakers.com/statistics/facebook/pages/total/argentina/celebrities', { waitUntil: 'networkidle2' })
            })
            .then(data => page.evaluate(() => {
                var result = [];
                document
                    .getElementsByClassName("three-list top-fans-stats")[0]
                    .childNodes
                    .forEach(element => {
                        if (element.tagName == "DIV") {
                            var person = {};

                            person.nombre = element
                                .getElementsByTagName('a')[0]
                                .getElementsByTagName('h3')[0]
                                .getElementsByTagName('span')[0]
                                .innerHTML
                                .replaceAll('\t', '')
                                .replaceAll('\n', '');

                            person.seguidores = element
                                .getElementsByTagName('strong')[0]
                                .innerHTML
                                .replaceAll('&nbsp;', '');

                            console.log("new person: " + JSON.stringify(person));
                            result.push(person);
                        }
                    });
                console.log("Result: " + JSON.stringify(result));
                return result;
            }))
            .then((topCelebritys) => {
                //Object.entries(topCelebritys).forEach(([key, val]) => console.log(key, val.innerHTML));
                console.log(topCelebritys);
                //browser.close();
                resolve(topCelebritys);
            })
            .catch((err) => {
                console.log(err);
                //browser.close();
                reject(err);
            });

    });
};

module.exports = { getTopCelebritys }