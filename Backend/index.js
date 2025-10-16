import express from "express";
import { PORT } from "./config/env.js";
import authRouter from "./routes/auth-routes.js";
import connectDatabase from "./database/mongodb.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", authRouter);

app.listen(PORT, async () => {
  await connectDatabase();
  console.log(`Example app listening on PORT ${PORT}`);
});
