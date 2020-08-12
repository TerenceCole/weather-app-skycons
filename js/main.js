const api = {
  key: "0b12c895f3d457e33c4ef1a2ec3e94a7",
  baseurl: "https://api.openweathermap.org/data/2.5/",
}

const defaultSearch = 'St. Louis';

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);





function setQuery(event) {
  if (event.keyCode === 13) {
    getResults(searchbox.value);
  }
}

function getResults (query) {
  fetch(`${api.baseurl}weather?q=${query}&units=imperial&appid=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;
  
  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;

  let weather_element = document.querySelector('.current .weather');
  weather_element.innerText = weather.weather[0].main;

  // Openweather Icons
  // document.getElementById("weather-icon").src= `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  // Skycon Icons - default
  // var skycons = new Skycons({"monochrome": false});
  // skycons.add(document.getElementById("icon1"), Skycons.RAIN);
  // skycons.play();

  // Skycon Icons - API integration
  let skycons = new Skycons({"monochrome": false});
  let weatherIcon = weather.weather[0].icon;
  // weatherIcon = 'test';

  console.log(weatherIcon);

  switch (weatherIcon) {
    // case 'test':
    //   skycons.add(document.getElementById("icon1"), Skycons.FOG);
    //   document.body.style.backgroundImage = "url('images/fog_night.jpg')";
    //   break;
    case '01d':
      skycons.add(document.getElementById("icon1"), Skycons.CLEAR_DAY);
      document.body.style.backgroundImage = "url('images/clear_day.jpg')";
      break;
    case '01n':
      skycons.add(document.getElementById("icon1"), Skycons.CLEAR_NIGHT);
      document.body.style.backgroundImage = "url('images/clear_night.jpg')";
      break;
    case '02d':
      skycons.add(document.getElementById("icon1"), Skycons.PARTLY_CLOUDY_DAY);
      document.body.style.backgroundImage = "url('images/cloudy_day.jpg')";
      break;
    case '02n':
      skycons.add(document.getElementById("icon1"), Skycons.PARTLY_CLOUDY_NIGHT);
      document.body.style.backgroundImage = "url('images/cloudy_night.jpg')";
      break;
    case '03d':
    case '04d':
      skycons.add(document.getElementById("icon1"), Skycons.CLOUDY);
      document.body.style.backgroundImage = "url('images/cloudy_day.jpg')";
      break;
    case '03n':
    case '04n':
      skycons.add(document.getElementById("icon1"), Skycons.CLOUDY);
      document.body.style.backgroundImage = "url('images/cloudy_night.jpg')";
      break;
    case '09d':
    case '10d':
      skycons.add(document.getElementById("icon1"), Skycons.SHOWERS_DAY);
      document.body.style.backgroundImage = "url('images/showers_day.jpg')";
      break;
    case '09n':
    case '10n':
      skycons.add(document.getElementById("icon1"), Skycons.SHOWERS_NIGHT);
      document.body.style.backgroundImage = "url('images/showers_night.jpg')";
      break;
    case '11d':
      skycons.add(document.getElementById("icon1"), Skycons.THUNDER_SHOWERS_DAY);
      document.body.style.backgroundImage = "url('images/thunder_showers_day.jpg')";
      break;
    case '11n':
      skycons.add(document.getElementById("icon1"), Skycons.THUNDER_SHOWERS_NIGHT);
      document.body.style.backgroundImage = "url('images/thunder_showers_night.jpg')";
      break;
    case '13d':
      skycons.add(document.getElementById("icon1"), Skycons.SNOW);
      document.body.style.backgroundImage = "url('images/snow_day.jpg')";
      break;
    case '13n':
      skycons.add(document.getElementById("icon1"), Skycons.SNOW);
      document.body.style.backgroundImage = "url('images/snow_night.jpg')";
      break;
    case '50d':
      skycons.add(document.getElementById("icon1"), Skycons.FOG);
      document.body.style.backgroundImage = "url('images/fog_day.jpg')";
      break;
    case '50n':
      skycons.add(document.getElementById("icon1"), Skycons.FOG);
      document.body.style.backgroundImage = "url('images/fog_night.jpg')";
      break;
    default:
      skycons.add(document.getElementById("icon1"), Skycons.CLEAR_DAY);
      document.body.style.backgroundImage = "url('images/clear_day.jpg')";
  }

  skycons.play();


  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°F / ${Math.round(weather.main.temp_max)}°F `;



}

function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

getResults(defaultSearch);
