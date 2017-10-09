import createUserModel from 'sfs-common/store/createUserModel';
import { getRequesters } from './api';

export default function () {
    return createUserModel(getRequesters);
};
