import persistentInit from '../persistent/init';
import Service from './Service';

export default async function () {
    const connection = await persistentInit();
    Service.connection = connection;
    return connection;
}
