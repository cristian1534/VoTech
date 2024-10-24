import { IAuthEntity, IUserEntity } from "./user.entity";

export interface UserRepository {
  addUser(user: IUserEntity): Promise<IUserEntity | null>;
  logUser(credentials: IAuthEntity): Promise<IUserEntity | null>;
  getUsers(): Promise<IUserEntity[] | null>;
}
