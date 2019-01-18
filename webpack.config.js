"use strict";

const path = require( "path" );
const webpack = require( "webpack" );

module.exports = {

    mode: "production",
    entry: require.resolve( "vuepress" ),
    output: {
        path: __dirname,
        filename: "index.js",
        libraryTarget: "commonjs2",
        sourcePrefix: "  ",
    },
    optimization: {
        nodeEnv: false,
        minimize: false,
    },
    module: {
        rules: [
            {
                exclude: /\.node$/,
                use: [ "shebang-loader" ],
            },
            {
                test: /\.js$/,
                loader: "string-replace-loader",
                options: {
                    search: "require[(]([^'\"])",
                    replace: "__non_webpack_require__($1",
                    flags: "g"
                }
            }
        ]
    },
    resolve: {
        alias: {
            "uglify-js$": path.resolve( __dirname, "uglify.js" ),
        },
        mainFields: [ "main" ],
    },
    performance: {
        hints: false,
    },
    target: "node",
    node: false,
    externals: new RegExp( "^(" + [
        // optional dependencies for: @vue/component-compiler-utils
        "less",
        "node-sass",
        // optional dependencies for: chokidar
        "fsevents",
        // optional dependencies for: consolidate
        "arc-templates/dist/es5",
        "atpl",
        "babel-core",
        "bracket-template",
        "coffee-script",
        "dot",
        "dust",
        "dustjs-helpers",
        "dustjs-linkedin",
        "eco",
        "ect",
        "ejs",
        "haml-coffee",
        "hamlet",
        "hamljs",
        "handlebars",
        "htmling",
        "jade",
        "jazz",
        "jqtpl",
        "just",
        "liquid-node",
        "liquor",
        "marko",
        "mote",
        "mustache",
        "nunjucks",
        "plates",
        "pug",
        "qejs",
        "ractive",
        "react",
        "react-dom",
        "slm",
        "swig",
        "swig-templates",
        "teacup",
        "templayed",
        "then-jade",
        "then-pug",
        "tinyliquid",
        "toffee",
        "twig",
        "underscore",
        "vash",
        "velocityjs",
        "walrus",
        "whiskers",
        // optional dependencies for: cross-spawn
        "spawn-sync",
        // optional dependencies for: ws
        "bufferutil",
        "utf-8-validate",
        // Special cases that can't be bundled
        "@vuepress/theme-default",
        "prismjs",
    ].join( "|" ) + ")", "i" ),
    plugins: [
        new webpack.DefinePlugin( {
            "process.env.STYLUS_COV": false,
            "__filename": "__filename",
            "__dirname": "__dirname",
            "require.extensions": "require.extensions",
            "System.import": false,
        } ),
    ],

};
