import { useEffect } from "react";
import React from "react";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import Gorsel from "./bilesenler/Gorsel";

function App() {
  const [nasa, setNasa] = useState({});
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  useEffect(() => {
    axios
      .get("https://api.nasa.gov/planetary/apod", {
        params: {
          api_key: "NLN1hW9DJwtmC681MTH2ImCXHCEYqO0eryl8mfmz",
          date: date,
        },
      })
      .then(function (response) {
        setNasa(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  }, [date]);

  const dateSetter = (evt) => {
    setDate(evt.target.value);
  };

  return (
    <div className="App">
      <input type="date" id="date" name="date" onChange={dateSetter} />
      <span role="img" aria-label="go!">
        {!nasa.title && <p>Yükleniyor...</p>}
      </span>
      {nasa.title && <Gorsel data={nasa} />}
    </div>
  );
}
export default App;
