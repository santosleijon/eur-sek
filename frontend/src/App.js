import React, { useState, useEffect }  from 'react';
import './App.css';

function App() {
  // Create hooks for stateful variables without the e
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currencyRate, setCurrencyRate] = useState(0);
  const [currencyRateDate, setCurrencyRateDate] = useState(null);
  const [currencyRateRetrievalDate, setCurrencyRateRetrievalDate] = useState(null);

  // Perform API call and update data variables from effect hook since they are "side effect" operations
  useEffect(() => {
    fetch("http://localhost:3001/api/exchange-rate/") // TODO: Replace hard-coded URL with variable
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          if (result.hasOwnProperty("value") && result.hasOwnProperty("date")) {
            setCurrencyRate(result.value);
            setCurrencyRateDate(result.date);
            setCurrencyRateRetrievalDate(new Date().toISOString().slice(0,10));
          } else {
            var error = { message: "Invalid response from internal API (" + JSON.stringify(result) +")." };
            setError(error);
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, []);

  if (error) {
    return (
      <div className="App">
        <div className="App-content">
          <p>Error: { error.message }</p>
        </div>
        <div className="App-footer">
          <a href="./" title="EUR/SEK currecy rate">eur-sek.com</a>
        </div>
      </div>
    )
  } else if (!isLoaded) {
    return (
      <div className="App">
        <div className="App-content">
          <p>
            Loading...
          </p>
        </div>
        <div className="App-footer">
          <a href="./" title="EUR/SEK currecy rate">eur-sek.com</a>
        </div>
      </div>
    )
  } else {
    return (
      <div className="App">
        <div className="App-content">
          <p>
            1 EUR = <span id="App-currency-rate">{currencyRate}</span> SEK
          </p>
        </div>
        <div className="App-footer">
          <p>Rate as of <span id="App-currency-rate-date">{currencyRateDate}</span></p>
          <p>Retrieved from <a href="https://www.riksbank.se/en-gb/statistics/search-interest--exchange-rates/" title="Search interest & exchange rates - Sveriges Riksbank">Sveriges Riksbank</a> on <span className="App-currency-rate-retrieval-date">{currencyRateRetrievalDate}</span></p>
          <p><a href="./" title="EUR/SEK currecy rate"><strong>eur-sek.com</strong></a></p>
        </div>
      </div>
    );
  }
}

export default App;