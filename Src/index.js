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
function getTemperature(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.city;
  let temperature = document.querySelector("#temperature");
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

let form = document.querySelector("#search-form");
form.addEventListener("submit", showQuery);
