const express = require('express');
const passport = require('passport');
const RememberMeToken = require('../models/RememberMeToken');
const randomString = require('../../lib/randomString');

const router = express.Router();

router.get('/_next/static/*', (req, res, next) => {
  console.log(`get request for: ${req.url}, ${req.method}`);
  next();
});

/*
   when you get to /auth/google and you have a complete request,
   call passport.authenticate, choose profile, and send to /oauth2callback
  */
router.get('/auth/google', (req, res, next) => {
  if (req.query && req.query.redirectUrl && req.query.redirectUrl.startsWith('/')) {
    req.session.finalUrl = req.query.redirectUrl;
  } else {
    req.session.finalUrl = null;
  }

  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
  })(req, res, next);
});

router.get(
  '/oauth2callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
  }),
  (req, res) => {
    if (req.user && req.user.isAdmin) {
      res.redirect('/admin');
    } else if (req.session.finalUrl) {
      res.redirect(req.session.finalUrl);
    } else {
      res.redirect('/my-books');
    }
  },
);

router.get('/logout', (req, res) => {
  console.log('logging out');
  req.logout();
  res.redirect('/login');
});

router.post(
  ['/loginLocal', '/signUpLocal'],
  passport.authenticate('local', { failWithError: true }),

  (req, res, next) => {
    console.log(`post to loginLocal/signUpLocal - req.body.rememberMe`);
    console.log(req.body.rememberMe);

    if (req.body.rememberMe) {
      console.log('REMEMBER ME!');
      const token = randomString(64);
      const uid = req.user.id;
      console.log(`uid = ${uid}`);
      // eslint-disable-next-line func-names
      RememberMeToken.saveToken(token, uid);
      res.cookie('remember_me', token, {
        path: '/',
        httpOnly: true,
        maxAge: 604800000,
      }); // 7 days
      console.log(`COOKIE:`);
    }

    if (req.query && req.query.redirectUrl && req.query.redirectUrl.startsWith('/')) {
      req.session.finalUrl = req.query.redirectUrl;
    } else {
      req.session.finalUrl = null;
    }
    if (req.user && req.user.isAdmin) {
      // res.json({ status: 200, redirect: '/admin', isAdmin: true });
      console.log(` user and user.isAdmin: res.json ${res.json}`);
    } else if (!req.user) {
      // res.json({ status: 403, message: 'Incorrect username or password' });
      console.log(` not user: res.json ${res.json}`);
    } else if (req.session.finalUrl) {
      // res.json({ redirect: req.session.finalUrl });
      console.log(` finalUrl: finalUrl ${req.session.finalUrl}`);
    } else {
      // res.json({ status: 200, username: req.user.username });
      console.log(`Login Success`);

      // console.log(res.status + res.user + res.redirect);
      res.send();
      console.log(res.redirect);
      console.log('should have redirected');
      next();
      // I think this next() call is fucking everything up
    }
  },
  (err, req, res, next) => {
    console.log(`ERROR!!!`);
    return next();
  },
);

module.exports = router;
