import { IAuthEntity, IUserEntity } from "./user.entity";

export interface UserRepository {
  addUser(user: IUserEntity): Promise<IUserEntity | null>;
  logUser(credentials: IAuthEntity): Promise<IUserEntity | null>;
  getUserByUuid(uuid: string): Promise<IUserEntity | null>;
  getUserByEmail(email: string): Promise<IUserEntity | null>
  getUsers(): Promise<IUserEntity[] | null>;
  deleteUsers(uuid: string): Promise<IUserEntity | null>;
}
