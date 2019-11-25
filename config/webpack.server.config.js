const path = require('path'),
    fs = require('fs'),
    webpack = require('webpack'),
    autoprefixer = require('autoprefixer'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin')
    cssFilename = 'static/css/[name].[contenthash:8].css';
    CleanWebpackPlugin = require('clean-webpack-plugin');
    nodeExternals = require('webpack-node-externals');

serverConfig = {
  context: path.resolve(__dirname, '..'),
  entry: {server: './server/server'},
  output: {
      libraryTarget: 'commonjs2',
      path: path.resolve(__dirname, '../build/server'),
      filename: 'static/js/[name].js',
      chunkFilename: 'static/js/chunk.[name].js'
  },
  // target: 'node' 指明构建出的代码是要运行在node环境里.
  // 不把 Node.js 内置的模块打包进输出文件中，例如 fs net 模块等
  target: 'node',
  //指定在node环境中是否要这些模块 
  node: {
      __filename: true,
      __dirname: true,
      // module:true
  },
  module: {
      loaders: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader?cacheDirectory=true',
          options: {
              presets: ['es2015', 'react-app', 'stage-0'],
              plugins: ['add-module-exports',
              [
                "import",
                {
                  "libraryName": "antd-mobile",
                  "style": "css"
                }
              ],"transform-decorators-legacy"]
          },
      },{
        test: /\.css$/,
        exclude: /node_modules|antd-mobile\.css/,            
        loader: ExtractTextPlugin.extract(
          Object.assign(
            {
              fallback: {
                loader: require.resolve('style-loader'),
                options: {
                  hmr: false,
                },
              },
              use: [
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 1,
                    minimize: true,
                    modules: false,
                    localIdentName:"[name]-[local]-[hash:base64:8]",
                    // sourceMap: shouldUseSourceMap,
                  },
                },
                {
                  loader: require.resolve('postcss-loader'),
                  options: {
                    ident: 'postcss',
                    plugins: () => [
                      require('postcss-flexbugs-fixes'),
                      autoprefixer({
                        browsers: [
                          '>1%',
                          'last 4 versions',
                          'Firefox ESR',
                          'not ie < 9', // React doesn't support IE8 anyway
                        ],
                        flexbox: 'no-2009',
                      }),
                    ],
                  },
                },
              ],
            },
          )
        ),
      },
      {
        test: /\.css$/,
        include: /node_modules|antd-mobile\.css/,
        use: ExtractTextPlugin.extract({
          fallback: require.resolve('style-loader'),
          use: [{
            loader: require.resolve('css-loader'),
            options: {
              modules:false
            },
          }]
        })
      }, {
          test: /\.(jpg|png|gif|webp)$/,
          loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
      }, {
          test: /\.json$/,
          loader: 'json-loader',
      }]
  },
  // 不把 node_modules 目录下的第三方模块打包进输出文件中,
  externals: [nodeExternals()],
  resolve: {extensions: ['*', '.js', '.json', '.scss']},
  plugins: [
      new CleanWebpackPlugin(['../build/server']),
      new webpack.optimize.OccurrenceOrderPlugin(),
      //把第三方库从js文件中分离出来
      new webpack.optimize.CommonsChunkPlugin({
        //抽离相应chunk的共同node_module
        minChunks(module) {
          return /node_modules/.test(module.context);
        },
        //从要抽离的chunk中的子chunk抽离相同的模块
        children: true,
        //是否异步抽离公共模块，参数boolean||string
        async: false,
      }),
      new webpack.optimize.CommonsChunkPlugin({
        children:true,
        //若参数是string即为抽离出来后的文件名
        async: 'shine',
        //最小打包的文件模块数，即要抽离的公共模块中的公共数，比如三个chunk只有1个用到就不算公共的            
        //若为Infinity，则会把webpack runtime的代码放入其中（webpack 不再自动抽离公共模块）
        minChunks:2
      }),
      //压缩
      new webpack.optimize.UglifyJsPlugin(),
      //分离css文件
      new ExtractTextPlugin({
        filename: cssFilename,
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
}

module.exports =  serverConfig