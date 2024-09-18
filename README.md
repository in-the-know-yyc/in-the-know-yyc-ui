# in-the-know-yyc-ui
Repository for front-end development of the InTheKnowYYC project.

# SET UP

## Prerequisites
* Node.js and npm (https://nodejs.org/en)
    * Check Node version: `node -v` 
    * Check npm version: `npm -v` 

## Installation
1. Clone the project
2. Inside the project directory run `npm install` to install dependencies

## Development environment
`npm run dev`

## Production environment
* Run `npm run build` (minifies and optimizes code deploy the app)
    * To test locally before deployment: `npm run start`

# PROJECT STRUCTURE

```BASH
in-the-know-yyc-ui
├───public
├───└───images # Only general images for the site, not images for events uploaded by API
├───src
├───├───app
├───│   ├───fonts
├───│   ├───styles # CSS files for every page and component
├───│   ├───├───components
├───│   │    └───pages
├───│-──│─── globals.css # Styles used in the entire site
├───│-──│─── page.tsx # Home page of the project
├───├───components # There is a component for each content block to facilitate reuse
└───└───pages # Automatic routing according to the file name. Ie: "about.js" will be accessed by [www.intheknowyyc.com/about]
```
