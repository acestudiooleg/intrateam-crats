/* eslint-disable @typescript-eslint/no-var-requires */
const consoleParser = require('./consoleParser');
const action = require('./action');
const reducer = require('./reducer');
const saga = require('./saga');
const component = require('./component');
const container = require('./container');
const page = require('./page');

const args = consoleParser();

const { _, name, force, type, skip } = args;

if (_ && name) {
  const schema = {
    action: () => action(name, force),
    reducer: () => reducer(name, force, skip),
    saga: () => saga(name, force, skip),
    component: () => component(name, force, type),
    container: () => container(name, force, type),
    page: () => page(name, force, type),
  };

  if (_ in schema) {
    schema[_]();
  } else {
    console.log(`"${_}" - type does not exists in templates`);
  }
}
