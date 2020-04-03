const puppeteer = require('puppeteer');
const { assert } = require('chai');

let browser;
let page;

describe('Sign Up and Log In Flow', () => {
  before(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
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
    const works = await page.waitForSelector('#purchased-books');
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
    page.keyboard.press('Enter');
    const works = await page.waitForSelector('#purchased-books');
    assert.exists(works, 'it works!');
  });

  after(async () => {
    await browser.close();
  });
});
