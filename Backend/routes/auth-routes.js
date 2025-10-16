import { Router } from "express";

const authRouter = Router();

authRouter.post("/sign-up", async (req, res) => {
  return res.status(200).send({ message: "Sign Up APi" });
});
authRouter.post("/sign-in", async (req, res) => {
  return res.status(200).send({ message: "Sign In APi" });
});


export default authRouter