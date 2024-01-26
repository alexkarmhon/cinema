const switcher = document.querySelector('#theme-btn');
const body = document.querySelector('body');

const sun = document.querySelector('#sun');
const moon = document.querySelector('#moon');

const { LIGHT, DARK } = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

let pageTheme = localStorage.getItem('page-theme') || LIGHT;
body.classList.add(pageTheme);

if (pageTheme === LIGHT) {
  sun.classList.remove('is-hidden');
  moon.classList.add('is-hidden');
}

if (pageTheme === DARK) {
  sun.classList.add('is-hidden');
}


function handlerSwitcher() {
  body.classList.toggle(LIGHT);
  body.classList.toggle(DARK);

  moon.classList.toggle('is-hidden');
  sun.classList.toggle('is-hidden');
  
  pageTheme = pageTheme === LIGHT ? DARK : LIGHT;
  localStorage.setItem('page-theme', pageTheme);
}

switcher.addEventListener('click', handlerSwitcher);