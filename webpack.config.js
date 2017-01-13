var webpack = require("webpack");

var config = {
    context: __dirname + "/src",
    entry: "./index.js",
    output: {
        path: __dirname + "/static",
        filename: "bundle.js"
    },
    resolve: {
        root: __dirname + "/src",
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel",
                query: {
                    presets: [ "es2015" ]
                }
            },
            {
                test: /\.js$/,
                loader: "eslint-loader",
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.purs$/,
                loader: "purs-loader",
                query: {
                    src: [ "bower_components/purescript-*/src/**/*.purs", "src/pure/**/*.purs" ],
                    bundle: false,
                    psc: "psc",
                    pscArgs: { sourceMaps: true },
                    //pscIde: true,
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: '"' + process.env.NODE_ENV + '"'
            }
        })
    ]
};

if (process.env.NODE_ENV === "production") {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        })
    );
} else {
    config.devtool = "#cheap-inline-source-map";
}

module.exports = config;
