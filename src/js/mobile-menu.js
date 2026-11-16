const IS_OPEN_CLASS = 'is-open';
const NO_SCROLL_CLASS = 'no-scroll';
const TABLET_MEDIA_QUERY = '(min-width: 768px)';
// Усе, що лежить під відкритим меню і не повинно отримувати фокус
const PAGE_CONTENT_SELECTOR = '.skip-link, .header, main, .footer';

const menu = document.querySelector('[data-menu]');
const openButton = document.querySelector('[data-menu-open]');
const closeButton = document.querySelector('[data-menu-close]');
const pageContent = document.querySelectorAll(PAGE_CONTENT_SELECTOR);
const tabletMedia = window.matchMedia(TABLET_MEDIA_QUERY);

// inert вимикає Tab і скрінрідери для сторінки під меню,
// інакше фокус «провалюється» на невидимі елементи
function setPageContentInert(isInert) {
  pageContent.forEach(element => {
    element.inert = isInert;
  });
}

function handleEscapeKey(event) {
  if (event.key === 'Escape') {
    closeMenu();
  }
}

function openMenu() {
  menu.classList.add(IS_OPEN_CLASS);
  document.body.classList.add(NO_SCROLL_CLASS);
  openButton.setAttribute('aria-expanded', 'true');
  setPageContentInert(true);
  document.addEventListener('keydown', handleEscapeKey);
  closeButton.focus();
}

// Після кліку по посиланню фокус не повертаємо на бургер:
// браузер має перейти до секції, на яку веде посилання
function closeMenu({ shouldReturnFocus = true } = {}) {
  menu.classList.remove(IS_OPEN_CLASS);
  document.body.classList.remove(NO_SCROLL_CLASS);
  openButton.setAttribute('aria-expanded', 'false');
  // Знімаємо inert до focus(): бургер лежить у шапці, і поки вона inert, фокус на нього не стане
  setPageContentInert(false);
  document.removeEventListener('keydown', handleEscapeKey);

  if (shouldReturnFocus) {
    openButton.focus();
  }
}

function handleMenuLinkClick(event) {
  if (event.target.closest('a')) {
    closeMenu({ shouldReturnFocus: false });
  }
}

// Якщо меню відкрите і екран повернули або розширили до планшета,
// закриваємо його, щоб сторінка не лишилась заблокованою для скролу
function handleTabletMediaChange(event) {
  if (event.matches && menu.classList.contains(IS_OPEN_CLASS)) {
    closeMenu({ shouldReturnFocus: false });
  }
}

if (menu && openButton && closeButton) {
  openButton.addEventListener('click', openMenu);
  closeButton.addEventListener('click', () => closeMenu());
  menu.addEventListener('click', handleMenuLinkClick);
  tabletMedia.addEventListener('change', handleTabletMediaChange);
}
