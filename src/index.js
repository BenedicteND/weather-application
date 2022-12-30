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
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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

function getForecast(coordinates) {
  let apiKey = `f5e814a04eddfab1740f07bf0328eee2`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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
  iconElement.setAttribute("alt", response.data.weather[0].description);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = Math.round(response.data.main.temp);
  getForecast(response.data.coord);
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

function showLocationCity(response) {
  let LocationCity = response.data.name;
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = LocationCity;
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = `a33b693cfbefd271b0ed075f9a8f65f0`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&&lon=${longitude}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(showTemperature);
  axios.get(apiUrl).then(showLocationCity);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-sm-2">
                <div class="weather-forecast-date">${formatDay(
                  forecastDay.dt
                )}</div>
                <img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt="weather-icon"></i>
                <div class="coming-temperature">
                  <span class="weather-forecast-maximum">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="weather-forecast-minimum">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>
              </div>
            `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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

changeDate();

retrieveWeatherInfo("Copenhagen");
