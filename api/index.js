import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./Routes/user.route.js"; // importing the user route created in the Routes folder
import authRouter from "./Routes/auth.route.js";

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
const app = express(); //creating the app
app.use(express.json()); //allowing json as the input of the server

//creating my listeners #4
app.listen(port, () => {
  console.log("App is listening on port: " + port);
});

//creating the api's
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

//creating the middleware to avoid repeating the error api
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500; //generate statuscode when there is error or return 500
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
