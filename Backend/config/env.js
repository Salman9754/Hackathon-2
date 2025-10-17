import { config } from "dotenv";

config({ path: ".env" });

export const {
  PORT,
  DB_URI,
  JWT_SECRET,
  GMAIL_USER,
  GMAIL_PASS,
  SMTP_HOST,
  SMTP_PORT,
} = process.env;
