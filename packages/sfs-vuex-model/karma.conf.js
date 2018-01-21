const webpackConfig = require('./webpack.test.conf');

module.exports = (config) => {
    config.set({
        browsers: ['Chrome'],
        frameworks: ['mocha', 'sinon-chai'],
        reporters: ['spec', 'coverage'],
        files: ['./test/index.js'],
        preprocessors: {
            './test/index.js': ['webpack', 'sourcemap']
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true
        },
        // logLevel: 'debug',
        coverageReporter: {
            dir: './coverage',
            reporters: [
                { type: 'lcov', subdir: '.' },
                { type: 'text-summary' }
            ]
        },
    });
};
