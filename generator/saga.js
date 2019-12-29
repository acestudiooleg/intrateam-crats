#! /usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const template = require('./templates/saga');
const templateSpec = require('./templates/sagaSpec');
const reducer = require('./reducer');
const { createFiles, createNaming, injectDependencies, createFilesList } = require('./helpers');

module.exports = function(name, force, skip) {
  if (!name) {
    console.log('Please type saga name');
    console.log('node ./generator saga {name} {forceRewriteFiles="force"} {skipActionsOrReducerGenerator="r,a|r|a"}');
    return;
  }

  const naming = createNaming(name);

  const skipParams = {
    r: false,
    a: false,
  };

  const path = './src/sagas';

  const replacements = [
    ['// inject import', `import ${naming.naMe} from './${name}';`],
    ['// inject usage', `    ${naming.naMe},`],
  ];

  const files = createFilesList(naming, false, { template, templateSpec });

  if (skip) {
    skip.split(',').forEach(type => {
      if (type === 'r') {
        skipParams.r = true;
      }
      if (type === 'a') {
        skipParams.a = true;
      }
    });
  }

  if (!skipParams.r) {
    reducer(name, force, skipParams.a);
  }

  createFiles(path, files, force === 'force');
  injectDependencies(path + '/index.ts', replacements);
};
