      _______        _ _  ____                  _   
     |__   __|      (_) |/ __ \                | |  
        | |_ __ __ _ _| | |  | |_   _  ___  ___| |_ 
        | | '__/ _` | | | |  | | | | |/ _ \/ __| __|
        | | | | (_| | | | |__| | |_| |  __/\__ \ |_ 
        |_|_|  \__,_|_|_|\___\_\\__,_|\___||___/\__|
                                                
                                                


# TrailQuest
## Created by: Michael Friedman

[![Stories in Ready](https://badge.waffle.io/michaelfriedman/capstone-g40.svg?label=ready&title=Ready)](http://waffle.io/michaelfriedman/capstone-g40)

## Summary

TrailQuest is an app for finding cool trails to hike (currently in Washington State only). Finding good information about local trails can be tedious, so TrailQuest makes it easy. The app allows users to search for any trail in Washington by region and by description. Registered users can review trails that they have had the opportunity to hike, and share their insights with other users.

The community element to the application allows for users to organize group hikes that other users can register for.

## Screenshots

![Mobile Gif](/readme/trailquest-gif-2.gif)
![Mobile Landing](http://res.cloudinary.com/dk5dqve4y/image/upload/c_scale,w_300/v1492127812/landing-snap_lovqwp.png)
![Mobile Landing Below Fold](http://res.cloudinary.com/dk5dqve4y/image/upload/c_scale,w_300/v1492127910/mobile-below-fold-landing_gpviwg.png)
![Mobile Landing Open Modal](http://res.cloudinary.com/dk5dqve4y/image/upload/c_scale,w_300/v1492127956/mobile-landing-modal_toadg3.png)
![Mobile Landing Open Modal Below Fold](http://res.cloudinary.com/dk5dqve4y/image/upload/c_scale,w_300/v1492128007/mobile-landing-open-model-below-fold_xzeaua.png)
![Mobile Search Menu Open](http://res.cloudinary.com/dk5dqve4y/image/upload/c_scale,w_300/v1492128048/mobile-search-menu-open_yln6qp.png)
![Mobile Registration](http://res.cloudinary.com/dk5dqve4y/image/upload/c_scale,w_300/v1492128082/mobile-registration_sbhvub.png)
![Mobile Login](http://res.cloudinary.com/dk5dqve4y/image/upload/c_scale,w_300/v1492128116/mobile-login_o1wt4s.png)
![Mobile Review](http://res.cloudinary.com/dk5dqve4y/image/upload/c_scale,w_300/v1492128157/mobile-trail-review_ylqkzy.png)
![Mobile Review Submitted](http://res.cloudinary.com/dk5dqve4y/image/upload/c_scale,w_300/v1492128191/mobile-review-submitted_rumqrj.png)
![Mobile Events Page](http://res.cloudinary.com/dk5dqve4y/image/upload/c_scale,w_300/v1492128418/mobile-events_yjnmj4.png)
![Mobile Events Detial](http://res.cloudinary.com/dk5dqve4y/image/upload/c_scale,w_300/v1492128588/mobile-event-details_k6qf7a.png)
![Mobile Events Register](http://res.cloudinary.com/dk5dqve4y/image/upload/c_scale,w_300/v1492128738/events-details-below-fold-register_navswu.png)
![Mobile User Profile](http://res.cloudinary.com/dk5dqve4y/image/upload/c_scale,w_300/v1492128877/mobile-user-profile_uqprce.png)
![Mobile User Registered Events](http://res.cloudinary.com/dk5dqve4y/image/upload/c_scale,w_300/v1492128956/mobile-users-registered-events_alqcrd.png)
![Mobile Users Reviews](http://res.cloudinary.com/dk5dqve4y/image/upload/c_scale,w_300/v1492129060/mobile-users-reviews_aigna9.png)
![Mobile Search Regions](http://res.cloudinary.com/dk5dqve4y/image/upload/c_scale,w_300/v1492129173/mobile-search-region_pazwd1.png)

## Data Scraper & TrailQuest API

There was not enough robust data available on Washington State trails available in a public API for me to build this project. All of the data made available in this application was gathered using a custom web scraping program that I wrote in Node using an NPM package called Cheerio.

The scraping script 'hikeScraper.js' can be found in the 'scraper' directory of this repository. The script parses the Washington State Trails Association website where it gathers the URLs for every single hike in their database. After gathering all of the web addresses for each individual hiking trail, it then loads the HTML from every individual URL and creates a trail object for each page, where the key-values are either textual information or various data attributes from DOM nodes which are displayed on the pages which have been parsed.

## Deployment

This application was deployed using Heroku with the create-react-app build-pack. The `create-react-app` buildpack can be found here: [create-react-app buildpack](https://github.com/mars/create-react-app-buildpack.git). The database is hosted using the Heroku PostgreSQL addon.

## Technology Stack

Front End

* React
* react-router v3

Server

* Node
* Express

Database & Server Queries

* Knex
* PostgreSQL

## APIs

* Google Maps API
* Cloudinary API
* TrailQuest Restful API

## Dependencies

* bCrypt
* morgan
* body-parser
* jsonwebtoken
* boom
* cookie-parser
* react-bootstrap
* Axios
* react-google-maps
* react-datepicker

## Future Plans

Currently I am building a feature that would allow users to view all the hikes in a given area marked on a Google Map, which would be based on the user's location.

## Issues & Contributions

To contrbute to this open source project, please fork and clone this repository, then submit a pull request.

## License

SEE 'LICENSE'(MIT)
--
