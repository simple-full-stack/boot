import { Connection } from 'typeorm';

export default abstract class Service {
    public static connection: Connection;

    protected get connection(): Connection {
        if (!Service.connection || !Service.connection.isConnected) {
            throw new Error('the database connection is not ready!');
        }

        return Service.connection;
    }
}
