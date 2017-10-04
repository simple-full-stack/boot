import Service from './Service';
import IUser from 'sfs-common/types/IUser';
import UserEntity from '../persistent/entities/User';
import InvalidPassword from '../common/errors/InvalidPassword';
import InvalidNickname from '../common/errors/InvalidNickname';

export class UserService extends Service {
    register(user: IUser) {
        if (!user.password) {
            throw new InvalidPassword();
        }

        if (!user.nickname) {
            throw new InvalidNickname();
        }

        const connection = this.connection;
        const userRepository = connection.getRepository(UserEntity);

        const userEntity = new UserEntity();
        userEntity.nickname = user.nickname;
        userEntity.password = user.password;
        userEntity.realName = user.realName || '';
        return userRepository.persist([userEntity]);
    }
}

export default new UserService();
