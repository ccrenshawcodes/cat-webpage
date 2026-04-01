import { myKey } from "./myKey.js";

const navExpander = document.querySelector('.nav-icon');
const navList = document.querySelector('ul');
const nav = document.querySelector('nav');

navExpander.addEventListener("mouseover", () => {
  navList.classList.add('hovered-list');
});

nav.addEventListener("mouseleave", () => {
  navList.classList.remove('hovered-list');
})

const catPics = document.querySelector('.cat-slides');

async function getCats () {
  try {
    const catDataQuery = await fetch(`https://api.thecatapi.com/v1/images/search`, {mode: 'cors'});
    if (!catDataQuery.ok) {
      catPics.append('Oops! Something went wrong');
      throw new Error(catDataQuery.status);
    }
    let catData = await catDataQuery.json();
    return catData;
  } catch (err) {
    catPics.append('Oops! Something went wrong');
    console.error(err);
    return null;
  }
}

async function displayCat () {
  const myCatData = await getCats();
  const catPic = myCatData[0].url;
  catPics.src = catPic;
}

window.addEventListener("load", displayCat())

setInterval (() => {
  displayCat();
}, 10000);

async function getWeather (query) {
  const nowWeatherUrl = `http://api.weatherapi.com/v1/current.json?key=${myKey}&q=${query}`;
  try {
    const nowWeatherResponse = await fetch(nowWeatherUrl, {mode: "cors"});
    if (!nowWeatherResponse.ok) {
      throw new Error(nowWeatherResponse.status);
    }
    const nowWeather = await nowWeatherResponse.json();
    console.log(nowWeather);
    return nowWeather;
  } catch (err) {
    alert(`An error occurred! Error code: ${err}`);
    console.error(err);
    throw new Error(err);
  }
}

const weatherButton = document.querySelector('button');
const weatherInput = document.querySelector('input');
const nowWeatherDisplay = document.querySelector('.current-weather');
const pastWeatherDisplay = document.querySelector('.past-weather');

weatherButton.addEventListener("click", async () => {
  const currentWeather = await getWeather(weatherInput.value);
  nowWeatherDisplay.append(`Your current temp is ${currentWeather.current.temp_f}.`);
  nowWeatherDisplay.append(`The condition is ${currentWeather.current.condition.text}, with winds at ${currentWeather.current.wind_mph} mph from the ${currentWeather.current.wind_dir}.`);
});
