import Builder from '../Builder';
import base from './base.config';
import * as webpackMerge from 'webpack-merge';
import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import {get, mapValues} from 'lodash';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';

export default function (this: Builder) {
    let config = base.call(this);
    config = webpackMerge(config, {
        resolve: {
            alias: this.options.alias ? this.options.alias : {
                vue$: 'vue/dist/vue.runtime.esm.js'
            }
        },
        devtool: false,
        output: {
            filename: './static/js/[name].[chunkhash].js',
            chunkFilename: './static/js/[id].[chunkhash].js'
        },
        plugins: this.options.plugins ? [] : [
            // http://vuejs.github.io/vue-loader/en/workflow/production.html
            new webpack.DefinePlugin({
                ...mapValues(
                    get(this.options, 'envVars.production', {}),
                    (value) => JSON.stringify(value)
                ),
                'process.env': '"production"'
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                sourceMap: false
            }),
            // extract css into its own file
            new ExtractTextPlugin({
                filename: './static/css/[name].[contenthash].css'
            }),
            // Compress extracted CSS. We are using this plugin so that possible
            // duplicated CSS from different components can be deduped.
            // new OptimizeCSSPlugin({
            //     cssProcessorOptions: {
            //         safe: true
            //     }
            // }),
            // generate dist index.html with correct asset hash for caching.
            // you can customize output by editing /index.html
            // see https://github.com/ampedandwired/html-webpack-plugin
            ...(this.options.entries || []).map(entry => new HtmlWebpackPlugin({
                title: get(this.options.entriesTitle, entry, ''),
                filename: `${entry}/index.html`,
                template: this.resolve(`entry/${entry}.ejs`),
                inject: true,
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                    // more options:
                    // https://github.com/kangax/html-minifier#options-quick-reference
                },
                chunks: ['vendors.base', 'vendors.exten', 'manifest', entry],
                // necessary to consistently work with multiple chunks via CommonsChunkPlugin
                chunksSortMode: 'dependency'
            })),
            // extract webpack runtime and module manifest to its own file in order to
            // prevent vendor hash from being updated whenever app bundle is updated
            new webpack.optimize.CommonsChunkPlugin({
                names: ['vendors.base', 'vendors.exten'],
                minChunks: Infinity
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'manifest',
                minChunks: Infinity
            }),
            // copy custom static assets
            new CopyWebpackPlugin([
                {
                    from: this.resolve('static'),
                    to: this.resolve('dist/static'),
                    ignore: ['.*']
                }
            ])
        ]
    });

    if (this.options.productionGzip) {
        let CompressionWebpackPlugin = require('compression-webpack-plugin');

        config.plugins.push(
            new CompressionWebpackPlugin({
                asset: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp(
                    '\\.(' +
                    (this.options.productionGzipExtensions || []).join('|') +
                    ')$'
                ),
                threshold: 10240,
                minRatio: 0.8
            })
        );
    }

    if (this.options.bundleAnalyzerReport) {
        let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
        config.plugins.push(new BundleAnalyzerPlugin());
    }
    return config;
}
