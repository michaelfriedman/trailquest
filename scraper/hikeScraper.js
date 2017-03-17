const cheerio = require('cheerio');
const req = require('tinyreq');

const scrape = (url, data) => new Promise((resolve, reject) => {
  req(url, (err, body) => {
    // if (!url) return reject(new Error('Missing URL'));
    // if (!data) return reject(new Error('Missing data'));
    // if (err) return reject(err);

    const $ = cheerio.load(body);
    const pageData = {};
    Object.keys(data).forEach((k) => {
      if (k === 'thumbnail') {
        pageData[k] = $(data[k]).attr('src');
      } else if (k === 'features') {
        const hikeFeatures = $('#hike-features').children();
        const featuresList = [];
        for (let i = 0; i < hikeFeatures.length - 1; i++) {
          featuresList.push(hikeFeatures[i].attribs['data-title']);
        }
        pageData[k] = featuresList;
      } else if (k === 'region_image') {
        pageData[k] = $(data[k]).attr('src');
      } else if (k === 'google_map') {
        pageData[k] = $(data[k]).attr('href');
      } else {
        pageData[k] = $(data[k]).text();
      }
    });
    return resolve(pageData);
  });
});

const scrapeHikes = hikeList => hikeList.map(hike => scrape(hike, {
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
  latitude: '.latitude',
  longitude: '.longitude',
  elevation_gain: '#hike-stats div:nth-child(3) div:nth-child(2) span',
  highest_point: '#hike-stats div:nth-child(3) div:nth-child(3) span',
}));

(() => {
  for (let i = 0; i <= 3360; i += 30) {
    const base = `https://www.wta.org/go-hiking/hikes?b_start:int=${i}`;
    req(base, (err, body) => {
      // if (err) console.error(`Error getting ${base}`);

      const $ = cheerio.load(body);
      const array = $('.listitem-title');
      const hikeList = [];

      for (let i = 0; i < array.length; i++) {
        hikeList.push(array[i].attribs.href);
      }

      const promises = scrapeHikes(hikeList);

      Promise.all(promises).then(hikeData => {
        // eslint-disable-next-line no-console
        console.log(...hikeData);
      });
    });
  }
})();
