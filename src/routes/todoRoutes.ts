import express, { Request, Response, Router } from "express";
import {
  addTodos,
  deleteTodos,
  getmyTodos,
  updateTodos,
  editTodos,
} from "../controllers/todo.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/me", isAuthenticated, getmyTodos);

router.post("/new", isAuthenticated, addTodos);

router.put("/edit/:id", editTodos);

router.route("/:id").put(updateTodos).delete(isAuthenticated, deleteTodos);

export default router;
