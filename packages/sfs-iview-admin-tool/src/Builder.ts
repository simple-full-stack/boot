import IOptions from './Builder/IOptions';
import babelrcConfig from './Builder/babelrc';
import * as path from 'path';
import dev from './Builder/dev.config';
import rd from './Builder/rd.config';
import off from './Builder/off.config';
import production from './Builder/production.config';
import * as express from 'express';
import http from 'http';
import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
import proxyMiddleware from 'http-proxy-middleware';
import {get} from 'lodash';
import * as bodyParser from 'body-parser';
import * as childProcess from 'child_process';
import * as semver from 'semver';
import * as ora from 'ora';
import * as rm from 'rimraf';
import chalk from 'chalk';
import postcssConfig from './Builder/postcss.config';

const opn = require('opn');

export default class Builder {
    public options: IOptions;

    public babelrc: () => {};

    public postcss: () => {};

    public constructor(options: IOptions) {
        this.options = Object.assign({
            port: 8080,
            defaultEntry: 'client',
            entries: ['client'],
            projectDir: process.cwd()
        }, options);

        this.babelrc = babelrcConfig.bind(this);
        this.postcss = postcssConfig.bind(this);
    }

    public resolve(p: string): string {
        return path.resolve(this.options.projectDir, p);
    }

    public runBuildRD() {
        this.checkVersions();

        const spinner = ora('building for rd...');
        spinner.start();

        rm(this.resolve('dist/static'), err => {
            if (err) {
                throw err;
            }

            let config = this.webpackRD();
            if (this.options.extend) {
                config = this.options.extend(config, this.options);
            }

            webpack(config, function (err, stats) {
                spinner.stop();
                if (err) {
                    throw err;
                }

                process.stdout.write(stats.toString({
                    colors: true,
                    modules: false,
                    children: false,
                    chunks: false,
                    chunkModules: false
                }) + '\n\n');

                console.log(chalk.cyan('  Build complete.\n'));
            });
        });
    }

    public runBuildOff() {
        this.checkVersions();

        const spinner = ora('building for off...');
        spinner.start();

        rm(this.resolve('dist/static'), err => {
            if (err) {
                throw err;
            }

            let config = this.webpackOff();
            if (this.options.extend) {
                config = this.options.extend(config, this.options);
            }

            webpack(config, function (err, stats) {
                spinner.stop();
                if (err) {
                    throw err;
                }

                process.stdout.write(stats.toString({
                    colors: true,
                    modules: false,
                    children: false,
                    chunks: false,
                    chunkModules: false
                }) + '\n\n');

                console.log(chalk.cyan('  Build complete.\n'));
            });
        });
    }

    public runBuildProd() {
        this.checkVersions();
        const spinner = ora('building for production...');
        spinner.start();
        rm(this.resolve('dist/static'), (err) => {
            if (err) {
                throw err;
            }

            let config = this.webpackProduction();
            if (this.options.extend) {
                config = this.options.extend(config, this.options);
            }

            webpack(config, (err, stats) => {
                spinner.stop();
                if (err) {
                    throw err;
                }
                process.stdout.write(stats.toString({
                    colors: true,
                    modules: false,
                    children: false,
                    chunks: false,
                    chunkModules: false
                }) + '\n\n');
                console.log(chalk.cyan('  Build complete.\n'));
            });
        });
    }

    public runDistServer(): http.Server {
        const app = express();

        this.mountProxy(app);
        this.mountMockup(app);

        app.use((req, res) => {
            const fullPath = this.resolve(`dist/${req.path}`);
            console.log('GET ' + fullPath);
            res.sendFile(fullPath);
        });

        const uri = `http://localhost:${this.options.port}/${this.options.defaultEntry}/index.html?ed`;
        setTimeout(() => opn(uri), 0);
        console.log('\n> Listening at ' + uri + '\n');

        return app.listen(this.options.port);
    }

