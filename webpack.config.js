const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')


const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './scripts/app.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'build.js'
  },
  mode: 'none',
  watch: true,
  devtool: isProduction ? false : 'source-map',
  devServer: {
    contentBase: './public',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      BASE_URL: isProduction ? "'https://stasgavrylov.github.io/js-20181018/public/'" : "'/'",
    }),
    new UglifyJsPlugin()
  ]
};
