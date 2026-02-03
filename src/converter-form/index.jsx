import React, { useState, useEffect } from 'react';
import "./styles.css";

export default function ConverterForm({onConvert}) {

    const [currencyRates, setCurrencyRates] = useState({});

    useEffect(() => {
        fetch('https://open.er-api.com/v6/latest/USD', { method: "GET" })
            .then(response => response.json())
            .then((data) => {
                setCurrencyRates(data.rates);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const [currencyFrom, setCurrencyFrom] = useState("USD");
    const [currencyTo, setCurrencyTo] = useState("USD");
    const [amountFrom, setAmountFrom] = useState(0);

    const handleCurrencyFromChange = (event) => {
        setCurrencyFrom(event.target.value);
    };

    const handleCurrencyToChange = (event) => {
        setCurrencyTo(event.target.value);
    };

    const handleAmountFromChange = (event) => {
        setAmountFrom(Number(event.target.value));
    };

    function handleSubmit(event) {
        event.preventDefault();

        if (amountFrom > 0) {
            const rateCurrencyFrom = currencyRates[currencyFrom];
            const rateCurrencyTo = currencyRates[currencyTo];

            const result = amountFrom * rateCurrencyTo / rateCurrencyFrom;
            onConvert(currencyTo, result);
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <div className="currencies-container">
                <div className="currency-choice">
                    <label>From:</label>
                    <select onChange={handleCurrencyFromChange}>
                        {Object.entries(currencyRates).map(([currency, rate]) => (
                            <option key={currency} value={currency}>{currency}</option>
                        ))}

                    </select>
                </div>
                <div className="currency-choice">
                    <label>To:</label>
                    <select onChange={handleCurrencyToChange}>
                        {Object.entries(currencyRates).map(([currency, rate]) => (
                            <option key={currency} value={currency}>{currency}</option>
                        ))}
                    </select>
                </div>
            </div>
            <input onChange={handleAmountFromChange} type="number" placeholder='Type the amount' />
            <button type="submit">Convert</button>
        </form>
    );
}