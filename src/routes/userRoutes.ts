import express, { Request, Response, Router } from "express";
import {
  login,
  register,
  getMyProfile,
  getAllUsers,
  logout
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", login);

router.post("/new", register);

router.get("/me",isAuthenticated, getMyProfile);

router.get("/logout", logout);

export default router;
