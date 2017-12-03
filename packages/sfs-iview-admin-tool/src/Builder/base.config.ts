import Builder from '../Builder';
import {get} from 'lodash';

const ExtractTextPlugin = require('extract-text-webpack-plugin');

export default function (this: Builder) {
    const baseLessLoaders: {loader: string, options?: {}}[] = [
        {
            loader: 'css-loader'
        },
        {
            loader: 'postcss-loader',
            options: this.postcss()
        },
        {
            loader: 'less-loader',
            options: {
                modifyVars: {
                    '@support-ie-version': 9
                }
            }
        }
    ];
    const babelOptions: Record<string, {}> = this.babelrc();
    const babelOptionsWithCache: Record<string, {}> = {
        ...babelOptions,
        cacheDirectory: true
    };

    const lessLoaders = this.options.env === 'development'
        ? [
            {
                loader: 'vue-style-loader'
            },
            ...baseLessLoaders
        ]
        : ExtractTextPlugin.extract({
            use: baseLessLoaders,
            fallback: 'vue-style-loader'
        });

    return {
        bail: true,
        entry: {
            ...(this.options.entries || []).reduce<Record<string, string>>((prev, cur) => {
                prev[cur] = this.resolve(`src/${cur}/main.js`);
                return prev;
            }, {}),
            'vendors.base': this.resolve('./src/vendors.base/main.js'),
            'vendors.exten': this.resolve('./src/vendors.exten/main.js')
        },
        output: {
            path: this.resolve('dist'),
            filename: './static/js/[name].js',
            chunkFilename: '[name].chunk.js',
            publicPath: '/'
        },
        resolve: {
            extensions: ['.js', '.json', '.ts', '.tsx', '.vue'],
            alias: this.options.alias ? this.options.alias : {
                'babel-runtime': require('path').dirname(
                    require.resolve('babel-runtime/package.json')
                ),
                'eventsource-polyfill': require('path').dirname(
                    require.resolve('eventsource-polyfill/package.json')
                ),
                'webpack-hot-middleware': require('path').dirname(
                    require.resolve('webpack-hot-middleware/package.json')
                ),
                'webpack': require('path').dirname(
                    require.resolve('webpack/package.json')
                ),
                'querystring-es3': require('path').dirname(
                    require.resolve('querystring-es3/package.json')
                ),
                'strip-ansi': require('path').dirname(
                    require.resolve('strip-ansi/package.json')
                ),
                'ansi-regex': require('path').dirname(
                    require.resolve('ansi-regex/package.json')
                ),
                'ansi-html': require('path').dirname(
                    require.resolve('ansi-html/package.json')
                ),
                'html-entities': require('path').dirname(
                    require.resolve('html-entities/package.json')
                ),
                'vue-hot-reload-api': require('path').dirname(
                    require.resolve('vue-hot-reload-api/package.json')
                ),
                'babel-helper-vue-jsx-merge-props': require('path').dirname(
                    require.resolve('babel-helper-vue-jsx-merge-props/package.json')
                ),
                '@': this.resolve('./src')
            },
            symlinks: false
        },
        resolveLoader: {
            modules: [
                this.resolve('node_modules'),
                require('path').resolve(__dirname, '../../node_modules')
            ]
        },
        module: {
            rules: this.options.loaders ? this.options.loaders : [
                {
                    test: /.tsx?$/,
                    loader: 'tslint-loader',
                    enforce: 'pre',
                    include: [
                        this.resolve('src')
                    ]
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            less: lessLoaders.filter((item: {loader: string}) => item.loader !== 'postcss-loader'),
                            js: 'babel-loader?' + JSON.stringify(babelOptionsWithCache),
                            ts: [
                                'babel-loader?' + JSON.stringify(babelOptionsWithCache),
                                'ts-loader',
                                'tslint-loader'
                            ]
                        },
                        preserveWhitespace: false,
                        postcss: get(this.postcss(), 'plugins')
                    },
                    include: [
                        this.resolve('src'),
                        this.resolve('node_modules/iview')
                    ]
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    include: [
                        this.resolve('src')
                    ],
                    options: babelOptionsWithCache
                },
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: babelOptions
                        },
                        {
                            loader: 'ts-loader',
                            options: {
                                appendTsSuffixTo: [/\.vue$/]
                            }
                        }
                    ],
                    include: [
                        this.resolve('src')
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader'
                    ]
                },
                {
                    test: /\.less$/,
                    use: lessLoaders
                },
                {
                    test: /\.(png|jpe?g|svg|gif)(\?.*)?$/,
                    loader: 'url-loader',
                    query: {
                        limit: 10000,
                        name: './static/img/[name].[hash:7].[ext]'
                    }
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: './static/fonts/[name].[hash:7].[ext]'
                    }
                }
            ]
        },
        plugins: this.options.plugins ? this.options.plugins : []
    };
}
