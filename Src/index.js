function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    " Tuesday",
    "Wednesday",
    "Thursday",
    " Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", " Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function showForecast(response) {
  let dailyForecast = response.data.daily;
  let forecast = document.querySelector("#foreCast");
  let forecastHTML = `<div class= "row">`;
  dailyForecast.forEach(function (dailyForecast, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
      <div class="forecast" id="foreCast">
        <div class="date">
          ${formatDay(dailyForecast.time)}
        </div>
        <div>
        <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
          dailyForecast.condition.icon
        }.png"/>
      </div>
        <div class="forecast-temperature">
          <span class="max-temp">${Math.round(
            dailyForecast.temperature.maximum
          )}<span> °</span></span>
          <span class="min-temp">${Math.round(
            dailyForecast.temperature.minimum
          )}<span> °</span></span>
        </div>
        </div>
        </div>
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "09t366o3358b69a9ae5287476447dcf2";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}
function getTemperature(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.city;
  let temperature = document.querySelector("#temp");
  celciusTemperature = Math.round(response.data.temperature.current);
  temperature.innerHTML = Math.round(response.data.temperature.current);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.temperature.humidity);
  let wind = document.querySelector("#speed");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let date = document.querySelector("#date");
  date.innerHTML = formatDate(response.data.time * 1000);
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  getForecast(response.data.coordinates);
}
function search(city) {
  let apiKey = "09t366o3358b69a9ae5287476447dcf2";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(getTemperature);
}

function showQuery(event) {
  event.preventDefault();
  let cityValue = document.querySelector("#cityInput");
  search(cityValue.value);
}
function showFahrenheit(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celciusLink.classList.remove("active");
  let temperature = document.querySelector("#temp");
  let fahrenheitTemp = (parseFloat(celciusTemperature) * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemp);
}
function displayCelsius(event) {
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = celciusTemperature;
}
let celciusTemperature = null;
let form = document.querySelector("#search-form");
form.addEventListener("submit", showQuery);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", showFahrenheit);

let celcius = document.querySelector("#celsius-link");
celcius.addEventListener("click", displayCelsius);
let celciusLink = document.querySelector("#celsius-link");
celciusLink.addEventListener("click", displayCelsius);
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("Click", showFahrenheit);
