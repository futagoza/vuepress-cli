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
    stats: {
        all: false,
        errors: true,
        modules: true,
    },
    externals: new RegExp( "^(" + [
        // optional modules for: consolidate
        "atpl",
        "babel-core",
        "bracket-template",
        "coffee-script",
        "dot",
        "dustjs-linkedin",
        "eco",
        "ect",
        "ejs",
        "haml-coffee",
        "hamlet",
        "hamljs",
        "handlebars",
        "htmling",
        "jazz",
        "jqtpl",
        "just",
        "liquor",
        "marko",
        "mote",
        "mustache",
        "plates",
        "ractive",
        "react",
        "react-dom",
        "slm",
        "teacup",
        "templayed",
        "toffee",
        "twig",
        "underscore",
        "vash",
        "velocityjs",
        "walrus",
        "whiskers",
        // optional modules for: @vue/component-compiler-utils
        "less",
        "node-sass",
    ].join( "|" ) + ")", "i" ),
    plugins: [
        new webpack.DefinePlugin( {
            "process.env.STYLUS_COV": false,
        } ),
    ],

};
