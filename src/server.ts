import { app } from "./app.js";
import { connectDB } from "./data/database.js";
import { config } from "dotenv";
config({ path: "./.env" });

connectDB();

app.listen(process.env.port, () => {
  console.log(`Server is working on port: ${process.env.port}`);
});
