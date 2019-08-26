const mongoose = require('mongoose');
const { mongoose,
        options,
        MONGO_URL,} = require('../app.js');
const dev = process.env.NODE_ENV !== 'production';


const connect = async () => {
  await mongoose.connect(MONGO_URL, options);
};

const disconnect = async () => {
  await mongoose.disconnect();
};

module.exports = {
  connectAndDrop,
  disconnect,
};
