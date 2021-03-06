import { Injectable, HttpException } from '@nestjs/common';
import { USERS } from '../mocks/users.mock';

@Injectable()
export class UsersService {

    users = USERS;

    getUsers(): Promise<any> {
        return new Promise(resolve => {
            resolve(this.users);
        });
    }

    getUser(userID): Promise<any> {
        let id = Number(userID);
        return new Promise(resolve => {
            const user = this.users.find(user => user.id === id);
            if (!user) {
                throw new HttpException('Usuário não existe!', 404);
            }
            resolve(user);
        });
    }

    addUser(user): Promise<any> {
        return new Promise(resolve => {
            this.users.push(user);
            resolve(this.users);
        });
    }

    deleteUser(userID): Promise<any> {
        let id = Number(userID);
        return new Promise(resolve => {
            let index = this.users.findIndex(user => user.id === id);
            if (index === -1) {
                throw new HttpException('Usuário não existe', 404);
            }
            this.users.splice(1, index);
            resolve(this.users);
        });
    }
}
