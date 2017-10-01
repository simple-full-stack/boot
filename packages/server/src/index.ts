import * as express from 'express'
import * as path from 'path';
import load from './controllers/load';
import Controller from './controllers/Controller';
import { each } from 'lodash';
import * as bodyParser from 'body-parser';
import { waitUntilFree } from 'tcp-port-used';

const kill = require('kill-process-by-port');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Controllers = load(path.join(__dirname, 'controllers'));
let scripts = '';
Controllers.forEach(C => {
    const controller = new C();
    each(controller.apiInfoMap, (description) => {
        app[description.method.toLowerCase()](description.path, description.handler);
        scripts += description.script;
    });
});

app.get('/api/all', function (req, res) {
    res.contentType('text/javascript');
    res.send(scripts);
});

async function start(port: number) {
    try {
        await waitUntilFree(port, 500, 3000);
        app.listen(4000, function (...args) {
            console.log(`listening on port ${port}!`);
        });
    } catch (err) {
        try {
            console.log(`try to kill processes on port ${port}`);
            const pids = await kill(port);
            console.log(`killed processes(${pids.join(',')}) on port ${port} successfully`);
            start(port);
        } catch (err) {
            console.error(`kill processes on port ${port} failed`, err);
        }
    }
}

start(4000);
