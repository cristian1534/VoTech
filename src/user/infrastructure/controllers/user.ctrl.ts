import { Request, Response } from "express";
import { userSchema } from "../helpers/schema.validator";
import bcrypt from "bcryptjs";
import { UserUseCase } from "../../application/userUseCase";
import { HttpResponse } from "../helpers/error.handler";

export class UserController {
  constructor(
    private userUseCase: UserUseCase,
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  public addUser = async ({ body }: Request, res: Response): Promise<any> => {
    try {
      const { error, value } = userSchema.validate(body);
      if (error)
        return this.httpResponse.BadRequest(res, error.details[0].message);

      const { password, ...others } = value;
      const hashedPassword = await bcrypt.hash(password, 10);

      const userWithHashedPassword = {
        password: hashedPassword,
        ...others,
      };

      const user = await this.userUseCase.addUser(userWithHashedPassword);
      return this.httpResponse.Ok(res, user);
    } catch (err: any) {
      console.error(err);
      return this.httpResponse.InternalServerError(res, "An error occurred.");
    }
  };

  public getUsers = async (req: Request, res: Response): Promise<any> => {
    try {
      const users = await this.userUseCase.getUsers();
      console.log(users)
      return this.httpResponse.Ok(res, users);
    } catch (err: any) {
      console.error(err);
      this.httpResponse.InternalServerError(res, "An error occurred.");
    }
  };
}
