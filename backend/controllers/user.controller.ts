import { Request, Response, NextFunction } from "express";
import IUser from "Interfaces/user.interface";
import User from "../models/user.model";
import generateToken from "../utils/generateToken";
import jwt from "jsonwebtoken";

// @desc   Login for existing user
// @route   POST /api/login
// @access  public
export const authUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password }: { email: string; password: string } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const userToken = generateToken(user?._id);

    const isPasswordCorrect = await user.matchPassword(password);

    if (user && isPasswordCorrect) {
      return res.status(200).setHeader("X-auth-token", userToken).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: userToken,
      });
    } else {
      throw new Error();
    }
  } catch (err) {
    const error = new Error("Invalid Email or password");
    next(error);
  }
};

// @desc   Register new User
// @route   POST /api/
// @access  public
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    email,
    password,
  }: { name: string; email: string; password: string } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    const userToken = generateToken(user._id);

    if (user) {
      return res.status(201).setHeader("X-auth-token", userToken).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: userToken,
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  } catch (error) {
    next(error);
  }
};

// @desc   Get Logged in User's Profile
// @route   GET /api/profile
// @access  private
export const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user?._id);

    if (user) {
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (err) {
    const error = new Error("Invalid Email or password");
    next(error);
  }
};

// @desc   update Logged in User's Profile
// @route  PUT /api/profile
// @access  private
export const updateUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user?._id);

    if (user) {
      user.name = (req.body.name as string) || user.name;
      user.email = (req.body.email as string) || user.email;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      const token = req.headers.authorization?.split(" ")[1];

      return res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token,
      });
    } else {
      res.status(404);
      throw new Error("User Not found");
    }
  } catch (err) {
    next(err);
  }
};

// @desc   get all users
// @route  GET /api/user
// @access  private/admin
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find({});

    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// @desc   get users by id
// @route  GET /api/user/:id
// @access  private/admin
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      return res.status(200).json(user);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (err) {
    next(err);
  }
};

// @desc   Delete a user
// @route  Delete /api/user/:id
// @access  private/admin
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      await user.remove();
      res.status(200).json({ message: "User Deleted" });
    } else {
      res.json(404);
      throw new Error("No User Found");
    }
  } catch (err) {
    next(err);
  }
};

// @desc   update User
// @route  PUT /api/users/:id
// @access  private/Admin
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body }
    );

    if (user) {
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User Not found");
    }
  } catch (err) {
    next(err);
  }
};

export const tokenLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] as string;

    if (!token) {
      throw new Error("No token provided");
    }

    const decode: any = jwt.verify(token, process.env.JWT_SECRET as string);

    const user = (await User.findById(decode.id)
      .select("_id email name isAdmin")
      .select("-password ")) as IUser;

    if (user) {
      return res.json(user);
    } else {
      throw new Error("User Not found");
    }
  } catch (error) {
    next(error);
  }
};
