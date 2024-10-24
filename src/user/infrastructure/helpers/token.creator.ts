import jwt from "jwt-simple";
import moment from "moment";
import { IUserEntity } from "../../domain/user.entity";
import "dotenv/config";

interface Payload {
  sub: string;
  iat: number;
  exp: number;
}

export const createToken = (user: IUserEntity) => {
  const secretToken: string = process.env.SECRET_TOKEN as string;
  const payload: Payload = {
    sub: user.uuid,
    iat: moment().unix(),
    exp: moment().add(1, "day").unix(),
  };
  return jwt.encode(payload, secretToken);
};
