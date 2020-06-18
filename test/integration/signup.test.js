const puppeteer = require('puppeteer');
const { assert } = require('chai');

let browser;
let page;

describe('Puppeteer Sign Up and Log In Flow', () => {
  before(async () => {
    console.log('launching browser');
    browser = await puppeteer.launch({ headless: false });
    console.log('browser launched, opening new page');
    page = await browser.newPage();
    console.log('new page open');
  });

  it('takes input and creates a new user', async () => {
    console.log('visiting page');
    await page.goto('http://localhost:8000/signup' /* { waitUntil: 'networkidle0' } */);
    console.log('at page');
    // Type a keyword into the search box and press enter
    await page.type('#firstName', 'Jonathan');
    await page.type('#lastName', 'White');
    await page.type('[name="email"]', 'jonathan.e.white@colorado.edu');
    await page.type('[name="password"]', 'Start!123!');

    page.keyboard.press('Enter');

    // Wait for the results page to load and display the results
    const works = await page.waitForSelector('#login-success');
    assert.exists(works, 'it works!');
  });

  it('logs a user out', async () => {
    await page.goto('http://localhost:8000');
    await page.click('#menu-button');
    console.log('clicked menu');
    await page.click('#logout-button');
    const works = await page.waitForSelector('#login-title');
    assert.exists(works, 'it works!');
  });

  it('log an existing user into the site', async () => {
    await page.goto('http://localhost:8000/login');
    await page.type('[name="email"]', 'jonathan.e.white@colorado.edu');
    await page.type('[name="password"]', 'Start!123!');
    await page.click('#remember_me');
    page.keyboard.press('Enter');
    const works = await page.waitForSelector('#login-success');
    assert.exists(works, 'it works!');
  });

  it('logs a user out', async () => {
    await page.goto('http://localhost:8000');
    await page.click('#menu-button');
    console.log('clicked menu');
    await page.click('#logout-button');
    const works = await page.waitForSelector('#login-title');
    assert.exists(works, 'it works!');
  });

  it('log an existing user into the site w/ remember_me and deselects reember_me', async () => {
    await page.goto('http://localhost:8000/login');
    await page.type('[name="password"]', 'Start!123!');
    await page.click('#remember_me');
    page.keyboard.press('Enter');
    const works = await page.waitForSelector('#login-success');
    assert.exists(works, 'it works!');
  });

  it('logs a user out', async () => {
    await page.goto('http://localhost:8000');
    await page.click('#menu-button');
    console.log('clicked menu');
    await page.click('#logout-button');
    const works = await page.waitForSelector('#login-title');
    assert.exists(works, 'it works!');
  });

  it('login and check that remember_me is gone', async () => {
    await page.goto('http://localhost:8000/login');
    await page.type('[name="email"]', 'jonathan.e.white@colorado.edu');
    await page.type('[name="password"]', 'Start!123!');
    page.keyboard.press('Enter');
    const works = await page.waitForSelector('#login-success');
    assert.exists(works, 'it works!');
  });

  it('navigates to the  my account with the menu drop down', async () => {
    await page.goto('http://localhost:8000');
    await page.click('#menu-button');
    console.log('clicked menu');
    await page.click('#my-account-button');
    const works = await page.waitForSelector('#my-account');
    assert.exists(works, 'it works!');
  });

  it('navigates to the my account page and fills out the delete user form', async () => {
    await page.goto('http://localhost:8000/my-account');
    await page.click('#panel1a-header');
    await page.type('[name="email"]', 'jonathan.e.white@colorado.edu');
    await page.type('[name="password"]', 'Start!123!');
    await page.click('#delete-user-button');

    const success = await page.waitForSelector('#login-title');
    assert.exists(success, 'it works!');
  });

  it('fails to login after the account has been deleted', async () => {
    await page.goto('http://localhost:8000/login');
    await page.type('[name="email"]', 'jonathan.e.white@colorado.edu');
    await page.type('[name="password"]', 'Start!123!');
    page.keyboard.press('Enter');
    const success = await page.waitForSelector('#login-title');
    assert.exists(success, 'it works!');
  });

  after(async () => {
    await browser.close();
  });
});
