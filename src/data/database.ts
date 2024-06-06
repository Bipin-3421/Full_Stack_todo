import mongoose from "mongoose";
import { AppSettings } from "../config/env.config.js";
export const connectDB = () => {
  mongoose
    .connect(AppSettings.mongo_url as string, {
      dbName: "NodeTypescript",
    })
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
