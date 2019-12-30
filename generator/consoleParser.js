/* eslint-disable @typescript-eslint/no-var-requires */
const yargs = require('yargs');

const create = (md, arr) => arr.reduce((m, o) => m.command(o.main, o.desc, o.opts), md);

module.exports = () => {
  const nameOpt = type => ({
    description: `Name of ${type} file`,
    alias: 'n',
    type: 'string',
  });

  const skipOpt = (description, type = 'string', choices) => ({
    description,
    type,
    alias: 's',
    ...(choices ? { choices } : {}),
  });

  const force = {
    alias: 'f',
    description: 'Force to rewrite files which already exist',
    type: 'boolean',
  };

  const act = {
    main: 'action [name]',
    desc: '- creates "{name}.ts" in "src/actions" folder\n\n',
    opts: {
      force,
      name: nameOpt('action'),
    },
  };

  const red = {
    main: 'reducer [name]',
    desc:
      'creates "{name}.ts", "{name}.spec.ts" in "src/reducers" folder and the same for Action if [skip] param is not provided\n\n',
    opts: {
      force,
      name: nameOpt('reducer'),
      skip: skipOpt('Skip "action" files creation', 'boolean'),
    },
  };

  const sag = {
    main: 'saga [name]',
    desc:
      'creates "{name}.ts", "{name}.spec.ts" in "src/sagas" folder and the same for Reducer and Action if [skip] param is not provided\n\n',
    opts: {
      force,
      name: nameOpt('saga'),
      skip: skipOpt('Skip "action" and/or "reducers" files creation', 'string', ['r', 'a', 'r,a']),
    },
  };

  const com = {
    main: 'component [name]',
    desc:
      'creates "{name}" folder in "src/components", "index.tsx" "test.spec.tsx",' +
      ' "story.tsx", "styles.module.scss" in "src/components/{name}" folder.\n\n',
    opts: {
      force,
      name: nameOpt('component'),
      type: {
        alias: 't',
        description: 'type of component Class or Function',
        type: 'string',
        default: 'func',
        choices: ['class', 'func'],
      },
    },
  };

  const con = {
    main: 'container [name]',
    desc:
      'creates "{name}" folder in "src/containers", "index.tsx" "test.spec.tsx",' +
      ' "story.tsx", "styles.module.scss" in "src/containers/{name}" folder.\n\n',
    opts: {
      force,
      name: nameOpt('container'),
      type: {
        alias: 't',
        description: 'type of component Class or Function',
        type: 'string',
        default: 'func',
        choices: ['class', 'func'],
      },
    },
  };

  const pag = {
    main: 'page [name]',
    desc:
      'creates "{name}" folder in "src/pages", "index.tsx" "test.spec.tsx",' +
      ' "story.tsx", "styles.module.scss" in "src/pages/{name}" folder.\n\n',
    opts: {
      force,
      name: nameOpt('page'),
      type: {
        alias: 't',
        description: 'type of component Class or Function',
        type: 'string',
        default: 'func',
        choices: ['class', 'func'],
      },
    },
  };

  const commands = create(yargs.scriptName('node ./generator'), [act, red, sag, com, con, pag]);

  const args = commands.help().alias('help', 'h').argv;

  if (!args.name) {
    commands.showHelp();
  }

  return args;
};
