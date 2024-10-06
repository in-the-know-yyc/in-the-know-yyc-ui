// OBJECTS
const toggleMobileMenuButton = document.getElementById('toggleMobileMenu');
const mainMenuHeader = document.getElementById('mainMenuHeader');

// LISTENERS
toggleMobileMenuButton.addEventListener('click', toggleMobileMenu);

// FUNCTIONS
function toggleMobileMenu() {
    mainMenuHeader.classList.toggle('menuOpen');
    console.log('ENTRA togglemobilemenu');
}