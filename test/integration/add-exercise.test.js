/*
const puppeteer = require('puppeteer');
const { assert } = require('chai');
const { before, after } = require('mocha');

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
    await page.goto('http://localhost:3000/login');
    await page.type('[name="email"]', 'jonwhitey42@icloud.com');
    await page.type('[name="password"]', 'Start!123');
    await page.click('#remember_me');
    page.keyboard.press('Enter');
    const works = await page.waitForSelector('#login-success');
    assert.exists(works, 'it works!');
  });

  it('navigates to the add-exercise page', async () => {
    await page.goto('http://localhost:3000/add-exercise');
    const works = await page.waitForSelector('#add-exercise');
    assert.exists(works, 'it works!');
  });

  it('logs a user out', async () => {
    await page.goto('http://localhost:3000');
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
*/
