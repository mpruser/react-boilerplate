const Dotenv = require('dotenv-webpack');
const path = require('path');
const { ProvidePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.REACT_APP_ENV === 'production';
const mode = isProduction ? 'production' : 'development';
const devtool = isProduction ? undefined : 'inline-source-map';

const resolvePath = (relativePath) => {
  return path.resolve(__dirname, relativePath);
};

module.exports = {
  mode,
  devtool,
  entry: {
    index: resolvePath('./src/index.tsx'),
  },
  output: {
    path: resolvePath('./dist'),
    filename: `static/js/[name].[hash:8].js`,
    chunkFilename: `static/js/[id].[hash:8].js`,
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: isProduction
      ? [
          new CssMinimizerWebpackPlugin(),
          new TerserWebpackPlugin({
            parallel: true,
            terserOptions: {
              compress: {
                comparisons: false,
                inline: 2,
                // pure_funcs: ['window.console.log', 'console.log'],
              },
              parse: { ecma: 2020 },
              mangle: { safari10: true },
              output: {
                ecma: 6,
                comments: false,
                ascii_only: true,
              },
            },
          }),
        ]
      : undefined,
  },
  plugins: [
    new Dotenv({
      path: resolvePath(`./environments/.env.${process.env.REACT_APP_ENV}`),
    }),
    new ProvidePlugin({
      process: require.resolve('process/browser'),
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        mode: 'write-references',
      },
      issue: {
        include: (issue) => issue.severity === 'error',
      },
    }),
    new EslintWebpackPlugin({
      context: resolvePath('./src'),
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      exclude: ['node_modules'],
      emitError: true,
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolvePath('./public/index.html'),
      filename: 'index.html',
      inject: 'body',
      scriptLoading: 'blocking',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolvePath('./public'),
          globOptions: { ignore: ['**/index.html'] },
        },
      ],
    }),
    ...(isProduction
      ? [new MiniCssExtractPlugin({ filename: 'static/css/[name].[hash:8].css' })]
      : []),
  ],
  module: {
    rules: [
      {
        test: /\.module\.(c|sa|sc)ss$/i,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: !isProduction,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !isProduction,
              implementation: require.resolve('sass'),
            },
          },
        ],
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        exclude: /\.module\.(c|sa|sc)ss$/i,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: !isProduction,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !isProduction,
              implementation: require.resolve('sass'),
            },
          },
        ],
      },
      {
        test: /\.svg$/i,
        use: [
          {
            loader: '@svgr/webpack',
            options: { icon: true },
          },
          'url-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'static/images/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/fonts/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(jsx?|tsx?)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  devServer: {
    host: '0.0.0.0',
    historyApiFallback: true,
    hot: true,
    open: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
        runtimeErrors: true,
      },
    },
  },
};
