#! /usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const fcTemplate = require('./templates/container');
const classTemplate = require('./templates/classContainer');
const templateSpec = require('./templates/containerSpec');
const templateStory = require('./templates/containerStory');
const templateStyles = require('./templates/styles');
const { createModule, createNaming, createFilesList, injectDependencies } = require('./helpers');

module.exports = function(name, force, type) {
  if (!name) {
    console.log('Please type container name');
    console.log('node ./generator container {name} {forceRewriteFiles="force"} {type="class|func(default)"}');
    return;
  }

  const naming = createNaming(name);

  const path = `./src/pages/${naming.Name}`;

  const template = type === 'class' ? classTemplate : fcTemplate;

  const files = createFilesList(naming, true, { template, templateSpec, templateStory, templateStyles });

  const replacements = [
    ['// inject import', `const ${naming.Name} = lazy(() => import('./pages/${naming.Name}'));`],
    ['{/* inject usage */}', `          <Route path={Routes.${naming.Name}} exact component={${naming.Name}} />`],
  ];

  const replacementsConstants = [['// inject definition', `  ${naming.Name} = '/${naming.name}',`]];

  createModule(path, files, force === 'force');
  injectDependencies('./src/App.tsx', replacements);
  injectDependencies('./src/constants.ts', replacementsConstants);
};
