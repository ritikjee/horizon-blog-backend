import express, { Request, Response, Express } from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB";

dotenv.config();

connectDB();
const app: Express = express();
const Port = process.env.PORT || 5000;

app.get("/", (req: Request, res: Response) =>
  res.send("hello express.I am Ritik Jha")
);

app.listen(Port, () => console.log(`listening on port ${Port}`));
