import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"; // importing bcryptjs after installing the package in the root folder
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res, next) => {
  const { email, password } = req.body; //authenticating the user using uname and pword from the signin form

  try {
    const validUser = await User.findOne({ email }); //pull email from mongodb
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcryptjs.compareSync(password,validUser.password); // comparing the user input password to the pword pulled from mongodb
    if (!validPassword) return next(errorHandler(401, "Wrong Credentials!"));
    const token = jwt.sign({ _id: validPassword._id }, process.env.JWT_SECRET); // creating the token and hashing it
    const {password: pass, ...rest} = validUser._doc //removing the password from the userInfo that is returned
    res
      .cookie("access_token", token, { httpOnly: true })//storing the token in a cokie for a session. expires:new Date(Date.now() +24 * 60 * 60 * 1000) you add this if you want to limit your cookie to a specific time frame
      .status(200)
      .json(rest); 
  } catch (error) {
    next(error);
  }
};
