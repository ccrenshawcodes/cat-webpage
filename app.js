const navExpander = document.querySelector('.nav-icon');
const navList = document.querySelector('ul');
const nav = document.querySelector('nav');

navExpander.addEventListener("mouseover", () => {
  navList.classList.add('hovered-list');
});

nav.addEventListener("mouseleave", () => {
  navList.classList.remove('hovered-list');
})

catPics = document.querySelector('.cat-slides');

async function getCats () {
  try {
    const catDataQuery = await fetch(`https://api.thecatapi.com/v1/images/search`, {mode: 'cors'});
    if (!catDataQuery.ok) {
      catPics.append('Oops! Something went wrong');
      throw new Error(catDataQuery.status);
    }
    catData = await catDataQuery.json();
    return catData;
  } catch (err) {
    catPics.append('Oops! Something went wrong');
    console.error(err);
    return null;
  }
}

async function displayCat () {
  const myCatData = await getCats();
  catPic = myCatData[0].url;
  catPics.src = catPic;
}

//  TODO: there's a short delay between when the page loads and when the first cat pic loads.
//  I should put in a cute loading message for those with slow internet 
window.addEventListener("load", displayCat())

setInterval (() => {
  displayCat();
}, 10000);