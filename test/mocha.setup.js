import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const mongoose = require('mongoose');
require('dotenv').config();

Enzyme.configure({ adapter: new Adapter() });

const dev = process.env.NODE_ENV !== 'production';

const MONGO_URL = dev ? process.env.MONGO_URL_TEST : process.env.MONGO_URL;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

before(async function() {
  await mongoose.connect(MONGO_URL, options);
  console.log('Mongoose connection open')
});
