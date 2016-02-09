// HEADER

// BURGER MENU
let burgerMenuOpen = document.getElementById('burger-menu'),
    burgerMenuClose = document.getElementById('burger-menu-close'),
    header = document.getElementById('header');

burgerMenuOpen.addEventListener('click', burgerEvent);
burgerMenuClose.addEventListener('click', burgerEvent);

function burgerEvent (el) {
  if (!header.classList.contains('active')) {
    header.classList.add('active');
  } else {
    header.classList.remove('active');
  }
}
