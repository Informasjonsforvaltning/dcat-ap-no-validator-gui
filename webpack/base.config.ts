import type { Configuration } from 'webpack';
import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const configuration: Configuration = {
  entry: {
    main: './src/entrypoints/main/index.tsx'
  },
  output: {
    path: resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      hidePathInfo: true,
      chunks: 'all',
      maxInitialRequests: Infinity,
      maxAsyncRequests: Infinity,
      minSize: 0,
      automaticNameDelimiter: '.',
      cacheGroups: {
        default: false,
        mainVendors: {
          test: ({ resource = '' }: any) => resource.includes('node_modules'),
          name: 'main.vendors',
          filename: '[name].bundle.js',
          chunks: ({ name }) => name === 'main'
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: resolve(__dirname, '../babel.config.js')
            }
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: resolve(__dirname, '../tsconfig.json')
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images',
              publicPath: 'images'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/entrypoints/main/index.html',
      filename: 'index.html',
      favicon: './src/images/favicon.ico',
      base: '/',
      chunks: ['main']
    })
  ]
};

export default configuration;
