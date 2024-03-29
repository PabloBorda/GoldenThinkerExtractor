const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

// Determine the output directory based on an environment variable
const outputPath = process.env.AUTOLOG ? 
    path.resolve(__dirname, 'build/GoldenThinkerExtractorAutolog') : 
    path.resolve(__dirname, 'build/GoldenThinkerExtractor');

module.exports = {
  mode: 'production',
  entry: {
    content: './src/content.js',
    background: './src/background.js'
  },
  output: {
    path: outputPath, // Use the conditional output path
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
    new CleanWebpackPlugin(),
    new WebpackShellPluginNext({
      onBuildEnd: {
        scripts: ['node postBuildProcess.js','python3.11.exe .\\source_code_snapshot.py'],
        blocking: false,
        parallel: true
      }
    }),

  ],
  optimization: {
    minimize: false // Disable minification
  },
  devServer: {
    contentBase: './build',
    open: true,
  },
  devtool: 'source-map'
};
