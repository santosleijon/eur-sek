import React, { useState, useEffect } from 'react';
import './style.css';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

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
                        setCurrencyRateRetrievalDate(new Date().toISOString().slice(0, 10));
                    } else {
                        var error = { message: "Invalid response from internal API (" + JSON.stringify(result) + ")." };
                        setError(error);
                    }
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []);

    return (
        <div className="App">
            <Header />
            <Content
                error={error}
                isLoaded={isLoaded}
                currencyRate={currencyRate}
            />
            <Footer
                error={error}
                isLoaded={isLoaded}
                currencyRateDate={currencyRateDate}
                currencyRateRetrievalDate={currencyRateRetrievalDate}
            />
        </div>
    )
}

export default App;