/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const { camelCase, upperFirst, snakeCase } = require('lodash');

const fileHandler = function(file, s, f) {
  return function(err) {
    if (err) {
      f(err);
      return;
    }
    console.log(file + ' has been saved');
    s();
  };
};

const exists = directory =>
  new Promise(s => {
    fs.access(directory, fs.F_OK, err => {
      if (err) {
        return s(false);
      }
      return s(true);
    });
  });

const createDirectory = directory =>
  new Promise((s, f) => {
    fs.mkdir(directory, '0755', err => {
      if (err) {
        return f(err);
      }
      return s();
    });
  });

const createFile = (filename, content, force) =>
  new Promise((s, f) => {
    exists(filename).then(ex => {
      if (ex && !force) {
        const m = 'Error!! ' + filename + ' exists';
        console.log(m);
        f(m);
        return;
      }
      fs.writeFile(filename, content, fileHandler(filename, s, f));
    });
  });

const getFile = path =>
  new Promise((s, f) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        return f(err);
      }
      return s(data);
    });
  });

function createNaming(name) {
  return {
    name,
    naMe: camelCase(name),
    Name: upperFirst(camelCase(name)),
    NA_ME: snakeCase(name).toUpperCase(),
  };
}

/**
 * Creates files with content
 *
 * @param {string} directory
 * @param {[string[]]} files
 * @param {boolean} force
 */
function createFiles(directory, files, force) {
  return files.map(([name, content]) => createFile(directory + '/' + name, content, force));
}

/**
 * Create folder and files inside with content (!One level of nesting)
 *
 * @param {string} directory
 * @param {[string[]]} files - names and contents for files
 * @param {boolean} force - rewrite file if exists
 */
function createModule(directory, files, force) {
  exists(directory).then(ex => {
    if (ex) {
      return console.log('Error!! ' + directory + ' - Directory exists');
    }
    return createDirectory(directory).then(() => {
      return createFiles(directory, files, force);
    });
  });
}

/**
 *
 * Inject dependencies to file by pattern
 * @param {string} filename
 * @param {[string[]]} replacements
 */
function injectDependencies(filename, replacements) {
  getFile(filename)
    .then(text => {
      let shouldRewrite = false;
      const newContent = replacements.reduce((accumText, [pattern, content]) => {
        if (text.indexOf(content) !== -1) {
          return accumText;
        }

        if (text.indexOf(pattern) !== -1) {
          shouldRewrite = true;
          const [before, after] = accumText.split(pattern);
          const x = [before, pattern, '\n', content, after].join('');
          return x;
        }
        return accumText;
      }, text);

      if (shouldRewrite) {
        createFile(filename, newContent, true);
      }
    })
    .catch(err => {
      console.error(err);
    });
}
/**
 *
 *
 * @param {{name: string, naMe: string, NA_ME: string, NaMe: string}} naming - object with different cases of names
 * @param {(naming) => string} main - main file
 * @param {(naming) => string} spec - test file
 * @param {(naming) => string} story - story file
 * @param {(naming) => string} style - styles file
 * @returns
 */
function createFilesList(naming, isModule, templates) {
  const mainFileName = isModule ? 'index.tsx' : naming.name + '.ts';
  const specFileName = isModule ? 'test.spec.tsx' : naming.name + '.spec.ts';
  const x = [
    [mainFileName, templates.template(naming)],
    [specFileName, templates.templateSpec(naming)],
  ];

  if (templates.templateStory) {
    x.push(['story.tsx', templates.templateStory(naming)]);
  }

  if (templates.templateStyles) {
    x.push(['style.module.scss', templates.templateStyles(naming)]);
  }

  return x;
}

exports.createNaming = createNaming;
exports.createFiles = createFiles;
exports.createModule = createModule;
exports.injectDependencies = injectDependencies;
exports.createFilesList = createFilesList;
