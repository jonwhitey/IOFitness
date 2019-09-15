const { assert } = require('chai');
const request = require('supertest');


describe('User visits login page,', () => {
  describe('without being logged in', () => {
    it('renders the login form', async () => {
      await browser.url('/login');
      const title = await browser.getTitle();
      assert.equal(title, 'Log in to Builder Book')
    });
    it('sends a request to /login when the submit button is clicked', async () => {
      await browser.url('/login');

      // set up
      $('#username').setValue('jonathan42white@gmail.com');
      $('#password').setValue('go1234')

      // execute
      const submitResponse = await clientInformation.submitForm('#loginForm');

      // verify

      assert.ok(submitResponse, )


    });
  });
});

