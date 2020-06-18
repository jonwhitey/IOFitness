const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const helmet = require('helmet');
const path = require('path');
const sitemapAndRobots = require('./sitemapAndRobots');

const auth = require('./auth');
const { setupGithub } = require('./github');
const api = require('./api/index');

const logger = require('./logs');
const { insertTemplates } = require('./models/EmailTemplate');
const routesWithSlug = require('./routesWithSlug');
const getRootUrl = require('../lib/api/getRootUrl');

require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production';

const MONGO_URL = dev ? process.env.MONGO_URL_TEST : process.env.MONGO_URL;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

mongoose.connect(MONGO_URL, options);

const port = process.env.PORT || 8000;
const ROOT_URL = getRootUrl();

const URL_MAP = {
  '/login': '/public/signUpParent',
  '/signup': '/public/signUpParent',
  '/workout': '/customer/workoutParent',
  '/my-account': '/customer/my-account',
  '/': '/customer/landing',
  '/logout': '/public/signUpParent',
};

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const server = express();
  server.use(helmet());
  server.use(express.static(path.join(__dirname, '_next', 'static')));
  server.use(express.json());

  server.get('/_next*', (req, res) => {
    console.log('/_next');
    //console.log(req.route.stack);
    handle(req, res);
  });

  server.get('/static/*', (req, res) => {
    console.log('/static');
    console.log(req.route);
    handle(req, res);
  });

  auth({ ROOT_URL, server });
  api(server);

  await insertTemplates();

  setupGithub({ server });
  routesWithSlug({ server, app });
  //sitemapAndRobots({ server });

  server.get('*', (req, res) => {
    const url = URL_MAP[req.path];
    console.log(`app.js - GET request req.url: ${url}`);
    console.log(req.path);
    if (url) {
      console.log(url);
      app.render(req, res, url);
    } else {
      console.log('Being handled');
      handle(req, res);
    }
  });

  server.listen(port, (err) => {
    if (err) throw err;
    logger.info(`> Ready on ${ROOT_URL}`);
  });
});

module.exports = { app };
