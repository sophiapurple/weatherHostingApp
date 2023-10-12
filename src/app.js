function formatTime(timeStamp) {
  let date = new Date(timeStamp);
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  currentMinutes = date.getMinutes();

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
  return `${day} ${currentHour}:${currentMinutes}`;
}

function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", " Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForcast(response) {
  let forcast = response.data.daily;
  console.log(forcast);
  let weatherForcastElement = document.querySelector("#weather-forcast");
  let forcastHtml = `<div class="row">`;

  forcast.forEach(function (forcastDay, index) {
    if (index < 6) {
      forcastHtml += ` 
      <div class="col-2">
    <div class="weatherDate">${formatDay(forcastDay.time)}</div>
        <img src=${forcastDay.condition.icon_url}
        } class="weather-forcast-image" alt="" />
       
        <div class="weatherForcastTemperature">
          <span class="weather-forcast-max">${Math.round(
            forcastDay.temperature.maximum
          )}°</span>
          <span class="weather-forcast-min">${Math.round(
            forcastDay.temperature.minimum
          )}°</span>
        </div>
        </div>
        
`;
    }
  });
  forcastHtml = forcastHtml + `</div>`;
  weatherForcastElement.innerHTML = forcastHtml;
}

function getForcast(coordinates) {
  console.log(coordinates);

  let apiKey = "93cf0a589b1befff9b43f05fbt79bo02";
  let urlApiKey = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;

  console.log(urlApiKey);
  axios.get(urlApiKey).then(displayForcast);
}

function displayWeather(response) {
  console.log(response);
  cityInput = document.querySelector("#city-input").value;
  cities = document.querySelector("h1");
  city = response.data.city;

  cities.innerHTML = `${city}`;
  let Searchhumidity = document.querySelector("#humidity");
  humidity = Math.round(response.data.temperature.humidity);
  Searchhumidity.innerHTML = `Humidity: ${humidity}%`;
  let searchWind = document.querySelector("#wind");
  let wind = Math.round(response.data.wind.speed);
  searchWind.innerHTML = `Wind: ${wind}km/h`;
  celsius = response.data.temperature.current;
  let Searchtemp = document.querySelector("#temp");
  let temperature = Math.round(celsius);
  Searchtemp.innerHTML = `${temperature}`;

  let time = document.querySelector("#day");
  time.innerHTML = formatTime(response.data.time * 1000);
  let image = document.querySelector("#weather-Image");
  image.setAttribute("src", response.data.condition.icon_url);

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = `Description: ${response.data.condition.description}`;

  getForcast(response.data.coordinates);
}

function searchCity(city) {
  let apiKey = "93cf0a589b1befff9b43f05fbt79bo02";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#city-input");
  searchCity(cityInput.value);
}
function displayFaherient(event) {
  event.preventDefault();

  temperature = document.querySelector("#temp");
  let fahr = (celsius * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahr);
}
function displayCelsius(event) {
  event.preventDefault();

  temperature = document.querySelector("#temp");

  celsiusElement = celsius;
  temperature.innerHTML = Math.round(celsiusElement);
}
let celsius = null;

let form = document.querySelector("#form-input");
form.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

let fahr = document.querySelector("#fahrenheit-link");
fahr.addEventListener("click", displayFaherient);

searchCity("Lagos");
