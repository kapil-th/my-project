const launchDate = new Date();
launchDate.setDate(launchDate.getDate() + 11);

const countdownElement = document.getElementById('countdown');
const form = document.getElementById('notify-form');
const emailInput = document.getElementById('email');
const formMessage = document.getElementById('form-message');

function formatTimeUnit(unit) {
  return String(unit).padStart(2, '0');
}

function updateCountdown() {
  const now = new Date();
  const delta = launchDate - now;

  if (delta <= 0) {
    countdownElement.textContent = 'We are live!';
    clearInterval(intervalId);
    return;
  }

  const days = Math.floor(delta / (1000 * 60 * 60 * 24));
  const hours = Math.floor((delta / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((delta / (1000 * 60)) % 60);
  const seconds = Math.floor((delta / 1000) % 60);

  countdownElement.textContent = `${formatTimeUnit(days)}d ${formatTimeUnit(hours)}h ${formatTimeUnit(minutes)}m ${formatTimeUnit(seconds)}s until launch`;
}

const intervalId = setInterval(updateCountdown, 1000);
updateCountdown();

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!emailInput.value || !emailInput.value.includes('@')) {
    formMessage.textContent = 'Please enter a valid email address.';
    return;
  }

  formMessage.textContent = `Thanks! We will notify ${emailInput.value}.`;
  emailInput.value = '';
});
