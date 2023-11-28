var APIKey = "6224c5c290251c06942ed184e3f76364";
var cityName = document.querySelector("#search-input").value.trim();
var geoQueryURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=" + APIKey;
alert(geoQueryURL)
fetch(geoQueryURL)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(alert("An error occurred while fetching the coordinates!"));



