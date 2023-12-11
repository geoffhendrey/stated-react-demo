const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js', // Assuming your entry point is src/index.js
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    devtool: 'inline-source-map', // This option outputs a source map for better debugging
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            // Process source maps in third-party libraries
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre",
                exclude: /node_modules/ // Exclude all of node_modules
            },
            {
                test: /\.tsx?$/, // or /\.jsx?$/ if you are using JSX
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.ts$/,
                use: ["source-map-loader"],
                enforce: "pre",
            },
            //THIS IS WHERE WE PROCESS THE SOURCE MAP FOR STATED's bundle.mjs
            {
                test: /bundle\.mjs$/,
                use: ["source-map-loader"],
                enforce: "pre",
            },

        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html', // Assuming your HTML template is in public/index.html
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'], // Add '.jsx' if you use JSX
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'), // Replace 'public' with your static files directory
        }
    },
};
