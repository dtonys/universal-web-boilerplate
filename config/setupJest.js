import path from 'path';
import dotenv from 'dotenv';
import 'raf/polyfill';
import 'jest-enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

// setup envs
const envs = dotenv.load({ path: path.resolve(__dirname, '../.env') });
Object.assign(window, envs.parsed, {
  __SERVER__: 'false',
  __CLIENT__: 'true',
  __TEST__: 'true',
});

// mock local storage
// https://github.com/tmpvar/jsdom/issues/1137
const inMemoryLocalStorage = {};
window.localStorage = {
  setItem(key, val) {
    inMemoryLocalStorage[key] = val;
  },
  getItem(key) {
    return inMemoryLocalStorage[key];
  },
  removeItem(key) {
    delete inMemoryLocalStorage[key];
  },
};

// mock fetch API
global.fetch = require('jest-fetch-mock');
