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

## Development
`npm start`

## Unit Testing
`npm test`

## Build Production
`npm run build`


## Code conventions 
Comming soon