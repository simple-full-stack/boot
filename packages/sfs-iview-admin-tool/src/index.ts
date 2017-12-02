import * as path from 'path';
import * as fs from 'fs';
import Builder from './Builder';
import IOptions from './Builder/IOptions';

function getConfig(): IOptions {
    const projectDir = process.cwd();
    const configFilePath = path.resolve(projectDir, './build.config.js');
    try {
        fs.accessSync(configFilePath, fs.constants.R_OK);
    }
    catch(e) {
        console.error(`Can not read the config file.: ${configFilePath}`);
        console.error(e);
        return {};
    }

    const config = require(configFilePath);
    return config;
}

export function devServer() {
    const config = getConfig();
    config.env = 'development';
    const builder = new Builder(config);
    return builder.runDevServer();
}

export function dist() {
    const config = getConfig();
    config.env = 'production';
    const builder = new Builder(config);
    return builder.runBuildProd();
}

export function distServer() {
    const config = getConfig();
    config.env = 'distServer';
    const builder = new Builder(config);
    return builder.runDistServer();
}
