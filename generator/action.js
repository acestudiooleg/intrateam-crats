#! /usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const template = require('./templates/action');
const templateSpec = require('./templates/actionSpec');
const { createFiles, createNaming, createFilesList } = require('./helpers');

module.exports = function(name, force) {
  if (!name) {
    console.log('Please type action name');
    console.log('node ./generator action {name} {forceRewriteFiles}');
    return;
  }

  const path = './src/actions';
  const naming = createNaming(name);
  const files = createFilesList(naming, false, { template, templateSpec });

  createFiles(path, files, force === 'force');
};
