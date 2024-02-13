const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    content: './src/com_goldenthinkerextractor_contentscript/content.js',
    background: './src/com_goldenthinkerextractor_serviceworker/background.js'
  },
  output: {
    path: path.resolve(__dirname, 'build/GoldenThinkerExtractor'),
    filename: '[name].js',
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
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'src/manifest.json', to: 'manifest.json' },
        { from: 'src/images', to: 'images' }, 
        { from: 'src/com_goldenthinkerextractor_content_html/popup.html', to: 'popup.html' },
        { from: 'src/com_goldenthinkerextractor_content_styles/popup.css', to: 'popup.css' },
        { from: 'src/com_goldenthinkerextractor_content_styles/style.css', to: 'style.css' }
        // Add more patterns as needed
      ],
    }),
    new CleanWebpackPlugin() 
  ],
  devServer: {
    contentBase: './GoldenThinkerExtractor',
    open: true,
  },
};