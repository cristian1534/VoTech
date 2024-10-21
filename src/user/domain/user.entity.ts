export interface IAuthEntity {
  email: string;
  password: string;
}

export interface IUserEntity extends IAuthEntity {
  uuid: string;
  name: string;
}
