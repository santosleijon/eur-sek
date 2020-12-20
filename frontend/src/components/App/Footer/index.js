import React from 'react';
import './style.css';

function Footer(props) {
    return (
        <div className="App-footer">
            {props.isLoaded && props.error == null &&
                <div>
                    <p>Currency rate as of {props.currencyRateDate}</p>
                        
                    <p>Retrieved {props.currencyRateRetrievalDate}</p>
                
                    <p>Source: <a href="https://www.riksbank.se/en-gb/statistics/search-interest--exchange-rates/" title="Search interest & exchange rates - Sveriges Riksbank">Sveriges Riksbank</a></p>
                </div>
            }
        </div>
    )
}

export default Footer;