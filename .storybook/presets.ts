const path = require("path");

module.exports = [
    {
      name: '@storybook/preset-create-react-app',
      options: {
        scriptsPackageName: '@my/react-scripts',
        tsDocgenLoaderOptions: {
          tsconfigPath: path.resolve(__dirname, "../tsconfig.json")
        },
      },
    }
  ];