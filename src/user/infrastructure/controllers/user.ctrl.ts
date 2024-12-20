import { Request, Response } from "express";
import { logSchema, userSchema, partialUserSchema } from "../helpers/schema.validator";
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
      const existingUser = await this.userUseCase.getUserByEmail(value.email);
      if (existingUser)
        return this.httpResponse.BadRequest(res, "User already exists");

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

  public getUserByUuid = async (req: Request, res: Response): Promise<any> => {
    const { uuid } = req.params;

    try {
      const user = await this.userUseCase.getUserByUuid(uuid);
      if (!user) {
        return this.httpResponse.NotFound(res, "User not found.");
      }

      const { password, ...rest } = user;
      return this.httpResponse.Ok(res, rest);
    } catch (err: any) {
      console.error(err);
      return this.httpResponse.InternalServerError(res, "An error occurred.");
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

  public deleteUser = async (req: Request, res: Response): Promise<any> => {
    try {
      const { uuid } = req.params;

      const deleted = await this.userUseCase.deleteUser(uuid);
      if (!deleted) return this.httpResponse.NotFound(res, "User not found.");

      return this.httpResponse.Ok(res, {
        message: "User deleted successfully.",
      });
    } catch (err: any) {
      console.error(err);
      return this.httpResponse.InternalServerError(res, "An error occurred.");
    }
  };

  public getSubscriptions = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const subscriptions = await this.userUseCase.getSubscriptions();
      return this.httpResponse.Ok(res, subscriptions);
    } catch (err: any) {
      console.error(err);
      return this.httpResponse.InternalServerError(res, "An error occurred.");
    }
  };

  public patchUser = async (req: Request, res: Response): Promise<any> => {
    try {
      const { uuid } = req.params;
      const { error, value } = partialUserSchema.validate(req.body);
      if (error) {
        return this.httpResponse.BadRequest(res, error.details[0].message);
      }

      const updatedUser = await this.userUseCase.patchUser(uuid, value);
      if (!updatedUser)
        return this.httpResponse.NotFound(res, "User not found.");

      const { password, ...rest } = updatedUser;
      return this.httpResponse.Ok(res, rest);
    } catch (err: any) {
      console.error(err);
      return this.httpResponse.InternalServerError(res, "An error occurred.");
    }
  };
}
