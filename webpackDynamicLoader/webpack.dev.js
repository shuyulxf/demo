const path = require('path');

  module.exports = {
    mode: 'development',
    entry: {
      index: './src/index.js'
    },
    output: {
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: config.title,
            template: _.cwd('src/index.html'),
            filename: `./dist/index.html`,
            excludeChunks: [/audit/],
            minify: htmlMinify
        }),
    ]
  };