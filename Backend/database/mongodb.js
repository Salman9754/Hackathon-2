import moongoose from "moongoose";
import { DB_URI } from "../config/env.js";

const connectDatabase = async () => {
  try {
    await moongoose.connect(DB_URI);
    console.log("Database Connected");
  } catch (error) {
    console.error("Something went wrong");
  }
};

export default connectDatabase;
