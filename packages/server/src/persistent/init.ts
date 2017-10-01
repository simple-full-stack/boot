import { createConnection, ConnectionOptions } from "typeorm";
import * as path from 'path';
import winston from 'winston';

const connectionOptions: ConnectionOptions = {
    driver: {
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'bootstrap',
        usePool: true
    },
    logging: {
        logger: winston.log,
        logQueries: true,
        logFailedQueryError: true,
        logSchemaCreation: true
    },
    autoSchemaSync: true,
    entities: [path.join(__dirname, 'entities', '**', '*.ts')]
};
export default function () {
    return createConnection(connectionOptions);
}
