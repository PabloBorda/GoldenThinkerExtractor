console.log(new Date().toISOString(), "webpack.config.js", 1);
const path = require('path');
console.log(new Date().toISOString(), "webpack.config.js", 2);
const CopyPlugin = require('copy-webpack-plugin');
console.log(new Date().toISOString(), "webpack.config.js", 3);
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
console.log(new Date().toISOString(), "webpack.config.js", 4);
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
console.log(new Date().toISOString(), "webpack.config.js", 5);

console.log(new Date().toISOString(), "webpack.config.js", 6);
// Determine the output directory based on an environment variable
console.log(new Date().toISOString(), "webpack.config.js", 7);
const outputPath = process.env.AUTOLOG ? 
console.log(new Date().toISOString(), "webpack.config.js", 8);
    path.resolve(__dirname, 'build/GoldenThinkerExtractorAutolog') : 
console.log(new Date().toISOString(), "webpack.config.js", 9);
    path.resolve(__dirname, 'build/GoldenThinkerExtractor');
console.log(new Date().toISOString(), "webpack.config.js", 10);

console.log(new Date().toISOString(), "webpack.config.js", 11);
module.exports = {
console.log(new Date().toISOString(), "webpack.config.js", 12);
  mode: 'production',
console.log(new Date().toISOString(), "webpack.config.js", 13);
  entry: {
console.log(new Date().toISOString(), "webpack.config.js", 14);
    content: './src/content.js',
console.log(new Date().toISOString(), "webpack.config.js", 15);
    background: './src/background.js'
console.log(new Date().toISOString(), "webpack.config.js", 16);
  },
console.log(new Date().toISOString(), "webpack.config.js", 17);
  output: {
console.log(new Date().toISOString(), "webpack.config.js", 18);
    path: outputPath, // Use the conditional output path
console.log(new Date().toISOString(), "webpack.config.js", 19);
    filename: '[name].js',
console.log(new Date().toISOString(), "webpack.config.js", 20);
  },
console.log(new Date().toISOString(), "webpack.config.js", 21);
  module: {
console.log(new Date().toISOString(), "webpack.config.js", 22);
    rules: [
console.log(new Date().toISOString(), "webpack.config.js", 23);
      {
console.log(new Date().toISOString(), "webpack.config.js", 24);
        test: /\.js$/,
console.log(new Date().toISOString(), "webpack.config.js", 25);
        exclude: /node_modules/,
console.log(new Date().toISOString(), "webpack.config.js", 26);
        use: {
console.log(new Date().toISOString(), "webpack.config.js", 27);
          loader: 'babel-loader',
console.log(new Date().toISOString(), "webpack.config.js", 28);
          options: {
console.log(new Date().toISOString(), "webpack.config.js", 29);
            presets: ['@babel/preset-env'],
console.log(new Date().toISOString(), "webpack.config.js", 30);
          },
console.log(new Date().toISOString(), "webpack.config.js", 31);
        },
console.log(new Date().toISOString(), "webpack.config.js", 32);
      },
console.log(new Date().toISOString(), "webpack.config.js", 33);
      {
console.log(new Date().toISOString(), "webpack.config.js", 34);
        test: /\.css$/,
console.log(new Date().toISOString(), "webpack.config.js", 35);
        use: ['style-loader', 'css-loader'],
console.log(new Date().toISOString(), "webpack.config.js", 36);
      },
console.log(new Date().toISOString(), "webpack.config.js", 37);
      {
console.log(new Date().toISOString(), "webpack.config.js", 38);
        test: /\.(png|svg|jpg|gif)$/,
console.log(new Date().toISOString(), "webpack.config.js", 39);
        use: ['file-loader'],
console.log(new Date().toISOString(), "webpack.config.js", 40);
      },
console.log(new Date().toISOString(), "webpack.config.js", 41);
    ],
console.log(new Date().toISOString(), "webpack.config.js", 42);
  },
console.log(new Date().toISOString(), "webpack.config.js", 43);
  plugins: [
console.log(new Date().toISOString(), "webpack.config.js", 44);
    new CopyPlugin({
console.log(new Date().toISOString(), "webpack.config.js", 45);
      patterns: [
console.log(new Date().toISOString(), "webpack.config.js", 46);
        { from: 'src/manifest.json', to: 'manifest.json' },
console.log(new Date().toISOString(), "webpack.config.js", 47);
        { from: 'com_goldenthinkerextractor_images', to: 'com_goldenthinkerextractor_images' },
console.log(new Date().toISOString(), "webpack.config.js", 48);
        { from: 'src/com_goldenthinkerextractor_content_html/popup.html', to: 'com_goldenthinkerextractor_content_html/popup.html' },
console.log(new Date().toISOString(), "webpack.config.js", 49);
        { from: 'src/com_goldenthinkerextractor_content_html/popup.js', to: 'com_goldenthinkerextractor_content_html/popup.js' },
console.log(new Date().toISOString(), "webpack.config.js", 50);
        { from: 'src/com_goldenthinkerextractor_content_styles/popup.css', to: 'com_goldenthinkerextractor_content_styles/popup.css' },
console.log(new Date().toISOString(), "webpack.config.js", 51);
        { from: 'src/com_goldenthinkerextractor_content_styles/style.css', to: 'com_goldenthinkerextractor_content_styles/style.css' },
console.log(new Date().toISOString(), "webpack.config.js", 52);
        { from: 'src/com_goldenthinkerextractor_injection', to: 'com_goldenthinkerextractor_injection'}
console.log(new Date().toISOString(), "webpack.config.js", 53);
      ],
console.log(new Date().toISOString(), "webpack.config.js", 54);
    }),
console.log(new Date().toISOString(), "webpack.config.js", 55);
    new CleanWebpackPlugin(),
console.log(new Date().toISOString(), "webpack.config.js", 56);
    new WebpackShellPluginNext({
console.log(new Date().toISOString(), "webpack.config.js", 57);
      onBuildEnd: {
console.log(new Date().toISOString(), "webpack.config.js", 58);
        scripts: ['node postBuildProcess.js','python3.11.exe .\\source_code_snapshot.py'],
console.log(new Date().toISOString(), "webpack.config.js", 59);
        blocking: false,
console.log(new Date().toISOString(), "webpack.config.js", 60);
        parallel: true
console.log(new Date().toISOString(), "webpack.config.js", 61);
      }
console.log(new Date().toISOString(), "webpack.config.js", 62);
    }),
console.log(new Date().toISOString(), "webpack.config.js", 63);

console.log(new Date().toISOString(), "webpack.config.js", 64);
  ],
console.log(new Date().toISOString(), "webpack.config.js", 65);
  optimization: {
console.log(new Date().toISOString(), "webpack.config.js", 66);
    minimize: false // Disable minification
console.log(new Date().toISOString(), "webpack.config.js", 67);
  },
console.log(new Date().toISOString(), "webpack.config.js", 68);
  devServer: {
console.log(new Date().toISOString(), "webpack.config.js", 69);
    contentBase: './build',
console.log(new Date().toISOString(), "webpack.config.js", 70);
    open: true,
console.log(new Date().toISOString(), "webpack.config.js", 71);
  },
console.log(new Date().toISOString(), "webpack.config.js", 72);
  devtool: 'source-map'
console.log(new Date().toISOString(), "webpack.config.js", 73);
};
console.log(new Date().toISOString(), "webpack.config.js", 74);
