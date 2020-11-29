import React, { useState, useEffect }  from 'react';
import './App.css';

function App() {
  // Create hooks for stateful variables without the e
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currencyRate, setCurrencyRate] = useState(0);
  const [currencyRateDate, setCurrencyRateDate] = useState(null);

  // Perform API call and update data variables from effect hook since they are "side effect" operations
  useEffect(() => {
    fetch("http://localhost:3001/api/exchange-rate/")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          if (result.hasOwnProperty("value") && result.hasOwnProperty("date")) {
            setCurrencyRate(result.value);
            setCurrencyRateDate(result.date);
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
          <a href="./" title="EUR/SEK currecy rate">eur-sek.com</a> &middot;
          Rate as of <span id="App-currency-rate-date">{currencyRateDate}</span> from <a href="https://www.riksbank.se/en-gb/statistics/search-interest--exchange-rates/" title="Search interest & exchange rates - Sveriges Riksbank">Sveriges Riksbank</a> (retrieved <span className="App-currency-rate-retrieval-date">2020-11-08</span>)
        </div>
      </div>
    );
  }
}

export default App;

/*

function MyComponent() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("https://api.example.com/items")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {items.map(item => (
          <li key={item.name}>
            {item.name} {item.price}
          </li>
        ))}
      </ul>
    );
  }
}

*/