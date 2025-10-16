import express from "express";
import { PORT } from "./config/env.js";
import authRouter from "./routes/auth-routes.js";
import connectDatabase from "./database/mongodb.js";
const app = express();

app.use(authRouter);

app.listen(PORT, async () => {
  await connectDatabase();
  console.log(`Example app listening on PORT ${PORT}`);
});
