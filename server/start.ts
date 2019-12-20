require('@babel/register')({
    ignore: [ /(node_modules)/ ],
    presets: [[
        "@babel/preset-env", {
            "useBuiltIns": "entry",
            "corejs": 3
        }], '@babel/preset-react', '@babel/preset-typescript'],
    plugins: [
        'syntax-dynamic-import',
        'dynamic-import-node',
        '@babel/plugin-proposal-class-properties',
        "@babel/plugin-proposal-export-default-from",
        [
            "@babel/plugin-transform-runtime",
            {
                "regenerator": true
            }
        ]
    ],
    extensions: ['.js', '.jsx', '.ts', '.tsx' ]
});
require('./index');