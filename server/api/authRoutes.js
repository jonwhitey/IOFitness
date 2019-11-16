const express = require('express');
const passport = require('passport');

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
  (req, res) => {
    if (req.query && req.query.redirectUrl && req.query.redirectUrl.startsWith('/')) {
      req.session.finalUrl = req.query.redirectUrl;
    } else {
      req.session.finalUrl = null;
    }
    if (req.user && req.user.isAdmin) {
      res.json({ status: 200, redirect: '/admin', isAdmin: true });
    } else if (!req.user) {
      res.json({ status: 403, message: 'Incorrect username or password' });
    } else if (req.session.finalUrl) {
      res.json({ redirect: req.session.finalUrl });
    } else {
      res.json({ status: 200, username: req.user.username });
      console.log(`Login Success ${res.json()}`);
      res.send();
    }
  },
  (err, req, res) => {
    console.log('ERROR!!!');
    console.log(err);
    console.log(req);
    console.log(res);
  },
);

module.exports = router;
