import React, { useEffect, useState } from "react";
import "./ExchangeRate.css";

export default function ExchangeRate() {
  const apiKey = "ab988ecf3bccbdf667cdebde";
  const [inputAmount, setInputAmount] = useState(1);
  const [inputCurrency, setInputCurrency] = useState("GBP");
  const [conversion, setConversion] = useState("");
  const [outputAmount, setOutputAmount] = useState(1);
  const [outputCurrency, setOutputCurrency] = useState("USD");

  let currencies = [
    "AED",
    "ARS",
    "AUD",
    "BGN",
    "BRL",
    "BSD",
    "CAD",
    "CHF",
    "CLP",
    "CNY",
    "COP",
    "CZK",
    "DKK",
    "DOP",
    "EGP",
    "EUR",
    "FJD",
    "GBP",
    "GTQ",
    "HKD",
    "HRK",
    "HUF",
    "IDR",
    "ILS",
    "INR",
    "ISK",
    "JPY",
    "KRW",
    "KZT",
    "MXN",
    "MYR",
    "NOK",
    "NZD",
    "PAB",
    "PEN",
    "PHP",
    "PKR",
    "PLN",
    "PYG",
    "RON",
    "RUB",
    "SAR",
    "SEK",
    "SGD",
    "THB",
    "TRY",
    "TWD",
    "UAH",
    "USD",
    "UYU",
    "VND",
    "ZAR",
  ];

  function handleChange(e) {
    // console.log(e.target);
    e.target.id === "from-currency"
      ? setInputCurrency(e.target.value)
      : setOutputCurrency(e.target.value);
  }

  useEffect(() => {
    calculate();
  }, [inputCurrency, outputCurrency, inputAmount]);

  function calculate() {
    fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${inputCurrency}`,
      {
        headers: {
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        let rate = res.conversion_rates[outputCurrency];
        setConversion(`1 ${inputCurrency} = ${rate} ${outputCurrency}`);
        setOutputAmount((inputAmount * rate).toFixed(2));
      });
  }

  function displayCurrencySelector(id, defaultCurrency) {
    return (
      <select id={id} defaultValue={defaultCurrency} onChange={handleChange}>
        {currencies.map((currency, index) => (
          <option key={index} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    );
  }

  return (
    <div className="exchange-container">
      <div className="currency">
        {displayCurrencySelector("from-currency", inputCurrency)}
        <input
          type="number"
          id="from-amount"
          placeholder="1"
          onChange={(e) => setInputAmount(e.target.value)}
        />
      </div>
      <div className="middle">
        <button id="exchange">
          <i className="fas fa-exchange-alt"></i>
        </button>
        <div className="rate" id="rate">
          {conversion}
        </div>
      </div>
      <div className="currency">
        {displayCurrencySelector("to_currency", outputCurrency)}
        <input
          type="number"
          id="to_amount"
          placeholder={outputAmount}
          disabled
        />
      </div>
      <a href="https://www.exchangerate-api.com">Rates By Exchange Rate API</a>
    </div>
  );
}
