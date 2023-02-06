import { useEffect, useState } from "react";
import styles from "./App.module.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [coins, setCoins] = useState([]);
  const [value, setValue] = useState();
  const [number, setNumber] = useState(false);
  const [name, setName] = useState();
  const [asset, setAsset] = useState();
  const [price, setPrice] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    setName(value);
    setAsset(number);
    coins.forEach((coin) =>
      coin.name === value ? setPrice(coin.quotes.USD.price) : null
    );
  };

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.body}>
      <h1>🪙 Coin Calculator 🪙</h1>
      {loading ? "" : <h2>There are {coins.length}🪙s...</h2>}
      {loading ? (
        <strong>로딩 중...</strong>
      ) : (
        <select>
          <option> See the Coin List </option>
          {coins.map((coin) => (
            <option key={coin.id}>
              {coin.name} ({coin.symbol}): ${coin.quotes.USD.price.toFixed(5)}{" "}
              USD
            </option>
          ))}
        </select>
      )}
      <hr />

      <form>
        <input
          value={value}
          placeholder="Type the symbol"
          onChange={(e) => setValue(e.target.value)}
          type="text"
        />
        <br />
        <input
          value={number}
          placeholder="Type your own money"
          onChange={(e) => setNumber(e.target.value)}
          type="number"
        />
        <br />
        <input value="Submit" type="button" onClick={onSubmit} />
      </form>

      {name !== undefined
        ? coins.map((coin) =>
            coin.name === name ? (
              <div key={coin.id}>
                <span>
                  {coin.name} ({coin.symbol}): $
                  {coin.quotes.USD.price.toFixed(5)} USD
                </span>
                <button
                  onClick={() => setClicked(true)}
                  style={{ marginLeft: 5 }}
                >
                  Calculate
                </button>
              </div>
            ) : null
          )
        : null}

      {clicked ? `You can buy ${name} by ${asset / price}.` : null}

      <div>
        <button
          onClick={() => {
            setClicked(false);
            setName();
            setValue("");
            setNumber("");
          }}
        >
          Refresh
        </button>
      </div>
    </div>
  );
}

export default App;
