const switcher = document.querySelector('#theme-btn');
const body = document.querySelector('body');
const iconPath = document.querySelector('#theme-icon-path');

const { LIGHT, DARK } = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const sun = './sprite.5ec50489.svg#icon-sun';
const moon = './sprite.5ec50489.svg#icon-moon';

let pageTheme = localStorage.getItem('page-theme') || LIGHT;
body.classList.add(pageTheme);
// iconPath.attributes.path.textContent = './sprite.5ec50489.svg#icon-sun',
// iconPath.attributes.href.textContent = pageTheme === LIGHT ? sun : moon;



function handlerSwitcher() {
  body.classList.toggle(LIGHT);
  body.classList.toggle(DARK);
  
  switcher.classList.toggle(LIGHT);
  switcher.classList.toggle(DARK);
  
  pageTheme = pageTheme === LIGHT ? DARK : LIGHT;
  localStorage.setItem('page-theme', pageTheme);
  iconPath.attributes.href.textContent = pageTheme === LIGHT ? sun : moon;
}

switcher.addEventListener('click', handlerSwitcher);