#! /usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const fcTemplate = require('./templates/component');
const classTemplate = require('./templates/classComponent');
const templateSpec = require('./templates/componentSpec');
const templateStory = require('./templates/componentStory');
const templateStyles = require('./templates/styles');
const { createModule, createNaming, createFilesList } = require('./helpers');

module.exports = function(name, force, type) {
  if (!name) {
    console.log('Please type component name');
    console.log('node ./generator component {name} {forceRewriteFiles="force"} {type="class|func(default)"}');
    return;
  }

  const naming = createNaming(name);

  const path = `./src/components/${naming.Name}`;

  const template = type === 'class' ? classTemplate : fcTemplate;

  const files = createFilesList(naming, true, { template, templateSpec, templateStory, templateStyles });

  createModule(path, files, force === 'force');
};
