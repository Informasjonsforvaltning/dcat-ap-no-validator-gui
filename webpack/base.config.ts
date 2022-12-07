import type { Configuration } from 'webpack';
import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const configuration: Configuration = {
  entry: {
    main: './src/entrypoints/main/index.tsx'
  },
  output: {
    path: resolve(__dirname, '../dist'),
    publicPath: '/validator/',
    clean: true
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
            loader: '@svgr/webpack'
          }
        ],
        include: [resolve(__dirname, '..', 'src', 'images')]
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
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        exclude: [resolve(__dirname, '..', 'src', 'images')]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/entrypoints/main/index.html',
      filename: 'index.html',
      favicon: './src/images/favicon.ico',
      base: '/validator/',
      chunks: ['main']
    })
  ]
};

export default configuration;
