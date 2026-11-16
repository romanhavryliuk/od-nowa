const DEMO_MESSAGE =
  'Dane przeszły sprawdzenie. To pokaz formularza. Wiadomość nie została wysłana.';

const form = document.querySelector('.form');
const formResult = document.querySelector('.form__result');

// Форма демонстраційна: нічого не відправляємо і не перезавантажуємо сторінку,
// а показуємо повідомлення під кнопкою, щоб екран не стрибав
function handleFormSubmit(event) {
  event.preventDefault();
  formResult.textContent = DEMO_MESSAGE;
}

if (form && formResult) {
  form.addEventListener('submit', handleFormSubmit);
}
