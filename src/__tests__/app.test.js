/* eslint-disable global-require, import/extensions */

describe('TopNotch launch page', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div>
        <div id="countdown"></div>
        <form id="notify-form">
          <input id="email" type="email" />
          <button type="submit">Notify Me</button>
        </form>
        <p id="form-message"></p>
      </div>
    `;

    require('../script.js');
  });

  it('renders countdown text', () => {
    const countdown = document.getElementById('countdown');
    expect(countdown.textContent).toMatch(/until launch|We are live!/);
  });

  it('shows a message after submitting a valid email', () => {
    const form = document.getElementById('notify-form');
    const email = document.getElementById('email');
    const message = document.getElementById('form-message');

    email.value = 'hello@example.com';
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    expect(message.textContent).toContain('Thanks!');
  });
});
