const cheerio = require('cheerio');
const req = require('tinyreq');
const fs = require('fs');

function scrape(url, data, cb) {
  req(url, (err, body) => {
    if (err) { return cb(err); }
    const $ = cheerio.load(body);
    const pageData = {};
    Object.keys(data).forEach((k) => {
      if (k === 'thumbnail') {
        pageData[k] = $(data[k]).attr('src');
      } else if (k === 'features') {
        pageData[k] = $(data[k]).attr('data-title');
      } else if (k === 'region_image') {
        pageData[k] = $(data[k]).attr('src');
      } else if (k === 'google_map') {
        pageData[k] = $(data[k]).attr('href').slice(2);
      } else {
        pageData[k] = $(data[k]).text();
      }
    });
    cb(null, pageData);
  });
}

(function () {
  for (let i = 0; i <= 0; i += 30) {
    const base = `https://www.wta.org/go-hiking/hikes?b_start:int=${i}`;
    req(base, (err, body) => {
      const $ = cheerio.load(body);
      const array = $('.listitem-title');
      const hikeList = [];
      for (let i = 0; i < array.length; i++) {
        hikeList.push(array[i].attribs.href);
      }
      for (const hike of hikeList) {
        scrape(hike, {
          features: '#hike-features div',
          region_image: '#hike-region > img',
          google_map: '.full-map',
          thumbnail: '.image-with-caption > img',
          region: '#hike-region span',
          current_rating: '.current-rating',
          name: '.documentFirstHeading',
          trail_description: '#hike-body-text p',
          driving_directions: '#driving-directions p',
          distance: '#distance span',
          latitude: '.latlong span:first-child',
          longitude: '.latlong span:nth-child(2)',
          elevation_gain: '#hike-stats div:nth-child(3) div:nth-child(2) span',
          highest_point: '#hike-stats div:nth-child(3) div:nth-child(3) span',
        }, (err, data) => {
          const insertHike = JSON.stringify(data)
          fs.appendFile('data.json', `${insertHike},`, 'utf-8');
          console.log(JSON.stringify(data));
        });
      }
    });
  }
}());
