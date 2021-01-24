const puppeteer = require ('puppeteer');
const fs = require('fs');

var methods = {
    scrape: function() {
        //initiating Puppeteer
        puppeteer.launch ()
            .then (async browser => {

                //opening a new page and navigating to Reddit
                const page = await browser.newPage ();
                await page.goto ('https://tarkov-market.com');
                await page.waitForSelector('table');
                //manipulating the page's content
                let data = await page.evaluate (() => {
                    let rowList = [];
                    let rows = document.querySelectorAll('table tr');
                    rows.forEach(row => {
                        let record = {};
                        const tdList = Array.from(row.querySelectorAll('td'), column => column.innerText);
                        record.picture = tdList[0];
                        record.name = tdList[1];
                        record.avg = tdList[2];
                        record.dchange = tdList[3];
                        record.wchange = tdList[4];
                        if (tdList.length >= 4) {
                        rowList.push(record);
                    }
                });
                return rowList;
                });
                fs.writeFile('./marketdata.json', JSON.stringify(data), err => {
                if (err) throw err;
                console.log("Done writing");
            });
            console.log(data);
            await browser.close ();
            })
            //handling any errors
            .catch (function (err) {
                console.error (err);
            });
        }
};

module.exports = methods;