import { IUserEntity, IAuthEntity } from "../domain/user.entity";
import { v4 as uuiGenerator } from "uuid";
import { UserValue } from "../domain/user.value";
import { UserRepository } from "../domain/user.repository";
import bcrypt from "bcryptjs";

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
    const user = await this.userRepository.getUserByEmail(credentials.email);
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(
      credentials.password,
      user.password
    );
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }
  public async getUserByUuid(uuid: string) {
    const user = await this.userRepository.getUserByUuid(uuid);
    return user;
  }

  public async getUserByEmail(email: string) {
    const user = await this.userRepository.getUserByEmail(email);
    return user;
  }

  public async getSubscriptions() {
    const subscriptions = await this.userRepository.getSubscriptions();
    return subscriptions;
  }

  public async patchUser(uuid: string, updates: {active: boolean}) {
    const updatedUser = await this.userRepository.patchUser(uuid, updates);
    return updatedUser;
  }
}
