import ConverterForm from "./converter-form"
import React, { useState } from 'react';

function App() {

  const [currencyTo, setCurrencyTo] = useState();
  const [resultAmount, setResultAmount] = useState();

  function handleConvert(currencyT, result) {
    setCurrencyTo(currencyT);

    const formatedResult = (Math.floor(result * 100)/100).toFixed(2);
    setResultAmount(formatedResult);
  }

  return (
    <>
      <div className="app-container">
        <ConverterForm onConvert={handleConvert} />
        <p>{currencyTo} {resultAmount}</p>
      </div>
    </>
  )
}

export default App
