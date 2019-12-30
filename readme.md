# intrateam create-react-app typescript

## Packages
- [Redux](https://redux.js.org/) - state manager for application
- [Redux-Saga](https://redux-saga.js.org/) - side-effects manager (controller of application)
- [React Router](https://reacttraining.com/react-router/web/guides/quick-start) - Routes manager
- [Connected React Router](https://github.com/supasate/connected-react-router) - Redux Based Router
- [Reselect](https://github.com/reduxjs/reselect) - Data selector with memoization
- [Reactstrap](https://reactstrap.github.io/) - Bootsrap CSS Framework Components for React
- [Redux Create Reducer](https://github.com/kolodny/redux-create-reducer#readme) - Provides convinient interface for creating reducers
- [Lodash](https://lodash.com/docs/4.17.15) - Swiss knife for data manipulation
- [Storybook](https://storybook.js.org/docs/basics/writing-stories/) - Catalog of applicaton components (Components development and documentaton)


## Folders structure
- actions - Contain types and action creators of applicaton
- components - Stupid components of application
- containers - Smart components connected to redux tree
- pages - Pages (routes - root components) of applications
- reducers - Redux tree transformers (Pure functions)
- sagas - Redux Sagas  (JS Generators) - works with async operations (data transfer)
- selectors - Reselect data selectors with memoization
- utils - Reusable pieces of code

## Component, Container, Page - Structure
- Folder like Component name (Login, Users)
    - index.tsx - Component file
    - [name].spec.tsx - Component Test file
    - styles.module.scss - Component styles
    - story.tsx - Storybook file
    - types.ts - Component types



## Instalation
`npm install`
copy file `.env.local.sample` -> `.env.local`

## Development
`npm start`

## Unit Testing
`npm test`

## Build Production
`npm run build`

## Template Generator
There are custom prepared templates almost for all types of files
basic syntax `node ./generator {type} [name] (--name | -n) --force (-f) --skip (-s)`
where 
- `type` - type of template (action, reducer, saga, component, container, page)
- `name` - name of file or module (users, user-orders etc.)
- `force` -  rewrite files if already exists
- `skip` -  depends of template type could skip some files and don't create these files

### Templates

#### Action - creates
- `{name}.ts` and `{name}.spec.ts` in `src/actions` folder, doesn't have `{skip}` param
- `node ./generator action coca-cola -f`
- `npm run g:a -- coca-cola -f`

#### Reducer - creates
- `{name}.ts` and `{name}.spec.ts` in `src/reducers` folder
- import and usage of `{name}.ts` will be automatically added to `src/reducers/index.ts` file
- `{name}.ts` and `{name}.spec.ts` in `src/actions` folder,
- `{skip}` parameter is `boolean` means skip `action` creation
- `node ./generator reducer coca-cola --force --skip`
- `npm run g:r -- coca-cola -f -s`

#### Saga - creates
- `{name}.ts` and `{name}.spec.ts` in `src/sagas` folder, 
- import and usage of `{name}.ts` will be automatically added to `src/sagas/index.ts` file
- `{name}.ts` and `{name}.spec.ts` in `src/reducers` folder, 
- import and usage of `{name}.ts` will be automatically added to `src/reducers/index.ts` file
- `{name}.ts` and `{name}.spec.ts` in `src/actions` folder,
- `{skip}` parameter is comma separated `string`, could skip `reducer` and/or `action` means skip `action` creation
- `node ./generator saga coca-cola --skip r,a -f` - skip `reducer` and `action` creation
- `npm run g:s -- coca-cola -s r` - skip `reducer` creation
- `npm run g:s -- coca-cola -s a` - skip `action` creation

#### Component - creates
- `{name}` folder in `src/components`
- `index.tsx`, `test.spec.ts`, `story.tsx`, `styles.module.scss` in `src/components/{name}` folder
- `{type}` parameter - responsible for type of component (Functional Component or Class Component) - `class|func`, func - default value
- `node ./generator component coca-cola --type class` - create class component
- `npm run g:com -- coca-cola -f` - create functional component
- `npm run g:com -- coca-cola -t class` - create class component

#### Container - creates
- `{name}` folder in `src/containers`
- `index.tsx`, `test.spec.ts`, `story.tsx`, `styles.module.scss` in `src/containers/{name}` folder
- `{type}` parameter - responsible for type of component (Functional Component or Class Component) - `class|func`, func - default value
- `node ./generator component coca-cola --type class` - create class component
- `npm run g:com -- coca-cola -f` - create functional component
- `npm run g:com -- coca-cola -t class` - create class component

#### Page - creates
- `{name}` folder in `src/pages`
- `index.tsx`, `test.spec.ts`, `story.tsx`, `styles.module.scss` in `src/pages/{name}` folder
- `{type}` parameter - responsible for type of component (Functional Component or Class Component) - `class|func`, func - default value
- `node ./generator component coca-cola --type class` - create class component
- `npm run g:com -- coca-cola -f` - create functional component
- `npm run g:com -- coca-cola -t class` - create class component


## Code conventions 
Comming soon