const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const parse = async () => 
{
    //function to get completed cheerio object from the given url
    const getHTML = async (url) =>
    {
        const { data } = await axios.get(url);
        return cheerio.load(data);
    }

    const $ = await getHTML('https://uaserials.pro/cartoons/');

    // console.log($.html());
    //to get the number of existing pages
     const pageNumber = +$('.navigation  :last-child').text();
     
    //  console.log(pageNumber);

    //loop to get necessary elements
    for(let i = 1; i <= pageNumber; i++)
    {
        const selector = await getHTML(`https://uaserials.pro/cartoons/page/${i}/`);
        
        selector('.short-item').each((i, element) => 
        {
            const serialTitle = selector(element).find('div.th-title-oname').text();
            const serialLink = selector(element).find('a').attr('href');

            fs.appendFileSync('./data.txt', `${serialTitle}; ${serialLink}\n`);
        });
    }


};

parse();