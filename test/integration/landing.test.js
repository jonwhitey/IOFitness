const puppeteer = require('puppeteer');
const { assert } = require('chai');

let browser;
let page;

describe('Landing Page', () => {
  before(async () => {
    console.log('launching browser');
    browser = await puppeteer.launch({ headless: false });
    console.log('browser launched, opening new page');
    page = await browser.newPage();
    console.log('new page open');
  });

  it('logs an existing user into the site', async () => {
    await page.goto('http://localhost:8000/login');
    await page.type('[name="email"]', 'jonwhitey42@icloud.com');
    await page.type('[name="password"]', 'Start!123');
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

  after(async () => {
    await browser.close();
  });
});

