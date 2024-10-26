import { Request, Response } from "express";
import { logSchema, userSchema } from "../helpers/schema.validator";
import bcrypt from "bcryptjs";
import { UserUseCase } from "../../application/userUseCase";
import { HttpResponse } from "../helpers/error.handler";
import { createToken } from "../helpers/token.creator";
import "dotenv/config";
import { setToken } from "../helpers/setTokenRedis";



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
      if (!user)
        return this.httpResponse.BadRequest(res, "User was not register.");

      return this.httpResponse.Ok(res, { name: user.name, email: user.email });
    } catch (err: any) {
      console.error(err);
      return this.httpResponse.InternalServerError(res, "An error occurred.");
    }
  };

  public getUsers = async (req: Request, res: Response): Promise<any> => {
    try {
      const users = await this.userUseCase.getUsers();
      if (!users) return this.httpResponse.NotFound(res, "No users found.");

      const usersWithoutPassword = users.map((user) => {
        const { password, ...rest } = user;
        return rest;
      });
      return this.httpResponse.Ok(res, usersWithoutPassword);
    } catch (err: any) {
      console.error(err);
      this.httpResponse.InternalServerError(res, "An error occurred.");
    }
  };

  public logUser = async ({ body }: Request, res: Response): Promise<any> => {
    try {
      const { error, value } = logSchema.validate(body);
      if (error) {
        return this.httpResponse.BadRequest(res, error.details[0].message);
      }

      const { email, password } = value;

      const user = await this.userUseCase.logUser({ email, password });
      if (!user) {
        return this.httpResponse.Unauthorized(res, "Invalid credentials.");
      }
      const token = createToken(user);
      return setToken(token, user.uuid)
        .then(() => {
          return this.httpResponse.Ok(res, {
            name: user.name,
            email: user.email,
            token,
          });
        })
        .catch((err: any) => {
          console.error(err);
          return this.httpResponse.InternalServerError(
            res,
            "An error occurred."
          );
        });
    } catch (err: any) {
      console.error(err);
      return this.httpResponse.InternalServerError(res, "An error occurred.");
    }
  };
}
