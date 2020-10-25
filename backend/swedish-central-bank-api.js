import soapRequest from 'easy-soap-request';
import j2xParser from 'fast-xml-parser';

const fetchExhangeRate = async () => {
    console.log("swedish-central-bank-api.fetchExhangeRate() called");
    
    // The Swedish Central Bank only publishes exchange rates for weekdays afternoon, so the rate from the previous weekday is retrieved
    const date = getPreviousWeekdayDate();
    
    const localDate = date.toLocaleDateString("sv-SE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const { response } = await soapRequest({
        url: 'http://swea.riksbank.se/sweaWS/services/SweaWebServiceHttpSoap12Endpoint',
        headers: {
            'User-Agent': 'eur-sek',
            'Content-Type': 'application/soap+xml;charset=UTF-8',
            'action': 'urn:getInterestAndExchangeRates',
        },
        xml: `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:xsd="http://swea.riksbank.se/xsd">
                  <soap:Header/>
                  <soap:Body>
                      <xsd:getInterestAndExchangeRates>
                          <searchRequestParameters>
                              <aggregateMethod>D</aggregateMethod>
                              <datefrom>` + localDate + `</datefrom>
                              <dateto>` + localDate + `</dateto>
                              <languageid>en</languageid>
                              <min>false</min>
                              <avg>true</avg>
                              <max>false</max>
                              <ultimo>false</ultimo>
                              <searchGroupSeries>
                                  <groupid>11</groupid>
                                  <seriesid>SEKEURPMI</seriesid>
                              </searchGroupSeries>
                          </searchRequestParameters>
                      </xsd:getInterestAndExchangeRates>
                  </soap:Body>
              </soap:Envelope>`,
        timeout: 1000
    });
    const { header, body, statusCode } = response;

    console.log("HTTP response code from Swedish Central Bank API: " + statusCode);

    if (statusCode == 200) {
        if (j2xParser.validate(body) == true) {
            const parsedResponseBody = j2xParser.parse(body);
            const date = parsedResponseBody['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns0:getInterestAndExchangeRatesResponse']['return']['groups']['series']['resultrows']['date'];
            const value = parsedResponseBody['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns0:getInterestAndExchangeRatesResponse']['return']['groups']['series']['resultrows']['value'];

            const exchangeRate = {
                currency: 'SEK/EUR',
                date: date,
                value: value
            }

            return exchangeRate;
        } else {
            throw new Error("Failed to parse XML response from Swedish Central Bank API.");
        }
    } else {
        throw new Error("Bad HTTP response code (" + statusCode + ") retrieved from Swedish Central Bank API.");
    }
};

function getPreviousWeekdayDate()
{
    // Get the date of the previous weekday, formatted as YYYY-MM-DD
    var date = new Date();
    var daysBack = 1;

    // If current day is Sunday, step back two days to last Friday
    if (date.getDay() == 0) {
        daysBack = 2;
    // If current day is Monday, step back three days to last Friday
    } else if (date.getDay() == 1) {
        daysBack = 3;
    }

    date.setDate(date.getDate() - daysBack);

    return date;
}

export default fetchExhangeRate;