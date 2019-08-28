const { options, MONGO_URL } = './app.js';
const mongoose = require('mongoose');

const connect = async () => {
  await mongoose.connect(MONGO_URL, options);
};

const disconnect = async () => {
  await mongoose.disconnect();
};

module.exports = {
  connect,
  disconnect,
};
