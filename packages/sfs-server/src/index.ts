import * as express from 'express'
import * as path from 'path';
import load from './controllers/load';
import { each } from 'lodash';
import * as bodyParser from 'body-parser';
import { waitUntilFree } from 'tcp-port-used';
import 'reflect-metadata';
import servicesInit from './services/init';
import * as winston from 'winston';

const kill = require('kill-process-by-port');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Controllers = load(path.join(__dirname, 'controllers'));
let scripts = '';
Controllers.forEach(C => {
    const controller = new C();
    each(controller.apiInfoMap, (description) => {
        if (!description.path || !description.handler) {
            return;
        }

        switch (description.method) {
            case 'GET':
                app.get(description.path, description.handler);
                break;
            case 'POST':
                app.post(description.path, description.handler);
                break;
            case 'PUT':
                app.put(description.path, description.handler);
                break;
            case 'DELETE':
                app.delete(description.path, description.handler);
                break;
            case 'PATCH':
                app.patch(description.path, description.handler);
                break;
            case 'HEAD':
                app.head(description.path, description.handler);
                break;
        }
        scripts += description.script;
    });
});

app.get('/api/all', function (_, res) {
    res.contentType('text/javascript');
    res.send(scripts);
});

async function start(port: number) {
    try {
        await waitUntilFree(port, 500, 3000);
        app.listen(4000, function () {
            winston.info(`listening on port ${port}!`);
        });
    } catch (err) {
        try {
            winston.info(`try to kill processes on port ${port}`);
            const pids = await kill(port);
            winston.info(`killed processes(${pids.join(',')}) on port ${port} successfully`);
            start(port);
        } catch (err) {
            winston.error(`kill processes on port ${port} failed`, err);
        }
    }
}

servicesInit()
    .then(() => start(4000))
    .catch(error => winston.error(error));
