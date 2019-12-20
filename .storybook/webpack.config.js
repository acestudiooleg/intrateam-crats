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
  loaders: [
    {
      loader: require.resolve('awesome-typescript-loader'),
    }
  ],
};

const storysource = {
  test,
  loaders: [
    {
      loader: require.resolve('@storybook/source-loader'),
      options: { parser: 'typescript' },
    },
  ],
  enforce: 'pre',
};



module.exports = ({config}) => {
  config.module.rules.push(reactApp);
  config.module.rules.push(storysource);
  config.resolve.extensions.push(...extensions);
  replaceEnv(config.plugins);

  return config;
};
