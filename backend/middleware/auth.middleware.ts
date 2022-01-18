import { NextFunction, Request, Response } from "express";
import IUser from "Interfaces/user.interface";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string;
  let error;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decode: any = jwt.verify(token, process.env.JWT_SECRET as string);

      req.user = (await User.findById(decode.id).select("-password")) as IUser;
      // res.setHeader("X-auth-token", token);
    } else {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } catch (err) {
    next(err);
  }

  next();

  //   next(error);
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401);
      throw new Error("Not Authorized as Admin");
    }
  } catch (error) {
    next(error);
  }
};
