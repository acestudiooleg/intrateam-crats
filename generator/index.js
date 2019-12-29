/* eslint-disable @typescript-eslint/no-var-requires */
const action = require('./action');
const reducer = require('./reducer');
const saga = require('./saga');
const component = require('./component');
const container = require('./container');

const type = process.argv[2];
const name = process.argv[3];
const force = process.argv[4];
const skip = process.argv[5];
const componentType = skip;

const schema = {
  action: () => action(name, force),
  reducer: () => reducer(name, force, skip),
  saga: () => saga(name, force, skip),
  component: () => component(name, force, componentType),
  container: () => container(name, force, componentType),
};

if (type in schema) {
  schema[type]();
} else {
  console.log(`"${type}" - type does not exists in templates`);
}
