const mongoose = require('mongoose');

after(async () => {
  await mongoose.connection.close();
  console.log('Mongoose connection closed');
});
