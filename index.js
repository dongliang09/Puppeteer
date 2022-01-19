const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless:true})
    const page = await browser.newPage();
    await page.goto("https://quotes.toscrape.com");

    //get quote
    const grabQuotes = await page.evaluate(() => {
        const quotes = document.querySelectorAll(".quote");
        let quoteArr = [];
        quotes.forEach ((quoteTag) => {
            const quoteInfo = quoteTag.querySelector(".text");
            console.log(quoteInfo);
            quoteArr.push({
                quote:quoteInfo.innerText
            });
        });
        return quoteArr;
    })
    console.log(grabQuotes);

    //get quote tag 
    const grabTag = await page.evaluate(() => {
        const quoteTag = document.querySelectorAll('a[class="tag"]')
        let TagArr = [];
        quoteTag.forEach ((quoteTagInfo) => {
            const tagName = quoteTagInfo.innerText;
            TagArr.push({
                tag:tagName
            });
        });
        return TagArr;
    })
    console.log(grabTag);

    //get quote and author
    const grabQuotes = await page.evaluate(() => {
        const quotes = document.querySelectorAll(".quote");
        let quoteArr = [];
        quotes.forEach ((quoteTag) => {
            const quoteInfo = quoteTag.querySelectorAll(".text");
            const actualQuote = quoteInfo[0];
            const actualAuthor = quoteInfo[1];
            const authorName = actualAuthor.querySelector("small");
            console.log(quoteInfo);
            quoteArr.push({
                quote:actualQuote.innerText,
                author:authorName.innerText
            });
        });
        return quoteArr;
    })
    console.log(grabQuotes);

    await browser.close();
})();