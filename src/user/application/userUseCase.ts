import { IUserEntity, IAuthEntity } from "../domain/user.entity";
import { v4 as uuiGenerator } from "uuid";
import { UserValue } from "../domain/user.value";
import { UserRepository } from "../domain/user.repository";

export class UserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async addUser(user: IUserEntity) {
    const uuid = uuiGenerator();
    const userValue = new UserValue({ ...user, uuid });
    const userCreated = await this.userRepository.addUser(userValue);
    return userCreated;
  }

  public async deleteUser(uuid: string) {
    const deletedUser = await this.userRepository.deleteUsers(uuid);
    return deletedUser;
  }
  public async getUsers() {
    const users = await this.userRepository.getUsers();
    return users;
  }
  public async logUser(credentials: IAuthEntity) {
    const user = await this.userRepository.logUser(credentials);
    return user;
  }
}
