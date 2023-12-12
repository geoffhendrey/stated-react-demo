const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js', // Assuming your entry point is src/index.js
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    devtool: 'source-map', // This option outputs a source map for better debugging
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            //THIS IS WHERE WE PROCESS THE SOURCE MAP FOR STATED's bundle.mjs
            {
                test: /\/node_modules\/stated-js\/dist\/bundle\.mjs$/,
                use: ["source-map-loader"],
                enforce: "pre",
            }

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
