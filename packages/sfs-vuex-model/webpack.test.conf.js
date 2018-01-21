// const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const eslintFriendlyFormatter = require('eslint-friendly-formatter');

function resolve(dir) {
    return require('path').resolve(__dirname, '.', dir);
}

const babelOptions = {
    presets: [
        [
            'babel-preset-env',
            {
                module: false,
                targets: {
                    browsers: [
                        'ie >= 9',
                        'last 2 versions'
                    ]
                }
            }
        ],
        'babel-preset-stage-2'
    ],
    plugins: [
        'babel-plugin-lodash',
        'babel-plugin-transform-vue-jsx',
        'babel-plugin-transform-decorators-legacy',
        'babel-plugin-transform-class-properties',
        [
            'babel-plugin-transform-runtime',
            {
                polyfill: false
            }
        ]
    ],
    comments: false,
    env: {
        test: {
            presets: [
                'babel-preset-env',
                'babel-preset-stage-2'
            ],
            plugins: [
                'babel-plugin-istanbul'
            ]
        }
    },
    babelrc: false
};

const webpackConfig = {
    entry: {
        client: resolve('test/index.js')
    },
    output: {
        path: resolve('dist'),
        filename: './static/js/[name].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.json'],
        symlinks: false,
        alias: {
            'vue': 'vue/dist/vue.esm.js',
            'sfs-vuex-model': resolve('src')
        }
    },
    // use inline sourcemap for karma-sourcemap-loader
    module: {
        rules: [
            {
                test: /\.(ts|tsx|vue)$/,
                loader: 'tslint-loader',
                enforce: 'pre',
                include: [
                    resolve('src'),
                    resolve('test')
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        less: [
                            {
                                loader: 'vue-style-loader'
                            },
                            {
                                loader: 'css-loader'
                            },
                            {
                                loader: 'less-loader',
                                options: {
                                    modifyVars: {
                                        '@support-ie-version': 9
                                    }
                                }
                            }
                        ],
                        ts: [
                            'babel-loader?' + JSON.stringify(babelOptions),
                            'ts-loader',
                            'tslint-loader'
                        ]
                    },
                    preserveWhitespace: false,
                    postcss: [
                        autoprefixer({
                            browsers: [
                                'ie >= 9',
                                'last 2 versions'
                            ]
                        }),
                        cssnano({
                            autoprefixer: false,
                            safe: true
                        })
                    ]
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    resolve('src'),
                    resolve('test')
                ],
                options: babelOptions
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
                    resolve('src'),
                    resolve('test')
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'vue-style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: [
                                autoprefixer({
                                    browsers: [
                                        'ie >= 9',
                                        'last 2 versions'
                                    ]
                                }),
                                cssnano({
                                    autoprefixer: false,
                                    safe: true
                                })
                            ]
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            modifyVars: {
                                '@support-ie-version': 9
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                include: [
                    resolve('src')
                ],
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: './static/img/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    devtool: '#inline-source-map'
};

module.exports = webpackConfig;
