#! /usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const template = require('./templates/action');
const templateSpec = require('./templates/actionSpec');
const { createFiles, createNaming, createFilesList } = require('./helpers');

module.exports = function(name, force) {
  if (!name) {
    console.log('Please type reducer name');
    console.log('node ./generator actgion {actionName} {forceRewriteFiles}');
    return;
  }

  const path = './src/actions';
  const naming = createNaming(name);
  const files = createFilesList(naming, template, templateSpec);

  createFiles(path, files, force === 'force');
};
