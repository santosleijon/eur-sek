import React from 'react';
import './style.css';

function Content(props) {
    return (
        <div className="App-content">
            {!props.isLoaded
                ?
                    <div>
                        Loading...
                    </div>
                :
                    props.error != null
                        ?
                            <div>
                                {props.error.message}
                            </div>
                        :
                            <div>
                                1 EUR = {props.currencyRate} SEK
                            </div>
            }
        </div>
    )
}

export default Content;