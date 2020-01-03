#! /usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const template = require('./templates/reducer');
const templateSpec = require('./templates/reducerSpec');
const action = require('./action');
const { createFiles, createNaming, injectDependencies, createFilesList } = require('./helpers');

module.exports = function(name, force, skip) {
  if (!name) {
    console.log('Please type reducer name');
    console.log('node ./generator reducer {name} {forceRewriteFiles} {skipActionsGenerator}');
    return;
  }

  const naming = createNaming(name);

  const path = './src/reducers';

  const replacemets = [
    ['// inject import', `import ${naming.naMe} from './${name}';`],
    ['// inject usage', `    ${naming.naMe},`],
  ];

  const files = createFilesList(naming, false, { template, templateSpec });

  if (!skip) {
    action(name, force);
  }

  createFiles(path, files, force === 'force');
  injectDependencies(path + '/index.ts', replacemets);
};
