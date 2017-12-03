import Builder from '../Builder';

export default function (this: Builder) {
    if (this.options.babel) {
        return this.options.babel;
    }

    const babelPresets = this.options.babelPresets;
    const babelPlugins = this.options.babelPlugins;

    return {
        presets: babelPresets ? babelPresets : [
            [
                require.resolve('babel-preset-env'),
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
            require.resolve('babel-preset-stage-2')
        ],
        plugins: babelPlugins ? babelPlugins : [
            require.resolve('babel-plugin-lodash'),
            require.resolve('babel-plugin-transform-vue-jsx'),
            require.resolve('babel-plugin-transform-decorators-legacy'),
            require.resolve('babel-plugin-transform-class-properties'),
            [
                require.resolve('babel-plugin-transform-runtime'),
                {
                    polyfill: false
                }
            ]
        ],
        comments: false,
        env: {
            test: {
                presets: [
                    require.resolve('babel-preset-env'),
                    require.resolve('babel-preset-stage-2')
                ],
                plugins: [
                    require.resolve('babel-plugin-istanbul')
                ]
            }
        },
        babelrc: false
    };
}
