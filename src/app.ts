import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import todoRoutes from "./routes/todoRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
export const app = express();
import cors from "cors";

console.log(process.env.PORT);
// using middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

// using Routes
app.use("/api/todos", todoRoutes);
app.use("/api/users", userRoutes);

//for initial testing
app.get("/", (req, res) => {
  res.send("Hey server working good");
});

app.use(function (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error) {
    return res.status(500).end();
  } else {
    return next();
  }
});
