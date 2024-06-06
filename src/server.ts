import { app } from "./app.js";
import { AppSettings } from "./config/env.config.js";
import { connectDB } from "./data/database.js";
connectDB();

app.listen(AppSettings.port, () => {
  console.log(`Server is working on port: ${AppSettings.port as string}`);
});
