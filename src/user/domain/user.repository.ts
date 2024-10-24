import { IUserEntity } from "./user.entity";

export interface UserRepository {
  addUser(user: IUserEntity): Promise<IUserEntity | null>;
  getUsers(): Promise<IUserEntity[]| null>;
}
