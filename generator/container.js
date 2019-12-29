#! /usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const fcTemplate = require('./templates/container');
const classTemplate = require('./templates/classContainer');
const templateSpec = require('./templates/containerSpec');
const templateStory = require('./templates/containerStory');
const templateStyles = require('./templates/styles');
const { createModule, createNaming, createFilesList } = require('./helpers');

module.exports = function(name, force, type) {
  if (!name) {
    console.log('Please type container name');
    console.log('node ./generator container {name} {forceRewriteFiles="force"} {type="class|func(default)"}');
    return;
  }

  const naming = createNaming(name);

  const path = `./src/containers/${naming.Name}`;

  const template = type === 'class' ? classTemplate : fcTemplate;

  const files = createFilesList(naming, true, { template, templateSpec, templateStory, templateStyles });

  createModule(path, files, force === 'force');
};