    public runDevServer() {
        const app = express();

        let config = this.webpackDev();
        if (this.options.extend) {
            config = this.options.extend(config, this.options);
        }

        const compiler = webpack(config);

        const devMiddleware = webpackDevMiddleware(compiler, {
            publicPath: '/',
            quiet: false
        });
        const hotMiddleware = webpackHotMiddleware(compiler, {
            log() { }
        });

        // force page reload when html-webpack-plugin template changes
        compiler.plugin('compilation', function (compilation) {
            compilation.plugin('html-webpack-plugin-after-emit', function (_: {}, cb: Function) {
                hotMiddleware.publish({action: 'reload'});
                cb();
            });
        });

        this.mountProxy(app);
        this.mountMockup(app);

        app.use(devMiddleware);
        app.use(hotMiddleware);

        app.use('/static', express.static(this.resolve('static')));

        const uri = `http://localhost:${this.options.port}/${this.options.defaultEntry}/index.html?ed`;
        console.log('> Starting dev server...');
        const server = app.listen(this.options.port);

        return new Promise((resolve) => {
            devMiddleware.waitUntilValid(() => {
                console.log('> Listening at ' + uri + '\n');
                opn(uri);
                resolve(server);
            });
        });
    }

    private checkVersions() {
        function exec(cmd: string) {
            return childProcess.execSync(cmd).toString().trim();
        }

        const packageConfig = require(this.resolve('package.json'));
        const versionRequirements = [];
        if (get(packageConfig, 'engines.node')) {
            versionRequirements.push({
                name: 'node',
                currentVersion: semver.clean(process.version),
                versionRequirement: packageConfig.engines.node
            });
        }
        if (get(packageConfig, 'engines.npm')) {
            versionRequirements.push({
                name: 'npm',
                currentVersion: exec('npm --version'),
                versionRequirement: packageConfig.engines.npm
            });
        }

        const warnings = [];
        for (let i = 0; i < versionRequirements.length; i++) {
            const mod = versionRequirements[i];
            if (!semver.satisfies('' + mod.currentVersion, mod.versionRequirement)) {
                warnings.push(mod.name + ': ' +
                    chalk.red('' + mod.currentVersion) + ' should be ' +
                    chalk.green('' + mod.versionRequirement)
                );
            }

        }

        if (warnings.length) {
            console.log('');
            console.log(chalk.yellow('To use this template, you must update following to modules:'));
            console.log();
            for (let i = 0; i < warnings.length; i++) {
                const warning = warnings[i];
                console.log('  ' + warning);
            }
            console.log();
            process.exit(1);
        }
    }

    private mockupHandler(req: express.Request, res: express.Response, next: Function) {
        if (req.headers.referer && /[?&](?:ed|enable_debug)\b/i.test('' + req.headers.referer)) {
            try {
                let modulePath = this.resolve(req.path.replace('/data/', 'mockup/'));
                delete require.cache[modulePath];
                if (/upload$/.test(req.path)) {
                    res.type('html');
                }
                else {
                    res.type('json');
                }
                let module = require(modulePath);
                module(req, res, next);
            }
            catch (e) {
                console.error(e);
                res.sendStatus(500);
            }
        }
        else {
            next();
        }
    }

    private mountMockup(app: express.Express) {
        app.use(bodyParser.urlencoded({
            extended: true
        }));

        const handler = (
            req: express.Request,
            res: express.Response,
            next: Function
        ) => this.mockupHandler(req, res, next);

        app.get(/^\/data\//, handler);
        app.post(/^\/data\//, handler);
    }

    private mountProxy(app: express.Express) {
        Object.keys(this.options.proxyTable || {}).forEach((context) => {
            let options = get(this.options.proxyTable, context);
            if (typeof options === 'string') {
                options = {
                    target: options,
                    logLevel: 'debug'
                };
            }

            app.use(
                proxyMiddleware(
                    get(options, 'filter') || function (pathname, req) {
                        return !/[?&](?:ed|enable_debug)\b/.test('' + req.headers.referer)
                            && new RegExp(context).test(pathname);
                    },
                    options || {}
                )
            );
        });
    }

    private webpackDev() {
        const devConfig = dev.call(this);
        return devConfig;
    }

    private webpackRD() {
        const rdConfig = rd.call(this);
        return rdConfig;
    }

    private webpackOff() {
        const offConfig = off.call(this);
        return offConfig;
    }

    private webpackProduction() {
        const productionConfig = production.call(this);
        return productionConfig;
    }
}
