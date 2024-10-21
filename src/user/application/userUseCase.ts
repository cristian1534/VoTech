import { IUserEntity } from "../domain/user.entity";
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
}
