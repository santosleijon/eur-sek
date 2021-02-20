# eur-sek

A simple website that displays the currency rate between Swedish krona (SEK) and the euro (EUR), as determined by the Swedish central bank. It contains a backend with a REST API endpoint built using Node.js and a web based frontend built using React.

![screenshot](https://github.com/santosleijon/eur-sek/blob/master/screenshot.png?raw=true)

## Getting started

### Starting the application using Docker

Start backend at http://localhost:3001/ and frontend at http://localhost:3000/

```
docker-compose up
```

### Starting the application without Docker

Start backend at http://localhost:3001/

```
cd backend
npm install
node server.js
```

Start frontend at http://localhost:3000/

```
cd frontend
npm install
npm start
```

## Backend components
* [Sveriges Riksbank Open API](https://www.riksbank.se/sv/statistik/sok-rantor--valutakurser/oppet-api/) - Data source for currency rates.
* [Node.js](https://github.com/nodejs/node) - Server runtime environment.
* [Express](https://github.com/expressjs/express) - HTTP server used to serve requests from frontend.
* [easy-soap-request](https://github.com/circa10a/easy-soap-request) - SOAP client used to query Sveriges Riksbank's Open API.
* [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser) - For parsing XML to and from JSON.

## Frontend components
* [React](https://reactjs.org/) - A JavaScript library for building user interfaces
* [React DOM](https://reactjs.org/docs/react-dom.html) - React package for working with the DOM.

## License
See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).