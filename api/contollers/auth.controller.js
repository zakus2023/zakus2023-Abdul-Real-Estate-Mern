import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"; // importing bcryptjs after installing the package in the root folder

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10); //hashing the password 10 is the salt
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    next(error);
  }
};
