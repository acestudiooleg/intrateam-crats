const path = require('path');
const _ = require('lodash');

const reactEnvsSource = _.pickBy(process.env, (val, key) => /REACT/.test(key));
const reactEnvs = {};
_.forEach(reactEnvsSource, (value, key) => {
  reactEnvs[key] = JSON.stringify(value);
});

const replaceEnv = plugins =>
  plugins.forEach((pl, ind) => {
    if (pl.definitions && pl.definitions['process.env']) {
      pl.definitions['process.env'] = Object.assign({}, reactEnvs, pl.definitions['process.env']);
    }
  });

const extensions = ['.ts', '.tsx', '.json'];

const test = /\.(ts|tsx)$/;

const reactApp = {
  test,
  loader: require.resolve('babel-loader'),
  options: {
    presets: [['react-app', { flow: false, typescript: true }]],
  },
};

const storysource = {
  test,
  loader: require.resolve('@storybook/addon-storysource/loader'),
  enforce: 'pre',
  options: { parser: 'typescript' },
};



module.exports = ({config}) => {
  config.module.rules.push(reactApp);
  config.module.rules.push(storysource);
  config.resolve.extensions.push(...extensions);
  replaceEnv(config.plugins);

  return config;
};
