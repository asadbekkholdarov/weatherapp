const app = document.querySelector(".weather-app");
const temp = document.querySelector(".temp");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".time");
const conditionOutput = document.querySelector(".condition");
const nameOutput = document.querySelector(".name");
const icon = document.querySelector(".icon");
const cloudOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humandity");
const windOutput = document.querySelector(".wind");
const form = document.getElementById("locationInput");
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");
const cities = document.querySelectorAll(".city");
const rain = document.querySelector(".rain");

let cityInput = "Tashkent";

cities.forEach((city) => {
  city.addEventListener("click", (e) => {
    // change from default city to clicked one
    cityInput = e.target.innerHTML;
    // function that fetches and dsiplays all data from api
    fetchWeatherData(cityInput);
    // fade out app simple animation
    app.style.opacity = "0";
  });
});

// add submit event to the form

form.addEventListener("submit", (e) => {
  if (search.value.length == 0) {
    alert("Error, rewrite city");
  } else {
    cityInput = search.value;
    fetchWeatherData(cityInput);

    search.value = "";

    app.style.opacity = "0";
  }
  e.preventDefault();
});

function dayOfTheWeek(day, month, year) {
  const weekday = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  return weekday[new Date(`${day}/${month}/${year}`).getDate()];
}
const keyurl = "71400ed242d14849885200453220103";
const baseUrl = `http://api.weatherapi.com/v1/current.json?key=${keyurl}`;

function fetchWeatherData(cityInput) {
  console.log(cityInput);
  fetch(`${baseUrl}&q=${cityInput}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.current.time);

      conditionOutput.innerHTML = data.current.condition.text;
      temp.innerHTML = data.current.temp_c + "&#176";
      nameOutput.innerHTML = data.location.name;
      cloudOutput.innerHTML = data.current.cloud + "%";
      humidityOutput.innerHTML = data.current.humidity + "%";
      windOutput.innerHTML = data.current.wind_kph + "km/h";
      rain.innerHTML = data.current.precip_mm;
      let iconId = data.current.condition.icon.substr(
        "//cdn.weatherapi.com/weather/64x64/".length
      );

      let date = data.location.localtime;
      const y = parseInt(date.substr(0, 4));
      const m = parseInt(date.substr(5, 2));
      const d = parseInt(date.substr(8, 2));

      let time = date.substr(11);
      // console.log(time);
      timeOutput.innerHTML = time;
      dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m} ${y}`;

      // set default time of day
      let timeOfDay = "day";

      // get unique id for each weather condtion
      const code = data.current.condition.code;
      console.log();
      if (!data.current.is_day) {
        timeOfDay = "night";
      }
      if (code == 1000) {
        app.style.backgroundImage = `url(./images/${timeOfDay}/sunny.jpg)`;

        btn.style.background = "#e5ba92";
        if (timeOfDay == "night") {
          btn.style.background = "#181e27";
        }
      } else if (
        code == 1003 ||
        code == 1006 ||
        code == 1009 ||
        code == 1030 ||
        code == 1069 ||
        code == 1087 ||
        code == 1135 ||
        code == 1273 ||
        code == 1276 ||
        code == 1279 ||
        code == 1282
      ) {
        app.style.backgroundImage = `
          url(./images/${timeOfDay}/cloudy.jpg)`;

        btn.style.background = "#fa6d1b";
        if (timeOfDay == "night") {
          btn.style.background = "#181e27";
        }
      }

      app.style.opacity = "1";
    });
}
