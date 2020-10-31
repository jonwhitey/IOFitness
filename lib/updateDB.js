const mongoose = require('mongoose');
const dbConnect = require('../server/middleware/database');

async function updateDB(collection, db) {
  dbConnect();
  try {
    console.log('call updateDB');
    const result = await collection.insertMany(db);
    console.log('success!');
    await mongoose.connection.close();
    return result;
  } catch (e) {
    console.log(e);
    await mongoose.connection.close();
    return e;
  }
}

module.exports = updateDB;
