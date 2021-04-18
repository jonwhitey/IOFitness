const mongoose = require('mongoose');

const connection = {}; /* creating connection object */
require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production';

const MONGO_URL = dev ? process.env.MONGO_URL_TEST : process.env.MONGO_URL;

async function dbConnect() {
  /* check if we have connection to our databse */
  if (connection.isConnected) {
    return;
  }

  /* connecting to our database */
  const db = await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  connection.isConnected = db.connections[0].readyState;
}

module.exports = dbConnect;
