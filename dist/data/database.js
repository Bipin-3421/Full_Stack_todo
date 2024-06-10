import mongoose from "mongoose";
export const connectDB = () => {
    mongoose
        .connect(process.env.mongo_url, {
        dbName: "NodeTypescript",
    })
        .then(() => {
        console.log("Database Connected");
    })
        .catch((err) => {
        console.log(err);
    });
};
