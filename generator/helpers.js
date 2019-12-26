/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const async = require('async');
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
      return f();
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

exports.createNaming = name => ({
  name,
  naMe: camelCase(name),
  Name: upperFirst(camelCase(name)),
  NA_ME: snakeCase(name).toUpperCase(),
});

exports.createFiles = (directory, files, force) =>
  files.map(([name, content]) => createFile(directory + '/' + name, content, force));

exports.createModule = (directory, files, force) => {
  exists(directory).then(ex => {
    if (!ex) {
      return console.log('Error!! ' + directory + 'Directory exists');
    }
    return createDirectory(directory).then(() => {
      return createFiles(directory, files, force);
    });
  });
};

exports.injectDependencies = (filename, replacements = []) => {
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
          console.log(x);
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
};

exports.createFilesList = (naming, main, spec, story, style) => {
  const x = [
    [naming.name + '.ts', main(naming)],
    [naming.name + '.spec.ts', spec(naming)],
  ];

  if (story) {
    x.push(['story.ts', story(naming)]);
  }

  if (style) {
    x.push(['style.module.scss', story(naming)]);
  }

  return x;
};
