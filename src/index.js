function changeDate() {
  let currentDate = new Date();
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
  let h2 = document.querySelector("#date");
  h2.innerHTML = `${day}, ${currentDate.getHours()}:${currentDate.getMinutes()}`;
}

function changeCityInput(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${cityInput.value}`;
}

function formatDate(timestamp) {
  // calculate the date and time from milliseconds
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `Last updated: ${day}, ${hours}:${minutes}`;
}

function showTemperature(response) {
  let trueTemperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = trueTemperature;
  let descriptionElement = document.querySelector("#weather-description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#main-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = Math.round(response.data.main.temp);
}

function retrieveWeatherInfo(city) {
  let apiKey = `a33b693cfbefd271b0ed075f9a8f65f0`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault;
  let cityInput = document.querySelector("#city-input");
  retrieveWeatherInfo(cityInput.value);
}

function showLocationTemperatureCity(response) {
  let trueTemperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = trueTemperature;
  let LocationCity = response.data.name;
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = LocationCity;
  let descriptionElement = document.querySelector("#weather-description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#main-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = Math.round(response.data.main.temp);
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = `a33b693cfbefd271b0ed075f9a8f65f0`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&&lon=${longitude}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(showLocationTemperatureCity);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function changeFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 23;
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(fahrenheitTemperature);
  clickCelsius.classList.remove("active");
  clickFahrenheit.classList.add("active");
}

function changeCelsius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = celsiusTemperature;
  clickCelsius.classList.add("active");
  clickFahrenheit.classList.remove("active");
}

let celsiusTemperature = null;

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", changeCityInput);
cityForm.addEventListener("submit", handleSubmit);

let clickCelsius = document.querySelector("#celsius");
clickCelsius.addEventListener("click", changeCelsius);

let clickFahrenheit = document.querySelector("#fahrenheit");
clickFahrenheit.addEventListener("click", changeFahrenheit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getPosition);

getPosition();

changeDate();
