var cityInput = document.querySelector("#search-input"); // Search location
const searchButton = document.querySelector("#search-button"); // Search button
let searchForm = document.querySelector("#search-form");
const currentWeatherDiv = document.querySelector(".currentWeather");
const daysForecastDiv = document.querySelector(".forecastDays");

var APIKey = "6224c5c290251c06942ed184e3f76364"; //API Key

//weather card
function createWeatherCard(cityName, weatherItem, index) {
  if (index === 0) {
    return `<div class="mt-3 d-flex justify-content-between">
                    <div>
                        <h3 class="fw-bold">${cityName} ${weatherItem.dt_txt.split(
      " "
    )[0]}</h3>
                        <h6 class="my-3 mt-3">Temperature: ${(weatherItem.main
                          .temp - 273.15).toFixed(2)}°C</h6>
                        <h6 class="my-3">Wind: ${weatherItem.wind
                          .speed} M/S</h6>
                        <h6 class="my-3">Humidity: ${weatherItem.main
                          .humidity}%</h6>
                    </div>
                    <div class="text-center me-lg-5">
                        <img src="https://openweathermap.org/img/wn/${weatherItem
                          .weather[0].icon}@4x.png" alt="weather icon">
                        <h6>${weatherItem.weather[0].description}</h6>
                    </div>
                </div>`;
  } else {
    return ` <div class="mt-3 d-flex justify-content-between">
                    <div class="card border-0 text-dark">
                        <div class="card-body p-3 text-dark">
                            <h5 class="card-title fw-semibold">${weatherItem.dt_txt.split(
                              " "
                            )[0]}</h5>
                            <img src="https://openweathermap.org/img/wn/${weatherItem
                              .weather[0].icon}.png" alt="weather icon">
                            <h6 class="card-text my-3 mt-3">Temp: ${(weatherItem
                              .main.temp - 273.15).toFixed(2)}°C</h6>
                            <h6 class="card-text my-3">Wind: ${weatherItem.wind
                              .speed} M/S</h6>
                            <h6 class="card-text my-3">Humidity: ${weatherItem
                              .main.humidity}%</h6>
                        </div>
                    </div>
                </div>`;
  }
}

// Get weather details of passed latitude and longitude
const getWeatherDetails = (cityName, latitude, longitude) => {
  const WEATHER_queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIKey}`;
  fetch(WEATHER_queryURL).then(response => response.json()).then(data => {
    const forecastArray = data.list;
    const uniqueForecastDays = new Set();
    const fiveDaysForecast = forecastArray.filter(forecast => {
      const forecastDate = new Date(forecast.dt_txt).getDate();
      if (
        !uniqueForecastDays.has(forecastDate) &&
        uniqueForecastDays.size < 6
      ) {
        uniqueForecastDays.add(forecastDate);
        return true;
      }
      return false;
    });
    cityInput.value = "";
    currentWeatherDiv.innerHTML = "";
    daysForecastDiv.innerHTML = "";
    fiveDaysForecast.forEach((weatherItem, index) => {
      const html = createWeatherCard(cityName, weatherItem, index);
      if (index === 0) {
        currentWeatherDiv.insertAdjacentHTML("beforeend", html);
      } else {
        daysForecastDiv.insertAdjacentHTML("beforeend", html);
      }
    });
    // var locationHistory = document.createElement("button");
    // locationHistory.textContent = cityName;
    // locationHistory.addEventListener("click", function() {
    //   getCityCoordinates(cityName);
    // });
    // document.querySelector("#history").appendChild(locationHistory);
    // var historyButton = JSON.parse(localStorage.getItem("history"));
    // if (historyButton) {
    //   if (!historyButton.includes(cityName)){
    //     historyButton.push(cityName);
    //     localStorage.setItem("history", JSON.stringify(historyButton));
    //   }
    // } else {
    //   var localStorageCity = [cityName];
    //   localStorage.setItem("history", JSON.stringify(localStorageCity));
    // }

    // creating a new button 
    var locationHistory = document.createElement("button");
    // text content of button 
    locationHistory.textContent = cityName;
    var historyButtons = document.querySelectorAll("#history button");
    var isButtonCreated = Array.from(historyButtons).some(
      button => button.textContent === cityName
    );

    // a button is created ?
    if (!isButtonCreated) {
      //no button created
      locationHistory.addEventListener("click", function() {
        getCityCoordinates(cityName);
      });
      // create new button
      document.querySelector("#history").appendChild(locationHistory);

      // local storage
      var historyButton = JSON.parse(localStorage.getItem("history")) || [];
      if (!historyButton.includes(cityName)) {
        historyButton.push(cityName);
        localStorage.setItem("history", JSON.stringify(historyButton));
      }
    }
  });
};

// Get coordinates of entered city name
function getCityCoordinates(cityName) {
  const geoQueryURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${APIKey}`;

  fetch(geoQueryURL).then(response => response.json()).then(data => {
    if (!data.length) return alert(`No coordinates found for ${cityName}`);
    const { lat, lon, name } = data[0];
    getWeatherDetails(name, lat, lon);
    console.log(geoQueryURL);
  });
}

getCityCoordinates("london");
getCityCoordinates("london");

searchForm.addEventListener("submit", function() {
searchForm.addEventListener("submit", function() {
  event.preventDefault();
  var cityName = cityInput.value.trim();
  if (cityName === "") return alert("Please enter a city name");
  console.log(cityName);

  getCityCoordinates(cityName);
  getCityCoordinates(cityName);
});
