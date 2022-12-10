function changeDate() {
  let currentDate = new Date();
  console.log(currentDate);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];
  let h2 = document.querySelector("#current-date-time");
  h2.innerHTML = `${day}, ${currentDate.getHours()}:${currentDate.getMinutes()}`;
}

function changeCityInput(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${cityInput.value}`;
}

function changeCelsius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = `14`;
}

function changeFahrenheit(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = `57`;
}

function showTemperature(response) {
  let trueTemperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = trueTemperature;
}

function retrieveWeatherInfo() {
  let cityInput = document.querySelector("#city-input");
  let apiKey = `a33b693cfbefd271b0ed075f9a8f65f0`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function showLocationTemperatureCity(response) {
  console.log(response.data.name);
  let trueTemperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = trueTemperature;
  let LocationCity = response.data.name;
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = LocationCity;
}

function handlePosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = `a33b693cfbefd271b0ed075f9a8f65f0`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&&lon=${longitude}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(showLocationTemperatureCity);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

changeDate();

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", changeCityInput);
cityForm.addEventListener("submit", retrieveWeatherInfo);

let clickCelsius = document.querySelector("#celsius");
clickCelsius.addEventListener("click", changeCelsius);

let clickFahrenheit = document.querySelector("#fahrenheit");
clickFahrenheit.addEventListener("click", changeFahrenheit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getPosition);

getPosition();
