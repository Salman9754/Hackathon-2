import User from "../Models/user-model.js";
import bycrypt from "bcrypt";
import { JWT_SECRET } from "../config/env.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);

    const newUser = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
      expiresIn: "1d",
    });
    return res
      .status(201)
      .send({ message: "User created successfully", token, user: newUser });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).send({ message: "User does not exist" });
    }
    const isPasswordCorrect = await bycrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).send({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: existingUser._id }, JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).send({
      message: "User signed in successfully",
      token,
      user: existingUser,
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};
