// HEADER

// BURGER MENU
let burgerMenuOpen = document.getElementById('burger-menu'),
    burgerMenuClose = document.getElementById('burger-menu-close'),
    header = document.getElementById('header'),
    linkMenu = document.querySelectorAll('#header .open-menu a');

burgerMenuOpen.addEventListener('click', burgerEvent);
burgerMenuClose.addEventListener('click', burgerEvent);

for (var i = 0; i < linkMenu.length; i ++) {
  linkMenu[i].addEventListener('click', closeMenu);
}


function burgerEvent (el) {
  if (!header.classList.contains('active')) {
    header.classList.add('active');
  } else {
    header.classList.remove('active');
  }
}

function closeMenu () {
  header.classList.remove('active');
}
