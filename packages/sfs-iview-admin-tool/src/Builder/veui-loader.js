'use strict';

var fs = require('fs');
var path = require('path');
var babel = require('babel-core');
var loaderUtils = require('loader-utils');
var resolveRc = require('babel-loader/lib/resolve-rc');
var read = require('babel-loader/lib/utils/read');
var resolve = require('enhanced-resolve/lib/node');

function makeSyncResolver(options) {
    return resolve.create.sync(options.resolve);
}

module.exports = function (content) {
    var veuiPluginFullPath = require.resolve('babel-plugin-veui') || 'veui';

    var options = {};
    var babelrc = loaderUtils.getOptions(this) || {};
    if (babelrc) {
        var plugins = babelrc.plugins || [];
        var index = -1;
        for (var i = 0; i < plugins.length; i++) {
            var plugin = plugins[i];
            if (plugin === veuiPluginFullPath || Array.isArray(plugin) && plugin[0] === veuiPluginFullPath) {
                index = i;
                if (plugin !== veuiPluginFullPath) {
                    options = plugin[1] || {};
                }
                break;
            }
        }

        if (index === -1) {
            return content;
        }

        var resolveSync = makeSyncResolver(this.options);
        babelrc.plugins = babelrc.plugins || [];
        babelrc.plugins[index] = [veuiPluginFullPath, Object.assign({}, options, {
            request: this.request,
            resolve: resolveSync
        })];

        var result = babel.transform(content, Object.assign(babelrc, {
            babelrc: false,
            filename: this.resourcePath
        }));

        this.callback(null, result.code, result.map, result.ast);
    }
    return content;
};
