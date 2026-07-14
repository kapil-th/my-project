/**
 * @jest-environment jsdom
 */

describe('TopNotch launch page', () => {
  beforeAll(async () => {
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

    await import('../script');
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
