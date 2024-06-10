import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;
  if (!token)
    return res.status(404).json({
      success: false,
      message: "Login First",
    });
  const decoded = jwt.verify(token, process.env.jwt_secret as string);

  if (typeof decoded === "string") return;
  req.user = await User.findById(decoded._id);
  next();
};

// jwt.sign("hari", {})
// const va = jwt.verify() // string //hari

// jwt.sign({name : "hari"}, {})
// const ve = jwt.verify() // jwt payload
