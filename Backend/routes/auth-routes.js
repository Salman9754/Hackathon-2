import { Router } from "express";
import { signIn, signUp, verifyOtp } from "../controllers/auth-controller.js";

const authRouter = Router();

authRouter.post("/sign-up", signUp);
authRouter.post("/sign-in", signIn);
authRouter.post("/verify-otp", verifyOtp);

export default authRouter;
