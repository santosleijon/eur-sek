import express from 'express';
import fetchExhangeRate from './swedish-central-bank-api.js';

const server = express();
const PORT = process.env.PORT || 3080;

server.get("/api/exchange-rate", async (_request, response) => {
    console.log("GET /api/exchange-rate called");

    try {
        const exchangeRate = await fetchExhangeRate();
        console.log("swedish-central-bank-api.fetchExhangeRate() returned:");
        console.log(exchangeRate);
        response.send(exchangeRate);
    } catch (error) {
        const errorMessage = { error: "Failed to fetch exchange rate from the Swedish Central Bank API." }
        console.error(error);
        response.status(500);
        response.send(JSON.stringify(errorMessage));
    }
});

server.use(function(request, response, next) {
    response.status(404);
    response.send('Error: 404 Not Found');
    console.error("Error: 404 Not Found: %s %s", request.method, request.url);
    next();
});

server.listen(PORT, () => console.log("Express is listening on port %d", PORT));