const navExpander = document.querySelector('.nav-icon');
const navList = document.querySelector('ul');
const nav = document.querySelector('nav');

navExpander.addEventListener("mouseover", () => {
  navList.classList.add('hovered-list');
});

nav.addEventListener("mouseleave", () => {
  navList.classList.remove('hovered-list');
})

//  TODO: mouse passing over thin gap between nav expander and nav items causes hover state to end
//  it has something to do with the padding.