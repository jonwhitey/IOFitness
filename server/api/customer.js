const express = require('express');
const logger = require('../logs.js');
const Workout = require('../models/Workout.js');

const router = express.Router();

router.use((req, res, next) => {
  if (!req.user) {
    console.log('no user');
    console.log(req);
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  next();
});

// List of API:
// 1. /buy-book
// 2. /my-books

router.post('/buy-book', async (req, res) => {
  const { id, stripeToken } = req.body;

  try {
    await Book.buy({ id, stripeToken, user: req.user });
    res.json({ done: 1 });
  } catch (err) {
    logger.error(err);
    res.json({ error: err.message || err.toString() });
  }
});

// GetMyBooks route

router.get('/workout', async (req, res) => {
  console.log('HIT /workout');
  console.log(req);
  try {
    const uid = req.user;
    const { workout } = await Workout.getNextWorkout({ uid });

    res.json({ workout });
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

module.exports = router;
