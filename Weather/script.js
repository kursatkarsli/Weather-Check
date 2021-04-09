/**
 * Weather App
 */

// API_KEY for maps api
let API_KEY = "1b9e3f7ea6d2d3e0eeb6201d17621d89";


window.onload = () => {
    /** For Activate To Enter Option */
    const input = document.querySelector("#city-input")
    // Execute a function when the user releases a key on the keyboard
    input.addEventListener("keyup", function (e) {
        // Number 13 is the "Enter" key on the keyboard
        if (e.keyCode === 13) {
            // Cancel the default action, if neededs
            // Trigger the button element with a click
            document.querySelector("button").click();
        }
    });
}

/**
 * Retrieve weather data from openweathermap
 * Sample Of Url
 * https://api.openweathermap.org/data/2.5/weather?q=detroit&appid=a8e71c9932b20c4ceb0aed183e6a83bb&units=imperial
 */
getWeatherData = (city) => {
  const URL = "https://api.openweathermap.org/data/2.5/weather";

  const FULL_URL = `${URL}?q=${city}&appid=${API_KEY}&units=imperial`;
  const weatherPromise = fetch(FULL_URL);
  return weatherPromise.then((resp) => {
    return resp.json();
  });
};

/**
 * Retrieve city input and get the weather data
 */
searchCity = () => {
  const city = document.getElementById("city-input").value;
  getWeatherData(city)
    .then((response) => {
      showWeatherData(response);
    })
    .catch((error) => {
      alert("Please Make Sure that you Have Entered City Name");
    })
};

/**
 * Show the weather data in HTML
 */
showWeatherData = (weatherData) => {
  let temp = document.getElementById("temp");
  let maxTemp = document.getElementById("max-temp");
  let minTemp = document.getElementById("min-temp");

  let celciusTemp = makeCelcius(weatherData.main.temp);
  let celciusMax = makeCelcius(weatherData.main.temp_max);
  let celciusMin = makeCelcius(weatherData.main.temp_min);

  temp.innerText = Number(celciusTemp.toFixed(1));
  maxTemp.innerText = Number(celciusMax.toFixed(1));
  minTemp.innerText = Number(celciusMin.toFixed(1));
};

/*Convert Temprature Fahrenheit to Celcius*/
  makeCelcius = (fah) => {
    return (5 / 9) * (fah - 32);
  };
