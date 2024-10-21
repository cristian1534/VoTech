import { IUserEntity } from "./user.entity";

export class UserValue implements IUserEntity {
    uuid: string;
    name: string;
    email: string;
    password: string;
    constructor(user: IUserEntity){
        this.uuid = user.uuid;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
    }
};