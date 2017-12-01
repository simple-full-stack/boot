const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entries: ['app'],
    defaultEntry: 'app',

    extend(config, {env}) {
        if (env === 'development') {
            config.plugins.push(
                new CopyWebpackPlugin([
                    {
                        from: 'src/views/main-components/theme-switch/theme'
                    },
                    {
                        from: 'src/views/my-components/text-editor/tinymce'
                    }
                ], {
                    ignore: [
                        'text-editor.vue'
                    ]
                })
            );
        }
        else if (env === 'production') {
            config.plugins.push(
                new CopyWebpackPlugin([
                    {
                        from: 'td_icon.ico'
                    },
                    {
                        from: 'src/styles/fonts',
                        to: 'fonts'
                    },
                    {
                        from: 'src/views/main-components/theme-switch/theme'
                    },
                    {
                        from: 'src/views/my-components/text-editor/tinymce'
                    }
                ], {
                    ignore: [
                        'text-editor.vue'
                    ]
                })
            );
        }

        return config;
    }
};