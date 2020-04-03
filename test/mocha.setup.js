import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const { JSDOM } = require('jsdom');
const mongoose = require('mongoose');
const User = require('../server/models/User');

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
  console.log('Mongoose connection open');
  await User.deleteOne({ email: 'jonathan.e.white@colorado.edu' });
  console.log('User deleted');
});

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
global.requestAnimationFrame = function(callback) {
  return setTimeout(callback, 0);
};
global.cancelAnimationFrame = function(id) {
  clearTimeout(id);
};
copyProps(window, global);
