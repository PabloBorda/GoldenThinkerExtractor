const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    content: './src/content.js',
    background: './src/background.js'
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
        { from: 'com_goldenthinkerextractor_images', to: 'com_goldenthinkerextractor_images' },
        { from: 'src/com_goldenthinkerextractor_content_html/popup.html', to: 'com_goldenthinkerextractor_content_html/popup.html' },
        { from: 'src/com_goldenthinkerextractor_content_html/popup.js', to: 'com_goldenthinkerextractor_content_html/popup.js' },
        { from: 'src/com_goldenthinkerextractor_content_styles/popup.css', to: 'com_goldenthinkerextractor_content_styles/popup.css' },
        { from: 'src/com_goldenthinkerextractor_content_styles/style.css', to: 'com_goldenthinkerextractor_content_styles/style.css' },
        { from: 'src/com_goldenthinkerextractor_injection', to: 'com_goldenthinkerextractor_injection'}
      ],
    }),
    new CleanWebpackPlugin()
  ],
  optimization: {
    minimize: false // Disable minification
  },
  devServer: {
    contentBase: './GoldenThinkerExtractor',
    open: true,
  },
  devtool: 'source-map'
};
