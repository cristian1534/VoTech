import { redisClient } from "../redis/redis";
import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../helpers/error.handler";

export const requireAuth = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const httpResponse = new HttpResponse();
  const { authorization } = req.headers;

  if (!authorization) {
    return httpResponse.Unauthorized(res, "Unauthorized");
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const reply = await redisClient?.get(token);
    console.log("Token retrieved from Redis:", reply);

    if (!reply) {
      return httpResponse.Unauthorized(res, "Unauthorized");
    }

    return next();
  } catch (err) {
    console.error("Error fetching token from Redis:", err);
    return httpResponse.Unauthorized(res, "Unauthorized");
  }
};

