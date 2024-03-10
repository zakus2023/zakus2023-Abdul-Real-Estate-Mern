import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./Routes/user.route.js"; // importing the user route created in the Routes folder

//to use the env variable
dotenv.config();

//declaring my application port  #2
const port = 3000;

//connecting to mongodb using environment variable  set in .env after installing dotenv in the root folder

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

// creating my application #3
const app = express();

//creating my listeners #4
app.listen(port, () => {
  console.log("App is listening on port: " + port);
});

app.use("/api/user",userRouter);
