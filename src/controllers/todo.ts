import { NextFunction, Request, Response } from "express";
import Todo from "../models/todo.js";

export const getmyTodos = async (req: Request, res: Response,next:NextFunction) => {
  try {
   const userId = req.user._id;
   const todos = await Todo.find({user: userId})
   res.status(200).json({
    success: true,
    todos,
   });
  }catch(err) {
    next(err)
  }
};

export const addTodos = async (req: Request, res: Response, next:NextFunction) => {
  try{
    const { title, description } = req.body;
    const todo = await Todo.create({
      title,
      description,
      user:req.user
    });
    res.status(201).json({
      success: true,
      message: 'Todo Added Successfully',
      todo
    });
  }catch(err) {
    next(err)
  }
};

export const updateTodos = async (req:Request, res: Response, next:NextFunction) => {
  try {
    const task = await Todo.findById(req.params.id)
    if(!task) {
      return res.status(404).json({
        success: false,
        message: "Todo is not found",
      })
    }
    task.isCompleted  = !task.isCompleted
    await task.save()
    res.status(202).json({
      success: true,
      message: "Todo updated successfully",
     
    })
  }catch(err)
  {
    next(err)
  }
} 


// interface IParam {
//   id: string
// }

export const editTodos = async (req:Request, res: Response , next:NextFunction) => {
try {
const{id} = req.params
const{title,description,isCompleted} = req.body;
const todo = await Todo.findByIdAndUpdate(id ,{
  title,description,isCompleted
},{new:true})

if(!todo) {
  return res.status(404).json({
  success: false,
  message: "todo not found"
  })
}
res.status(200).json({
  success: true,
  message: "User Edited Successfully",
  todo
})
}catch(err){
next(err)
}
}


export const deleteTodos = async (req: Request, res: Response) => {
  const id: string = req.params.id; // Get the id from request parameters
  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (deletedTodo) {
      res.json({ message: "Todo deleted Successfully" });
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
