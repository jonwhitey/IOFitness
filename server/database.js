const { options, MONGO_URL } = './app.js';
const mongoose = require('mongoose');
<<<<<<< HEAD

=======
const { mongoose,
        options,
        MONGO_URL,} = require('../app.js');
const dev = process.env.NODE_ENV !== 'production';
>>>>>>> parent of 06ff214... Begin test suite 2


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
