import Builder from '../Builder';
import base from './base.config';
import * as webpackMerge from 'webpack-merge';
import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import {get, mapValues} from 'lodash';
import * as FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';

export default function (this: Builder) {
    let config = base.call(this);
    config = webpackMerge(config, {
        resolve: this.options.alias ? this.options.alias : {
            alias: {
                vue$: 'vue/dist/vue.esm.js'
            }
        },
        devtool: '#cheap-module-eval-source-map',
        plugins: [
            new webpack.DefinePlugin({
                ...mapValues(
                    get(this.options, 'envVars.development', {}),
                    (value) => JSON.stringify(value)
                ),
                'process.env': '"development"'
            }),
            // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            // https://github.com/ampedandwired/html-webpack-plugin
            ...(this.options.entries || []).map(entry => new HtmlWebpackPlugin({
                title: get(this.options.entriesTitle, entry, ''),
                filename: `${entry}/index.html`,
                template: this.resolve(`entry/${entry}.ejs`),
                chunks: [`${entry}`],
                inject: false
            })),
            new FriendlyErrorsPlugin()
        ]
    });

    // const devClientPath = path.resolve(__dirname, './devClient.js');
    // Object.keys(config.entry).forEach((name) => {
    //     config.entry[name] = [devClientPath].concat(config.entry[name]);
    // });
    return config;
}
