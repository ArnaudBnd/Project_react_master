const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [ 'react-hot-loader', 'babel-loader', 'eslint-loader' ]
      },
      {
      test: /\.(pdf|jpg|png|gif|svg|ico)$/,
        use: [
          {
              loader: 'url-loader'
          },
        ]
      },
      {
        test: /\.(s*)css$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { 
        from: path.resolve(__dirname, 'www/index.html'),
        to: path.resolve(__dirname, 'build/index.html')
      }
    ])
  ],
  devServer: {
    overlay: true,
    contentBase: path.resolve(__dirname, 'build'),
    historyApiFallback: {
      disableDotRule: true
    },
    compress: false,
    port: 3006
  }
};
