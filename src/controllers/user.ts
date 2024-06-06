import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import { AppSettings } from "../config/env.config.js";
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found " });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({
        success: false,
        message: "user not matched",
      });
    }
    const token = jwt.sign({ _id: user._id }, AppSettings.jwt_secret as string);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });
    res.status(201).json({
      success: true,
      message: `Welcome ${user.name}`,
      token,
    });

  } catch (err) {
    next(err);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;    
    let user = await User.findOne({ email });
    if(user) 
      return res.status(400).json({
       success: true,
       message: "user already exists" 
      })

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ _id: user._id }, AppSettings.jwt_secret as string);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });
    res.status(201).json({
      success: true,
      message: "Registered Successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "Internal Server Error",
    });
  }
};

export const getMyProfile = async (req: Request, res: Response,next:NextFunction) => {
  try {
  const user = await  req.user
    res.status(200).json({
      success: true,
      user
    });
  }catch(err) {
    next(err)
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find({});
  return res.status(200).json({
    success: true,
    users,
  });
};


export const logout = (req: Request, res: Response,next:NextFunction) => {
  try{
    res.cookie('token', '', {
      expires: new Date(0),
      sameSite: process.env.NODE_ENV === 'Development' ? 'lax' : 'none',
      secure: process.env.NODE_ENV !== 'Development',
    });
  
    res.status(200).json({
      success: true, 
      user: req.user,
      message: `${req.user} Logged Out Successfully`,
    });
  }catch(err) {
   next(err)
  }
}

