const mongoose = require('mongoose');
const User = require('../server/models/User');

after(async () => {
  await User.deleteOne({ email: 'jonathan.e.white@colorado.edu' });
  await mongoose.connection.close();
  console.log('Mongoose connection closed');
});
