// @ts-nocheck
import User from "../Models/user-model.js";
import bycrypt from "bcrypt";
import { JWT_SECRET } from "../config/env.js";
import jwt from "jsonwebtoken";
import { generateOtp } from "../lib/generate-otp.js";
import { sendEmail } from "../services/email.js";

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
    const otp = generateOtp();
    const newUser = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      otp: otp,
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    await sendEmail({
      to: newUser.email,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      otp: newUser.otp,
    });
    return res.status(201).send({
      message: "User created successfully",
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
      },
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const signIn = async (req, res) => {
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
      user: {
        id: existingUser._id,
        email: existingUser.email,
        first_name: existingUser.first_name,
        last_name: existingUser.last_name,
      },
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }
    if (user.otp !== otp) {
      return res.status(400).send({ message: "Invalid OTP" });
    }
    user.otp = "";
    user.isVerified = true;
    try {
      await user.save();
    } catch (saveError) {
      console.error("Save error:", saveError);
      return res.status(500).send({ message: "Error updating user" });
    }
    return res.status(200).send({ message: "OTP verified successfully" });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};
